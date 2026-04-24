import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In CI, GITHUB_REPOSITORY is "owner/repo-name"; use it to set the Pages base path.
// Locally it is unset, so base stays "/".
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''

export default defineConfig({
  base: repo ? `/${repo}/` : '/',
  plugins: [react(), tailwindcss()],
})
