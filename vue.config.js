module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: "https://sb-data-kondoumh.netlify.app"
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}
