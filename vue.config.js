module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://message.bilibili.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        } // pathRewrite相当于重定义 将路径地址替换成后面的新地址再进行拼接
      }
    }
  }
}