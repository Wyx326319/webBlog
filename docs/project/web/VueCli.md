# 从零开始搭建Vue-cli

## 最基础的webpack功能
1.创建一个文件夹vue-cli,在该文件夹下创建一个webpack.config.js文件  
2.在vue-cli文件夹下创建src/main.js文件  
3.执行npm init 生成package文件  
4.下载webpack 和 webpack-cli  
```js
npm install webpack webpack-cli -D
```
5.在webpack.config.js中写入webpack五大核心  
```js
const path = require("path")
module.exports = {
    entry: "./src/main.js", // 入口
    output: {
        path: path.resolve(__dirname,"./dist"), // 输出文件位置
        filename: "main.js" //输出文件名
    },
    // 加载器
    module: {
        rules: [
            // loader的位置
        ]
    },
    // 插件
    plugins: [

    ],
    mode: "development" // 开发者模式
}

```
5.在项目根目录下执行npx webpack 就打包成功啦!!!


目前是一个最基础的webpack功能，接下来去一步一步实现vue-cli的功能
# 实现处理html,css,js,vue文件功能
## 处理html功能
1.在项目根目录下创建一个public/index.html文件  
```html
<!DOCTYPE html>
<html lang="zh-CH">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue Cli</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```
2.配置
```js
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: "./src/main.js", // 入口
    output: {
        path: path.resolve(__dirname,"./dist"), // 输出文件位置
        filename: "main.js" //输出文件名
    },
    // 加载器
    module: {
        rules: [
            // loader的位置
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 模板
            template: path.resolve(__dirname,"./public/index.html")
        })
    ],
    mode: process.env.NODE_ENV, // 模式
}
```
3.下载包
```js
npm install  html-webpack-plugin -D
```
## 处理样式文件(css,scss,less,stylus)  
    ...生产环境下将css代码提取成单独的文件  
    ...生产环境下将css代码压缩  
    ...css代码的兼容性  
```js
//.....
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css提取成单独的文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin") //css压缩
const isProduction = process.env.NODE_ENV === 'production' // 是否为生产环境
const getStyleLoader = (pre) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
        "css-loader",
        {
            // css的兼容性，需要配合package.json中的browserslist配置
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            }
        },
        pre
    ].filter(Boolean)
}
module.exports = {
    //.....
    module: {
        rules: [
            // loader的位置
            { test: /\.css$/, use: getStyleLoader() },
            { test: /\.less$/, use: getStyleLoader("less-loader") },
            { test: /\.s[ac]ss$/, use: getStyleLoader("sass-loader") },
            { test: /\.styl$/, use: getStyleLoader("stylus-loader") },
        ]
    },
    // 插件
    plugins: [
        //.....
        isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
        })
    ],
    optimization: {
        minimize: isProduction,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
}
```
在package.json文件中添加下面配置
```json
"browserslist": [
"last 2 version",
"> 1%",
"not dead"
],
```
下载包
```js
npm install mini-css-extract-plugin css-minimizer-webpack-plugin 
postcss-loader postcss-preset-env css-loader vue-style-loader less 
less-loader sass sass-loader stylus stylus-loader -D
```
如果出现以下错误
![img](/public/images/install.png)  
将下载指令下图指令
![img](/public/images/trueInstall.png)  

## 处理js文件
1.配置js相关loader和插件
```js
//.....
const EslintWebpackPlugin = require("eslint-webpack-plugin");
module.exports = {
    //.....
    // 加载器
    module: {
        rules: [
            //.....
            {
                test: /.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true, // 开启缓存
                    cacheCompression: false, // 关闭缓存压缩
                },
            }
        ]
    },
    plugins: [
        //.....
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
    ]
}
```
2.在根目录下创建babel.config.js文件，并添加以下配置
```js
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
};

```
3.在根目录下创建.eslintrc.js文件，并添加以下配置
```js
module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
    parserOptions: {
      parser: "@babel/eslint-parser",
    },
  };
  
```
4.下载包
```js
npm install @vue/cli-plugin-babel eslint-webpack-plugin 
babel-loader @babel/core babel-preset-env @babel/eslint-parser -D
```

