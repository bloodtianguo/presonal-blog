const WebpackAliyunOssPlugin = require('./oss');

module.exports = {
    outputDir: 'docs',
    productionSourceMap: false,

    css: {
        sourceMap: true
    },

    configureWebpack: {
        plugins: [
            new WebpackAliyunOssPlugin({
                enable: false
            })
        ]
    },

    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    assetsDir: 'assets',
    productionSourceMap: false,
    configureWebpack: {
        plugins: []
    },
    //=>直接去修改内置的webpack配置项
    chainWebpack: config => {
        //=>config:原始配置信息对象
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options.limit = 200 * 1024;
                return options;
            });
    },
    //=>修改webpack-dev-server配置
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0', // 允许外部ip访问
        port: 8888, // 端口
        https: false, // 启用https
    },

    //=>多余1核cpu时：启动并行压缩
    parallel: require('os').cpus().length > 1
}