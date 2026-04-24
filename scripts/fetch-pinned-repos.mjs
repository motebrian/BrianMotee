#!/usr/bin/env node
/**
 * fetch-pinned-repos.mjs
 *
 * Fetches pinned repositories from the GitHub GraphQL API and writes them
 * to src/data/projects.json. Run this at build time (CI or pre-commit).
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx GITHUB_USERNAME=you node fetch-pinned-repos.mjs
 *
 * Or add to package.json:
 *   "scripts": {
 *     "prebuild": "node scripts/fetch-pinned-repos.mjs",
 *     "build": "vite build"
 *   }
 *
 * Required token scope: `public_repo` (or `repo` if any pinned repos are private).
 * Create one at https://github.com/settings/tokens (classic) or use a fine-grained PAT.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ─── CONFIG ──────────────────────────────────────────────────────────────
const USERNAME = process.env.GITHUB_USERNAME;
const TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/data/projects.json"
);

if (!USERNAME || !TOKEN) {
  console.warn("⚠ Missing GITHUB_USERNAME or GITHUB_TOKEN — skipping fetch, using existing projects.json.");
  process.exit(0);
}

// ─── GRAPHQL QUERY ───────────────────────────────────────────────────────
// pinnedItems returns up to 6 items. We also pull the README so we can
// extract a demo URL and a richer description if you want one later.
const QUERY = `
  query($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage { name color }
            repositoryTopics(first: 10) {
              nodes { topic { name } }
            }
            languages(first: 6, orderBy: {field: SIZE, direction: DESC}) {
              nodes { name color }
            }
            pushedAt
            openGraphImageUrl
            usesCustomOpenGraphImage
          }
        }
      }
    }
  }
`;

// ─── FETCH ───────────────────────────────────────────────────────────────
async function fetchPinned() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": `${USERNAME}-portfolio-build`,
    },
    body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API responded ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors, null, 2)}`);
  }
  if (!json.data?.user) {
    throw new Error(`User "${USERNAME}" not found.`);
  }

  return json.data.user.pinnedItems.nodes;
}

// ─── SHAPE IT FOR THE PORTFOLIO ──────────────────────────────────────────
// The portfolio component expects: { title, blurb, stack[], code, demo, metric }
function transform(repo) {
  // Build the stack list: topics first (curated), then languages as fallback.
  const topics = repo.repositoryTopics.nodes.map((n) => n.topic.name);
  const languages = repo.languages.nodes.map((n) => n.name);
  const stack = (topics.length ? topics : languages).slice(0, 5);

  return {
    title: toTitleCase(repo.name),
    blurb: repo.description ?? "No description provided.",
    stack,
    code: repo.url,
    demo: repo.homepageUrl || repo.url,
    metric: `★ ${repo.stargazerCount}`,
    // Extras your component can use later:
    _meta: {
      primaryLanguage: repo.primaryLanguage?.name ?? null,
      primaryLanguageColor: repo.primaryLanguage?.color ?? null,
      forks: repo.forkCount,
      updatedAt: repo.pushedAt,
      ogImage: repo.usesCustomOpenGraphImage ? repo.openGraphImageUrl : null,
    },
  };
}

function toTitleCase(slug) {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── MAIN ────────────────────────────────────────────────────────────────
try {
  console.log(`→ Fetching pinned repos for @${USERNAME}...`);
  const repos = await fetchPinned();

  if (repos.length === 0) {
    console.warn("⚠ No pinned repositories found. Pin some at github.com/<you>.");
  }

  const projects = repos.map(transform);

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: `github.com/${USERNAME}`,
        projects,
      },
      null,
      2
    ) + "\n"
  );

  console.log(`✓ Wrote ${projects.length} project(s) to ${OUTPUT_PATH}`);
  for (const p of projects) console.log(`  · ${p.title}`);
} catch (err) {
  console.error(`✗ ${err.message}`);
  process.exit(1);
}
