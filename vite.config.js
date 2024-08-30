import path from 'path'
import Tailwindcss from 'tailwindcss'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import viteEslint from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'
import viteImagemin from 'vite-plugin-imagemin'
// import viteStylelint from '@amatlash/vite-plugin-stylelint'

const ipProduction = process.env.NODE_ENV === 'production'
const CDN_URL = 'https://my-image-cdn.com'

const variablePath = normalizePath(path.resolve(__dirname, './src/assets/css/variable.scss'))

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.join(__dirname, 'src'),
  // base: ipProduction ? CDN_URL : '/',
  plugins: [
    vue(),
    viteEslint(),
    svgLoader(),
    // viteStylelint({
    //   exclude: /windicss|node_modules/
    // })
    // 忽略前面的插件
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
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
  },
  // 打包构建
  build: {
    // 静态资源小于8kb则内联打包
    assetsInlineLimit: 8 * 1024
  }
})
