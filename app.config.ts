import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { cloudflare } from 'unenv'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      vanillaExtractPlugin()
    ],
  },
  server: {
    preset: 'cloudflare-pages',
    unenv: cloudflare,
  }
})
