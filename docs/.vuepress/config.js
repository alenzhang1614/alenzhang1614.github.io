module.exports = {
    title: 'Coder-Monkey',
    description: '~从前端到全栈开发~和码路工人一起学~',
    themeConfig: {
        nav: require('./nav.js'),
        sidebar: require('./sidebar'),
    },
     chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
     config.devServer.open(true)
    
  }
}