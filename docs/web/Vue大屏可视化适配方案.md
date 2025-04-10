# Vue大屏可视化适配方案

### 方案一: 使用css中的transform
优点:   
1. 代码量少，适配简单
2. 一次处理后不需要在各个图表中再去单独适配  

缺点:   
1. 当大屏跟 ui 稿的比例不一样时，会出现周边留白情况
2. 当缩放比例过大时候，字体会有一点点模糊
3. 当缩放比例过大时候，事件热区会偏移。
以下三种方法的原理就是利用transform进行缩放(等比例或不等比例)  

> 1. 下面的这个是可以适配所有的屏幕，但是会存在宽很长，高很短的情况(不等比例)  
具体案例：[https://wyx326319.github.io/big-screen/#/main/page0](https://wyx326319.github.io/big-screen/#/main/page0)
```js
/**
 * 大屏自适应
 * @param {*} appRef  大屏的容器
 * @returns 
 */
export function useMain(appRef) {
    // 大屏初始宽高
    const baseWidth = 1920
    const baseHeight = 1080
    // 初始比例
    const scale = {
      width: 1,
      height: 1
    }
    // 计算比例
    function calcRate() {
      scale.width = ((window.innerWidth) / baseWidth).toFixed(5)
      scale.height = ((window.innerHeight) / baseHeight).toFixed(5)
      appRef.style.transform = `scale(${scale.width},${scale.height})`
    }
    // 做一个防抖效果
    let timer = null
    function resize() {
      if(timer) {
        clearTimeout(timer)
      } 
      timer = setTimeout(() => {
        calcRate()
      },200)
    }
  
    window.addEventListener('resize', resize)
  
    return {
        calcRate
    }
  }
```
> 2. 下面的js会返回保持原大屏的比例，但是会出现白边的问题(等比例)
```js
/**
 * 大屏自适应
 * @param {*} appRef  大屏的容器
 * @returns 
 */
export function useMain(appRef) {
    // 大屏初始宽高
    const baseWidth = 1920
    const baseHeight = 1080
    // 初始比例
    const baseScale = baseWidth / baseHeight
    // 计算比例
    let scale = 1
    function calcRate() {
      const width = window.innerWidth
      const height = window.innerHeight
      if((width/height) > baseScale) {
        scale = height / baseHeight
    } else {
        scale = width / baseWidth
      }
      appRef.style.transform = `scale(${scale},${scale})`
    }
    // 做一个防抖效果
    let timer = null
    function resize() {
      if(timer) {
        clearTimeout(timer)
      } 
      timer = setTimeout(() => {
        calcRate()
      },200)
    }
  
    window.addEventListener('resize', resize)
  
    return {
        calcRate
    }
  }
```
> 3. 使用v-scale-screen插件
具体使用方法请移步官网查看  
[https://gitcode.com/gh_mirrors/vs/v-scale-screen/blob/v3.0/README.zh_CN.md](https://gitcode.com/gh_mirrors/vs/v-scale-screen/blob/v3.0/README.zh_CN.md)

### 方案二: 使用vw,vh单位
> 1. less 方案
```css

@charset "utf-8";
 
// 默认设计稿的宽度
@designWidth: 1920;
 
// 默认设计稿的高度
@designHeight: 1080;
 
.px2vw(@name, @px) {
  @{name}: (@px / @designWidth) * 100vw;
}
 
.px2vh(@name, @px) {
  @{name}: (@px / @designHeight) * 100vh;
}
 
.px2font(@px) {
  font-size: (@px / @designWidth) * 100vw;
}
```
在vite.config.js中配置
```js
css: {
  preprocessorOptions: {
    less: {
      additionalData: `@import "@/styles/util.less";`,
    },
  },
}

```
在vue中使用
```vue
<template>
    <div class="box">			
    </div>
</template>
 
<script>
export default{
    name: "Box",
}
</script>
 
<style lang="less" scoped="scoped">
/* 
 直接使用 vw 和 vh 函数，将像素值传进去，得到的就是具体的 vw vh单位		 
 */
.box{
    .px2vw(width, 300);
    .px2vh(height, 100);
    .px2font(16);
    .px2vw(margin-left, 300);
    .px2vh(margin-top, 100);
    background-color: black;
}
</style>
```


> 2.sass方案
```css
@use "sass:math";
 
// 默认设计稿的宽度
$designWidth: 1920;
// 默认设计稿的高度
$designHeight: 1080;
 
// px 转为 vw 的函数
@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}
 
// px 转为 vh 的函数
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
 
 
 
 
// 如果sass版本比较老 不支持math的话使用以下
 
// 默认设计稿的宽度
$designWidth: 1920;
// 默认设计稿的高度
$designHeight: 1080;
 
// px 转为 vw 的函数
@function vw($px) {
  @return ($px / $designWidth) * 100vw;
}
 
// px 转为 vh 的函数
@function vh($px) {
  @return ($px / $designHeight) * 100vh;
}
```
在vite.config.js中配置
```js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/util.scss";`,
    },
  },
}

```
在vue中使用
```vue

<template>
    <div class="box">			
    </div>
</template>
 
<script>
export default{
    name: "Box",
}
</script>
 
<style lang="scss" scoped="scoped">
/* 
 直接使用 vw 和 vh 函数，将像素值传进去，得到的就是具体的 vw vh 单位		 
 */
.box{
    width: vw(300);
    height: vh(100);
    font-size: vh(16);
    background-color: black;
    margin-left: vw(10);
    margin-top: vh(10);
    border: vh(2) solid red;
}
</style>
```
图表文字和间距的调整可以看这篇文章[https://juejin.cn/post/7163932925955112996](https://juejin.cn/post/7163932925955112996)
### 方案三: rem

