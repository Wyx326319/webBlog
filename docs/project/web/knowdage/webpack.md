# webpack

## 基础
webpack是一个静态资源打包工具  
他会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。
输出的文件就是编译好的文件，就可以在浏览器中运行了  
我们将webpack输出的文件叫做bundle  

### 功能介绍
webpack本身功能是有限的  
    开发模式:   仅能编译js中的ES Module语法   
    生产模式:   能编译JS中的ES Module语法，还能压缩JS代码  

## 1.webpack的五大核心概念:   
1.entry 入口  
    指示webpack从哪个文件开始打包  
2.output 输出  
    指示webpack打包完的文件输出到哪里，如何命名等
3.loader 加载器
    webpack本身只能处理js、json等资源，其他资源需要借助loader,Webpack才能解析  
4.plugin 插件  
    扩展webpack功能  
5.mode 模式   
    开发模式: development  
    生产模式: production

## 2.webpack的基本配置
```js
const path = require('path')
module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        path: path.reslove(__dirname,'src'),
        filename: 'main.js'
    },
    // 加载器
    module: {
         rules: []
    },
    // 插件
    plugins: [],
    // 模式
    mode: "development"
}

```
## 3.开发模式介绍
顾名思义就是我们开发代码时使用的模式  
这个模式下我们主要做两件事:  
    1.编译代码，使浏览器能识别运行  
    开发时我们有样式资源，字体图标，图片资源，html资源等，webpack默认都不能处理这些资源，所以我们要加载配置来编译这些资源  
    2.代码质量检查，树立代码规范  
    提前检查代码的一些隐患，让代码运行时能更加健壮。  
    提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观。  
## 4.处理样式资源
### 处理css资源
1.下载loader
```
npm install style-loader css-loader -D
```
2.在webpack的配置文件中添加以下配置
```js
const path = require('path')
module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        path: path.reslove(__dirname,'src'),
        filename: 'main.js'
    },
    // 加载器
    module: {
         rules: [
             // loader的配置
             {
                 test: /\.css$/,// 只检测.css文件
                 use: [
                     // 执行顺序：从右到左(从下到上)
                     "style-loader", //将js中的css代码通过创建style标签的形式显示页面
                     "css-loader" // 将css资源编译成commonjs资源的模块到js中
                 ]
             }
         ]
    },
    // 插件
    plugins: [],
    // 模式
    mode: "development"
}
```
### 处理less资源
1.下载loader
```
    npm install less less-loader --save-dev
```
2.在webpack配置文件module.rules中添加以下内容
```js
{
     test: /\.less$/,// 只检测.less文件
     use: [
         // 执行顺序：从右到左(从下到上)
         "style-loader", //将js中的css代码通过创建style标签的形式显示页面
         "css-loader", // 将css资源编译成commonjs资源的模块到js中
        "less-loader"
     ]
}
```
### 处理sass资源
1.下载loader
```
    npm install sass sass-loader -D
```
2.在webpack配置文件module.rules中添加以下内容
```js
{
     test: /\.s[ac]ss$/,// 只检测.s[ac]ss文件
     use: [
         // 执行顺序：从右到左(从下到上)
         "style-loader", //将js中的css代码通过创建style标签的形式显示页面
         "css-loader", // 将css资源编译成commonjs资源的模块到js中
        "sass-loader"
     ]
}
```
### 处理stylus资源
1.下载loader
```
    npm install stylus-loader -D
```
2.在webpack配置文件module.rules中添加以下内容
```js
{
     test: /\.styl$/,// 只检测.styl文件
     use: [
         // 执行顺序：从右到左(从下到上)
         "style-loader", //将js中的css代码通过创建style标签的形式显示页面
         "css-loader", // 将css资源编译成commonjs资源的模块到js中
        "stylus-loader"
     ]
}
```
## 5.处理图片资源
1.在webpack配置文件module.rules中添加以下内容
```js
{
    test: /\.(png|jpe?g|webp|gif)$/,// 只检测.(png|jpe?g|webp|gif)文件
    type: "asset",
    parser: {   
         dataUrlCondition: {
             // 小于10kb的图片转base64
             // 优点: 减少请求数量 缺点： 体积变大
             maxSize: 10 * 1024 // 10kb
         }
    }
}
```
2.修改输出文件目录
```js
{
    test: /\.(png|jpe?g|webp|gif)$/,// 只检测.(png|jpe?g|webp|gif)文件
    type: "asset", // 对小于设定值的图片转为base64
    parser: {   
         dataUrlCondition: {
             // 小于10kb的图片转base64
             // 优点: 减少请求数量 缺点： 体积变大
             maxSize: 10 * 1024 // 10kb
         }
    },
    generator: {
        // 输出图片名称
        // [hash:10]: hash值取前10位
        filename: "static/images/[hash][ext][query]"
    }
}
```
## 6.自动清空上次打包内容
1.在webpack中output中添加clean: true
````js
output: {
    path: path.reslove(__dirname,'src'),
    filename: 'static/js/main.js',
    clean: true
}
````
## 7.处理字体图标资源
1.下载字体图标库
2.在webpack配置文件module.rules中添加以下内容
```js
{
    test: /\.(ttf|woff2?)$/,// 只检测.(ttf|woff2?)文件
    type: "asset/resource", // 对文件原封不动的输出
    generator: {
        // 输出图片名称
        // [hash:10]: hash值取前10位
        filename: "static/media/[hash][ext][query]"
    }
}
```
## 8.处理其他(音视频)资源
在webpack配置文件module.rules中添加以下内容
```js
{
    test: /\.(ttf|woff2?|map3|mp4)$/,// 只检测.(ttf|woff2?)文件
    type: "asset/resource", // 对文件原封不动的输出
    generator: {
        // 输出图片名称
        // [hash:10]: hash值取前10位
        filename: "static/media/[hash][ext][query]"
    }
}
```
## 9.处理js资源
webpack对js的处理是有限的，只能编译js中ES模块化语法，不能编译其他语法，导致js不能在IE等浏览器运行，所以我们希望做一些兼容性处理  
其次开发中，团队对代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测  
    1.针对js兼容性处理，我们使用babel来完成
    2.针对代码格式，我们使用Eslint来完成  
