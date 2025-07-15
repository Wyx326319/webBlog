# Vite打包优化

### 1. 静态资源打包优化
1. 首先创建一个测试的vite项目,放入一些静态资源
![静态资源](/imgs/image.png)
2. 打包看一下打包文件
![打包前文件](/imgs/image-1.png)
3. 在vite.config.js中填入以下代码
```js
build: {
    rollupOptions: {
        output: {
            assetFileNames: 'assets/[name]-[hash][extname]',
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',
        }
    },
}
```
4. 再观察一下打包后的文件
![打包后的文件](/imgs/image-2.png)

#### 前后对比图
优化前打包文件
![打包前文件](/imgs/image-1.png)
优化前打包文件
![打包后的文件](/imgs/image-2.png)