const path = require('path')
function resolve (dir) {
    return path.resolve(__dirname, dir)
}
// const cssRules = [
//     {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//     }, {
//         test: /\.styl$/,
//         use: ['style-loader', 'css-loader', 'stylus-loader']
//     }
// ]
module.exports = {
    title: '张爱玲的前端博客',
    description: '~从前端到全栈开发~和码路工人一起学~',
    theme: '',
    themeConfig: {
        nav: require('./nav.js'),
        sidebar: require('./sidebar'),
    },
    host: "localhost",
    port: '8088',
    // stylus: "stylus-loader",
    // postcss:[require('autoprefixer')],
    chainWebpack: (config, isServer) => {
        config.resolve.alias
            .set("@", resolve('docs'))
            .set('@~', resolve("docs/.vuepress"))
        // config.module
        //     .rule(cssRules)

    },
    stylus:{
      preferPathResolver: 'webpack' 
    }
}   
