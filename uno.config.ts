import { defineConfig } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'

export default defineConfig({
content: {
    pipeline: {
        include: [
        './src/**/*.{html,js,ts,vue,svelte,jsx,tsx}',
        '@revolist/revogrid-pro/dist/**/*.{js,ts,vue,jsx,tsx}',
        ],
    },
    },
  presets: [
    presetWind3({
      dark: {
        dark: '[data-theme="dark"]',
      }
    }),
  ],
})