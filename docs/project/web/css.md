# CSS

## 文字描边
在css中文字描边有两种实现方式  
第一种: text-shadow   给文字6个方向的阴影.  
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .text{
        text-shadow: 
        0px 1px #ff0000,
        0px -1px #ff0000,
        -1px -1px #ff0000,
        1px 1px #ff0000,
        -1px 0px #ff0000,
        1px 0px #ff0000
        ;
        color: #bfa;
    }
</style>
<body>
    <h1 class="text">css描边效果</h1>
</body>
</html>
```
效果图如下: 
![img](/images/css/text-shadow.png)  
优点: 兼容性好，基本上所有的浏览器都支持  
缺点: 文字描边不平滑且不支持透明  
第二种: -webkit-text-stroke   web内核搞出来的，兼容性比较差，支持文字透明
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .text{
        -webkit-text-stroke: 1px red;
        color: transparent;
    }

</style>
<body>
    <h1 class="text">css描边效果</h1>
</body>
</html>
```
效果图如下: 
![img](/images/css/text-stroke.png)  
优点: 描边平滑，支持透明  
缺点: 兼容性较差  


## 跑马灯(无缝)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>跑马灯</title>
    <style>
        
.marquee {
  width: 26px;
  height: 100px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid red;
  text-align: center;
  margin: 0 auto;
}
 
.marquee p {
  width: 100%;
  animation: marquee 10s linear infinite;
}
 
@keyframes marquee {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
    </style>

</head>

<body>
    <div class="marquee">
        <p>这是无缝滚动的跑马灯文字效果示例。<span>这是无缝滚动的跑马灯文字效果示例。</span></p>
      </div>
</body>

</html>
```
这个是我自己实现的无限循环跑马灯，主要是将文字渲染两边，用动画移动自身的50%，造成一个视觉差异

效果如下: 
![img](/images/css/marquee.png)  
![img](/images/css/marquee2.png)  

##### 突然出现一个这样的场景
两个跑马灯，但是文字的长度是不一样的，并且是动态获取的，如何能够保证他们的滚动速度是一样的，并且当数据改变后，不需要维护。