我们先完成Eslint，检测代码格式无误后，在由Babel做代码兼容性处
## 10.Eslint 
可组装的Javascript和JSX检查工具

它是用来检测js和jsx语法的工具，可以配置各项功能

1.配置文件
在项目根目录下创建.eslintrc.js文件或者可以在package.json中eslintConfig中写
2.具体配置
```js  
module.exports = {
     // 解析选项
    parserOptions: {
        ecmaVersion: 6, // ES语法版本
        sourceType: 'module', // ES模块化
        ecmaFeatures: { // ES其他特性
            jsx: true // 如果是React项目，就需要开启jsx语法
        }
    },

    // 具体检查规则
    rules: {
        semi: "error",
        eqeqeq: [
            "warn", // 强制使用 === 和 !==, 否则警告
            "smart" // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
        ]
    },
    // 继承其他规则
    extends: ["eslint:recommended"], // 继承Eslint规则
    // 其他规则详见： https://eslint.bootcss.com/docs/user-guide/configuring
```
##### 示例
```js
module.exports = {
    extends: ["eslint:recommended"],
    env: {
        node: true, // 启用node中全局变量
        browser: true //启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 6, // ES语法版本
        sourceType: 'module', // ES模块化
    },
    rules: {
        "no-var": 2,//不能使用 var 定义变量
    }
}
```
## 11.babel
javaScript编译器  
主要用于将ES6语法编写的代码转换为向后兼容的javascript语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

1.配置文件
跟目录创建babel.config.js  
2.具体配置  
```js
module.exports = {
    // 预设
    /*
    * 1.@babel/preset-env: 一个智能预设，允许您使用最新的javascript
    * 2.@babel/preset-react: 一个用来编译React jsx语法的预设
    * 3.@babel/preset-typescript: 一个用来编译TypeScript语法的预设
    * */
    presets: []
}
```

##### 在webpack中使用
1.安装
```js
npm install -D babel-loader @babel/core @babel/preset-env
```
2.在根项目中创建babel.config.js文件
```js
module.exports = {
    presets: ["@babel/preset-env"]
}

```

