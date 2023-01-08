const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true,
    host:'127.0.0.1',
    proxy:{
      '/api':{
        target:'http://39.98.123.211:8510',
        pathRewrite:{
          '^/api' : ''
        }
      }
    }
  },
  lintOnSave:false
})
