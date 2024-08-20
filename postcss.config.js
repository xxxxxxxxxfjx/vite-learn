module.exports = {
  plugins: {
    'postcss-preset-env': {
      // 你可以指定你想要的 stage，stage 0-4，数值越低，实验性越强。
      stage: 3, // 默认是 stage 2
      features: {
        'nesting-rules': true // 使能 CSS 嵌套规则，类似于 SASS/LESS
      },
      // 也可以在这里配置 browserslist
      browsers: 'last 2 versions'
    }
  }
}