## 处理vue文件
1.添加vue相关loader
```js
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    // 加载器
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: "vue-loader",
                options: {
                    // 开启缓存
                    cacheDirectory: path.resolve(__dirname,"../node_modules/.cache/vue-loader")
                }
            }
        ]
    },
    // 插件
    plugins: [
        new VueLoaderPlugin(),
    ]
}
```
2.下载包
```js
npm install -D vue-loader vue-template-compiler
```

## 开发服务器配置
1.配置
```js
module.exports = {
    devServer: {
        host: "localhost", // ip地址
        port: 3000, // 端口号
        open: true, //浏览器自动打开
        hot: true, // 开启HMR
        historyApiFallback: true, // 解决前端路由刷新404问题
    },
}
```
2. 下载包
```js
 npm install webpack-dev-server vue@3 -D
```
3.在src目录下创建App.vue组件
```vue
<template>
  <div>
    APP
  </div>
</template>

<script>
export default {
  setup() {
    return {

    }
  }
}
</script>

<style scoped>

</style>

```
4.修改main.js中的代码
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount("#app")
```
5.在package.json中加入下列配置
```json
"scripts": {
    "dev": "webpack server --config ./webpack.config.js",
    "build": "webpack --config ./webpack.config.js"
  },
```
6.执行npm run dev  
出现以下错误
![img](/public/images/crossenv.png)  
下载cross-env包，执行 npm install --save-dev cross-env  
修改package中的指令为  
```json
 "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server --config ./webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.js"
  },
```
重新执行 npm run dev
7.浏览器控制台会出现以下警告  
![img](/public/images/vue-cli/vueWarning.png)  
引入 DefinePlugin,并填写以下配置
```js
const { DefinePlugin } = require("webpack");

new DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
})
```
重新编译执行npm run dev  
如此一个简单的vue-cli就实现了！！！！

虽然完成了简单的vue-cli但是还有一部分需要优化  
## 处理其他资源
## 处理图片资源,添加下列配置
```js
// 处理图片
module.exports = {
    //.....
    output: {
        path: isProduction ? path.resolve(__dirname, "./dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            //......
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset", // 小于10kb会转成base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
        ]
    }
    //.....
}
            
