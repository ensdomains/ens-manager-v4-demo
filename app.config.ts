import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { cloudflare } from '@cloudflare/unenv-preset'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    ssr: { 
      external: ['pino-pretty', 'lokijs', 'encoding'],
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
    minify: false,
    preset: 'cloudflare-pages',
    unenv: {
      ...cloudflare,
      alias: {
          ...cloudflare.alias,
          "string_decoder/": "node:string_decoder",
      },
    },
  }
})
