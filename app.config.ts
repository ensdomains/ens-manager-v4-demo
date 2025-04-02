import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { cloudflare } from 'unenv'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    ssr: {
      external: ['pino-pretty', 'lokijs', 'encoding']
    },
    build: {
      rollupOptions: {
        external: ['pino-pretty', 'lokijs', 'encoding'],
      }
    },
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