3.在webpack.config.js中的module.rules中添加如下规则
```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
}
```

## 12.处理html资源
自动引入打包的html,css,js文件  
1.下载插件
```js
npm install --save-dev html-webpack-plugin
```
2.在webpack配置文件中添加如下代码
```js
plugin: [
    new HtmlWebpackPlugin({
        //模板：以public/index.html文件创建新的html文件
        // 新的html文件特点: 1.结构和原来一致 2.自动引入打包输出的资源
        template: path.resolve(__dirname,"public/index.html")
    })
]
```
## 13.搭建开发服务器
开发服务器： 不会输出资源，是在内存中打包的  
自动化  
问题： 每次更改文件后都需要重新打包，太麻烦。为了解决这个问题可以搭建一个开发服务器  
1. 下载包
```js
npm install webpack-dev-server -D
```
2.配置  
在webpacke配置文件中添加如下配置
```js
// 开发服务器
devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 端口号
    open: true // 是否自动打开浏览器
}
```

## 14.生产模式
生产模式是开发完成代码后，我们需要得到代码将来部署上线  
这个模式下我们主要对代码进行优化，让其运行性能更好  
优化主要从两个角度出发：  
1. 优化代码运行性能  
2. 优化代码打包速度  

## 15.提取css文件成单独文件 
Css文件目前被打包到js中，当js文件加载时，会创建一个Style标签来生成样式  
这样对于网站来说，会出现闪屏现象，用户体验不好  
我们应该是单独的Css文件，通过link标签加载性能才好  
1.下载插件
```js
npm i mini-css-extract-plugin -D
```
2.配置  
webpack.prod.js
````js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

将所有的style-loader 换成MiniCssExtractPlugin.loader

plugin({
    new MiniCssExtractPlugin({
        filename: "static/css/main.css"
    })
})
````

## 16.样式兼容性处理
1.下载包
```js
npm i postcss postcss-loader postcss-preset-env -D
```
2.配置  
webpack.prod.js  
```js
// 该配置需要写在css-loader 后，在less-loader前
{
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: [
                "post-css-preset-env",// 能解决大多数兼容性问题
            ]
        }
    }    
}
```
3. 在package.json中配置
我们可以在package.json中添加browserslist来控制样式的兼容性做到什么程度   
实际开发中我们一般不考虑旧版本的浏览器了，所以我们可以这样设置：
```json
"browserslist": [
        "last 2 version", // 所有市面上浏览器的最近的两个版本
        "> 1%", // 覆盖99%的浏览器 
        "not dead" // 不要已经淘汰的浏览器
]
```
## 17.css压缩
1.下载
```js
npm install css-minimizer-webpack-plugin --save-dev
```
2.配置
```js
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
plugin: [
    new CssMinimizerWebpackPlugin()
]
```

## 18.HTML和 JS压缩介绍
HTML和JS在生产环境下默认压缩

## 高级
所谓的高级配置其实就是进行webpack优化，让我们代码在编译/运行时性能更好  
我们会从以下角度来进行开发  
1.提升开发体验  
2.提升打包构建速度  
3.减少代码体积  
4.优化代码运行性能
## 1.SourceMap(源代码映射)
SourceMap是一个用来生成源代码与构建后代码--映射的文件的方案  
他会生成一个xxx.map文件，让浏览器提示出错的代码  

在实际开发中我们只需要关注两种情况:  
1.开发模式：cheap-module-source-map  
    优点:  打包编译速度快，只包含行映射  
    缺点： 没有列映射  
```js
module.exports = {
    // 其他省略
    mode: 'development',
    devtool: 'cheap-module-source-map'
}
```
2.生产模式: source-map
    优点： 包含行/列映射
    缺点： 打包编译速度更慢
```js
module.exports = {
    // 其他省略
    mode: 'production',
    devtool: 'source-map'
}
```

## 2.HMR
开发时我们修改了其中一个模块代码,webpack默认会将所有的模块全部重新打包编译，速度很慢。  
所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快  

HotModuleReplacement(HMR/热模块替换)： 在程序运行中，替换、添加或删除模块，而无需重新加载整个页面  

