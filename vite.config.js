import path from 'path'
import Tailwindcss from 'tailwindcss'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import viteEslint from 'vite-plugin-eslint'

const variablePath = normalizePath(path.resolve(__dirname, './src/assets/css/variable.scss'))

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.join(__dirname, 'src'),
  plugins: [vue(), viteEslint()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        }),
        Tailwindcss
      ]
    }
  }
})
