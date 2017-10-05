var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname,'js/app/index.js'),
    output: {
        path: path.join(__dirname,'../public/javascripts'),
        filename: 'bbbundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    },
    resolve: {
        alias: {
            // jquery: path.join(__dirname,'js/lib/jquery-2.0.3.min.js'),
            // tilt: path.join(__dirname,'js/lib/tilt.js'),
            mod: path.join(__dirname,'js/mod'),
            less: path.join(__dirname,'less')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}