```
## 处理其他资源
```js
module.exports = {
    //.....
    module: {
        rules: [
            //......
            {
                test: /\.(woff2?|ttf)$/,
                type: "asset/resource",// 原封不动输出
            }
        ]
    }
    //.....
}
```
## 生产模式logo复制到dist文件中
在html文件中添加如下代码
```html
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```
添加配置
```js
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    //.....
    plugins: [
        //.....
        isProduction &&
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        // 忽略index.html文件
                        ignore: ["**/index.html"],
                    },
                },
            ],
        }),
    ]
    //......
}
```
下载包
```js
npm install -D copy-webpack-plugin
```
## 代码分割
```js
module.exports = {
    //.....
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: "vue",
                    priority: 40
                },
                elementPlus: {
                    test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                    name: "elementPlus-chunk",
                    priority: 30
                },
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "libs-chunk",
                    priority: 20
                }
            }
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
        //...
    }
}
```
## 关闭webpack性能分析
```js
module.exports = {
    //.....
    performance: false // 关闭性能分析，提升打包速度
}
```
## webpack解析模块加载选项
```js
module.exports = {
    //...
    // webpack解析模块加载选项
    resolve: {
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],
        // 路径别名
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },
}
```
## 图片压缩  
 配置
```js
//.....
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    //...
    minimizer: [
        //.....
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [
                                    "preset-default",
                                    "prefixIds",
                                    {
                                        name: "sortAttrs",
                                        params: {
                                            xmlnsOrder: "alphabetical",
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
    ],
    //.....
}
```
下载包
```js
npm i image-minimizer-webpack-plugin imagemin -D
```
无损压缩
```js
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```
#### 这几个无损压缩的包比较难下，实在下载不成功可以直接使用我分享的包复制到node_modules里面
[https://pan.baidu.com/s/1Kx9AxQfKMcIC1Hj6HiYWAQ?pwd=6666](https://pan.baidu.com/s/1Kx9AxQfKMcIC1Hj6HiYWAQ?pwd=6666) 

至此我们简易的vue-cli就搭建好了!!!!!!

## 完整搭建的vue-cli
webpack.config.js
```js
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css提取成单独的文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin") //css压缩
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const CopyPlugin = require("copy-webpack-plugin");


const isProduction = process.env.NODE_ENV === 'production' // 是否为生产环境
const getStyleLoader = (pre) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
        "css-loader",
        {
            // css的兼容性，需要配合package.json中的browserslist配置
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            }
        },
        pre
    ].filter(Boolean)
}
module.exports = {
    entry: "./src/main.js", // 入口
    output: {
        path: isProduction ? path.resolve(__dirname, "./dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true,
    },
    // 加载器
    module: {
        rules: [
             // loader的位置
             { test: /\.css$/, use: getStyleLoader() },
             { test: /\.less$/, use: getStyleLoader("less-loader") },
             { test: /\.s[ac]ss$/, use: getStyleLoader("sass-loader") },
             { test: /\.styl$/, use: getStyleLoader("stylus-loader") },
             {
                test: /.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true, // 开启缓存
                    cacheCompression: false, // 关闭缓存压缩
                },
            },
            {
                test: /.vue$/,
                loader: "vue-loader",
                options: {
                    // 开启缓存
                    cacheDirectory: path.resolve(__dirname,"../node_modules/.cache/vue-loader")
                }
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset", // 小于10kb会转成base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            {
                test: /\.(woff2?|ttf)$/,
                type: "asset/resource",// 原封不动输出
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 模板
            template: path.resolve(__dirname,"./public/index.html")
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
        }),
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
        }),
        isProduction &&
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./public"),
                    to: path.resolve(__dirname, "./dist"),
                    globOptions: {
                        // 忽略index.html文件
                        ignore: ["**/index.html"],
                    },
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: "vue-chunk",
                    priority: 40
                },
                elementPlus: {
                    test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                    name: "elementPlus-chunk",
                    priority: 30
                },
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "libs-chunk",
                    priority: 20
                }
            }
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
        minimize: isProduction,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ]
    },
    resolve: {
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],
        // 路径别名
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },
    mode: process.env.NODE_ENV, // 模式
    devServer: {
        host: "localhost", // ip地址
        port: 3000, // 端口号
        open: true, //浏览器自动打开
        hot: true, // 开启HMR
        historyApiFallback: true, // 解决前端路由刷新404问题
    },
    performance: false // 关闭性能分析，提升打包速度
}
```
babel.config.js
```js
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
};
```
.eslintrc.js
```js
module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
    parserOptions: {
      parser: "@babel/eslint-parser",
    },
  };
  
```
package.json
```json
{
  "name": "vue-cli",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack server --config ./webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "babel-loader": "^9.1.3",
    "babel-preset-env": "^1.7.0",
    "copy-webpack-plugin": "^12.0.2",
    "cross-env": "^7.0.3",
    "html-webpack-plugin": "^5.6.0",
    "image-minimizer-webpack-plugin": "^4.0.0",
    "imagemin": "^8.0.1",
    "less-loader": "^12.2.0",
    "sass": "^1.72.0",
    "sass-loader": "^14.1.1",
    "stylus": "^0.63.0",
    "stylus-loader": "^8.1.0",
    "vue": "^3.4.21",
    "vue-loader": "^17.4.2",
    "vue-template-compiler": "^2.7.16",
    "webpack": "^5.90.3",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.3"
  },
  "browserslist": [
    "last 2 version",
    "> 1%",
    "not dead"
  ],
  "dependencies": {
    "@vue/cli-plugin-babel": "^5.0.8",
    "css-loader": "^6.10.0",
    "css-minimizer-webpack-plugin": "^6.0.0",
    "eslint-webpack-plugin": "^4.1.0",
    "less": "^4.2.0",
    "mini-css-extract-plugin": "^2.8.1",
    "postcss-loader": "^8.1.1",
    "postcss-preset-env": "^9.5.2",
    "vue-style-loader": "^4.1.3"
  }
}

```