###配置
```js
module.exports = {
    devServer: {
        host: "localhost",
        port: '3000',
        open: true,
        hot: true // 开启热替换(只能用于开发环境，生产环境不需要了)(默认值)
    }
}
```
此时css样式经过style-loader处理，已经具备HMR功能，但是js还不行

```js
// 在main.js中添加如下代码
if (module.hot){
    module.hot.accept("./js/count");
    module.hot.accept("./js/sum");
    
}
```
上面这样写会很麻烦，所以实际开发我们会使用其他loader来解决
比如: vue-loader,react-hot-loader

## 3.oneOf
打包时每个文件都会经过所有loader处理，虽然因为test正则原因实际没有处理上，但是都要经过一遍。比较慢  
oneOf就是只能匹配上一个loader,剩下的就不匹配了  
### 配置
```js
module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        path: path.reslove(__dirname,'src'),
        filename: 'main.js'
    },
    // 加载器
    module: {
         rules: [
         {
             oneOf: [
                 // loader的配置
                 {
                     test: /\.css$/,// 只检测.css文件
                     use: [
                         // 执行顺序：从右到左(从下到上)
                         "style-loader", //将js中的css代码通过创建style标签的形式显示页面
                         "css-loader" // 将css资源编译成commonjs资源的模块到js中
                     ]
                 },
                 {
                     test: /\.less$/,// 只检测.less文件
                     use: [
                         // 执行顺序：从右到左(从下到上)
                         "style-loader", //将js中的css代码通过创建style标签的形式显示页面
                         "css-loader", // 将css资源编译成commonjs资源的模块到js中
                         "less-loader"
                     ]
                 }
             ]
         }
         ]
    },
    // 插件
    plugins: [],
    // 模式
    mode: "development"
}
```
## 4.Include-Exclude
开发时，我们需要使用第三方的库和插件时，所有文件都下载到node_modules中了。而这些文件是不需要编译可以直接使用的  
所以我们在对js文件处理时，要排除node_modules文件

include  
包含   只处理xx文件
exclude  
不包含  除了xxx文件，其他文件都处理

## 5.Eslint和Babel的缓存 
每次打包都要经过Eslint检查和Babel编译，速度比较慢  
我们可以缓存之前的Eslint检查和Babel编译结果，这样第二次打包时速度就会更快了  

### 配置
babel缓存  
```js
{
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
            cacheDirectory: true, // 开启babel缓存
            cacheCompression: false, // 关闭缓存文件压缩
        }   
    }
}
```
ESLint缓存
```js
module.exports = {
    // ... 
    plugins: [
        new ESLintPlugin({
            context: path.reslove(__dirname,"../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.reslove(__dirname,"../node_modules/.cache/eslintcache")
        })
    ]
    
}
```

## 6.多进程打包
当项目越来越大时，打包速度越来越慢，甚至于需要一个下午才能打包出来代码，这个速度是比较慢的。  
我们想要继续提升打包速度，其实就是要提升js的打包速度，因为其他文件都比较少  
而对js文件处理主要就是eslint,babel,Terser三个工具，所以我们要提升他们的运行速度。  
我们可以开启多进程同时处理js文件，这样速度就比之前的单进程打包更快了  

多进程打包：开启电脑的多个进程同时干一件事，速度更快  
需要注意： 请仅在特别耗时的操作中使用，因为每个进程启动就有大约为600ms左右开销  

