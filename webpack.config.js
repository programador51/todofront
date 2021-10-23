const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const data = require('./data/people.json');

/////////////////////////////////// NEW //////////////////////////////////
module.exports = {
    entry:{
        index:'./js/index.js',
        todo:'./js/todo.js'
        // footer:'./ts-code/components/footer.ts'
    },  
    output:{
        filename:'[name].bundle.js',
        path:`${__dirname}/public`
    },
    plugins:[

        new MiniCssExtractPlugin({
            filename:`[name].css`,
            chunkFilename: '[name]'
        }),

        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html',
            inject:'body'
        }),

        new HtmlWebpackPlugin({
            filename:'todo.html',
            template:'./todo.html',
            inject:'body'
        })

        ////////////////////////////////////////

    ],
    module:{
        rules:[
            {
                test: /\.scss$/i,
                use: [
                    
                    MiniCssExtractPlugin.loader, //3. Inject into chunk file
                    
                    "css-loader", // 2. Turn css into commonjs code
                    
                    "sass-loader", // 1. Turns scss into css code
                  ]
            }
        ]
    },
    resolve:{
        extensions:[
            '.tsx',
            '.ts',
            '.js'
        ]
    }
}