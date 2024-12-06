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
## 立体文字
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body{
      background: #ccc;
    }
    .text{
      font-size: 90px;
      text-align: center;
      margin-top: 200px;
      text-shadow: 1px -1px #fff,-1px 1px #999,-5px 5px 2px #808080;
      color: #e6e6e6;
    }
  </style>
</head>
<body>
  <div class="text">
    立体文字效果
  </div>
</body>
</html>
```

效果如下: 
![img](/images/css/text.png)

## 文字立起来的效果
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Carver玩转css</title>
    <style>
        *{
          margin: 0;
          padding: 0;
        }

        html{
          overflow: hidden;
        }

        body{
          background: #bababa;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
        }

        .text{
          margin-top: 200px;
          font-size: 80px;
          color: #fff;
          text-align: center;
          position: relative;
          width: fit-content;
          left: 30%;
        }

        .text::after{
          content: "立起来的文字效果";
          position: absolute;
          left: 0;
          top: 0;
          color: #000;
          transform: translate(-51px, 20px) scaleY(0.5) skew(50deg) ;
          z-index: -1;
          filter: blur(5px);
          -webkit-mask: linear-gradient(transparent, #000) 
        }
    </style>
</head>
<body>
<div>
    <h1 class="text">立起来的文字效果</h1>
</div>
</body>
</html>
```

效果如下
![img](/images/css/li.png)

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
.marquee2 {
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

.marquee2 p {
  width: 100%;
  animation: marquee2 23s linear infinite;
}
 
@keyframes marquee {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes marquee2 {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
    </style>

</head>

<body>
  <div style="display: flex;justify-content: center;">
    <div class="marquee">
        <p>我是跑马灯1号<span>我是跑马灯1号</span></p>
      </div>
    <div class="marquee2">
        <p>我是跑马灯什么什么什么什么什么号<span>我是跑马灯什么什么什么什么什么号</span></p>
      </div>
  </div>
</body>

</html>
```
这个跑马灯需要根据数据的长度来计算动画的时间保证两个跑马灯的速度是相同的,上面的代码为两个简单的相同速度的跑马灯，其实也没有什么不一样，只有动画时间是不一样的。

效果如下:  
![img](/images/css/marquee3.png)

## 跑马灯边框

### 首尾不相连
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
:root{
  --border-width: 5px;
}

.loginForm{
  width: 400px;
  height: 300px;
  padding: var(--border-width);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  background: transparent;
  margin: 200px auto;
}

.loginForm::after{
  content: "";
  position: absolute;
  left: var(--border-width);
  top: var(--border-width);
  background: #ccc;
  width: calc(100% - var(--border-width) * 2);
  height: calc(100% - var(--border-width) * 2);
  z-index: -1;
  border-radius: 6px;
}

.loginForm::before {
  width: 510px;
  height: 510px;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background: linear-gradient(90deg, #000, yellow 20%);
  transform-origin: 0 0;
  z-index: -2;
  animation: rotate1 3s linear infinite;
}

    @keyframes rotate1 {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  </style>
</head>
<body>
  <div class="loginForm">
    跑马灯边框
  </div>
</body>
</html>
```

![img](/images/css/2.png)


### 首尾相连
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
:root{
  --border-width: 5px;
}

.loginForm{
  width: 400px;
  height: 300px;
  padding: var(--border-width);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  background: transparent;
  margin: 200px auto;
}

.loginForm::after{
  content: "";
  position: absolute;
  left: var(--border-width);
  top: var(--border-width);
  background: #ccc;
  width: calc(100% - var(--border-width) * 2);
  height: calc(100% - var(--border-width) * 2);
  z-index: -1;
  border-radius: 6px;
}

.loginForm::before {
  width: 510px;
  height: 510px;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background: linear-gradient(90deg, #000, yellow 20%);
  transform-origin: center center;
  z-index: -2;
  animation: rotate1 3s linear infinite;
}

    @keyframes rotate1 {
      0% {
        transform: translateY(-50%) translateX(-50%) rotate(0deg);
      }

      100% {
        transform: translateY(-50%) translateX(-50%) rotate(360deg);
      }
    }
  </style>
</head>
<body>
  <div class="loginForm">
    跑马灯边框
  </div>
</body>
</html>
```
![img](/images/css/1.png)
## 瀑布流

#### 等高的瀑布流

#### 不等高的瀑布流


