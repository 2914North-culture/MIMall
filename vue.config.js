module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,   // localohst:8080/api       //  
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',   //   https://message.bilibili.com/
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        } // pathRewrite相当于重定义 (这里是把/api和/api之前的都替换为'')
      }
    }
  },
  productionSourceMap: false, // 源码不对外开放，build打包时不生成map映射文件
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  } // 删除预加载
}