我们启用进程的数量就是我们CPU的核数。  
1.如何获取CPU的核数，因为每个电脑都不一样。  
```js
// nodejs核心模块，直接使用
const os = require("os");
//cpu核数
const threads = os.cpus().length
```
2.下载包
```js
npm i thread-loader -D
```
3.使用
```js
    // nodejs核心模块，直接使用
    const os = require("os");
    //cpu核数
    const threads = os.cpus().length
    const  TerserWebpackPlugin = require("terser-webpack-plugin")

    module: {
        rules: [
            {
                oneOf: [
                    // loader的配置
                    {
                        test: /\.js$/,// 只检测.js文件
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    works: threads // 进程数量
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启babel缓存
                                    cacheCompression: false, // 关闭缓存文件压缩
                                }
                            }
                        ]
                    },
                ]
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.reslove(__dirname,"../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.reslove(__dirname,"../node_modules/.cache/eslintcache"),
            threads // 开启多进程
        }),
        // new TerserWebpackPlugin({
        //    parallel: threads // 开启多进程和进程数量 
        // })
    ],
    // 压缩可以放在这里，webpack5推荐放在这里 
    optimization: [
        minimizer: [
            new TerserWebpackPlugin({
                parallel: threads // 开启多进程和进程数量 
            })
        ]   
    ]   
```
## 7. treeShaking
开发时我们定义了一些工具函数或者引用第三方工具函数或组件库  
如果没有特殊处理的话，我们打包时会引入整个库，但是实际上我们只需要及其一小部分功能  
这样将整个库打包进来，体积太大了  

treeShaking用于移除Javascript中没有使用上的代码
注意： 它依赖 ES module

### 怎么用?
webpack默认开启了这个功能，无需其他配置

## 8.减少babel生成文件的体积
Babel为编译的每个文件都插入了辅助代码，使得体积过大

@babel/plugin-transform-runtime： 禁用了Babel自动对每个文件的runtime注入，而是引入  
并且使所有的代码都可以从这里引用

### 怎么用? 
1.下载包
```js
npm i @babel/plugin-transform-runtime -D
```
2.配置
```js
{
    test: /\.js$/,// 只检测.js文件
    use: [
        {
            loader: "babel-loader",
            options: {
                works: threads // 进程数量
            }
        },
        {
            loader: "babel-loader",
            options: {
                cacheDirectory: true, // 开启babel缓存
                cacheCompression: false, // 关闭缓存文件压缩
                plugins: ["@babel/plugin-transform-runtime"] // 减少代码体积
            }
        }
    ]
},
```
## 9. 压缩图片
注意: 如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩  
image-minimizer-webpack-plugin: 用来压缩图片的插件
1. 下载包
```js
npm i image-minimizer-webpack-plugin imagemin -D
```
还有剩下包需要下载，有两种模式  
无损压缩  
```js
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```
有损压缩
```js
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```

2.配置  
我们以无损压缩为例  
```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    // ....
    optimization: {
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads, // 开启多进程
            }),
            // 压缩图片
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
    },
    // devServer: {
    //   host: "localhost", // 启动服务器域名
    //   port: "3000", // 启动服务器端口号
    //   open: true, // 是否自动打开浏览器
    // },
    mode: "production",
    devtool: "source-map",
};
```

3.打包时会出现报错：
```js
Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
```
我们需要安装两个文件到 node_modules 中才能解决, 文件可以从课件中找到：  
- jpegtran.exe  
[jpegtran官网地址](https://jpegclub.org/jpegtran/)  
需要复制到 node_modules\jpegtran-bin\vendor 下面  
- optipng.exe  
[OptiPNG官网地址](https://optipng.sourceforge.net/)    
需要复制到 node_modules\optipng-bin\vendor 下面
  
## 优化代码性能(Code Split)---------------------

打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样加载的资源就少，速度就更快。

代码分割（Code Split）主要做了两件事：  

1. 分割文件：将打包生成的文件进行分割，生成多个 js 文件。  
2. 按需加载：需要哪个文件就加载哪个文件。


## 多入口
多入口多输出

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clear: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
};
```

## 多入口提取公共代码
如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。

我们需要提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好。

修改配置文件  
```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

## 多入口按需加载
按需加载，动态导入  
想要实现按需加载，动态导入模块。还需要额外配置：

1. 修改文件

- main.js
```js
console.log("hello main");
document.getElementById("btn").onclick = function () {
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import("./math.js").then(({ sum }) => {
    alert(sum(1, 2, 3, 4, 5));
  });
};
```
app.js
```js
console.log("hello app");
```
public/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code Split</title>
  </head>
  <body>
    <h1>hello webpack</h1>
    <button id="btn">计算</button>
  </body>
</html>
```
2.运行指令
```js
npx webpack
```
我们可以发现，一旦通过 import 动态导入语法导入模块，模块就被代码分割，同时也能按需加载了。




