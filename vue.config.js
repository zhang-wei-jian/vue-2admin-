const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://39.98.123.211:8510',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    // configureWebpack: {
    //   devtool: 'source-map'
    // }
  },
  lintOnSave: false,
});
//source map（源代码映射）功能。它可以在压缩后的文件中保留一份与源文件对应的代码，从而让浏览器在报错时能够正确显示文件名和行数。具体如何使用，可以参考打包工具的文档。
// module.exports = {
//   configureWebpack: {
//     devtool: 'source-map'
//   }
// }
