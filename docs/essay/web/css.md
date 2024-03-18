## Html
## 1.如何理解语义化?
    
## 2.默认情况下，哪些HTML标签是块级元素，哪些是内联元素

## Css
## 1.布局
1.盒模型的宽度如何计算?  
① 如下代码，请问div1的offsetWidth 是多大？(122px)
```html
<style>
  #div1{
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
  }
</style>

<div id="div1">
  
</div>
```
② 如下代码,AAA 和 BBB 之间的距离是多少？(15px)  
margin的纵向重叠问题
```html
<style>
  p{
    font-size: 16px;
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 15px;
  } 
</style>

<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```
margin负值的问题?  
① 对margin的top left right bottom设置负值，有何效果?
```html
    margin-top和margin-left负值，元素向上，向左移动
    margin-right负值，右侧元素左移，自身不受影响
    margin-bottom负值，下方元素上移，自身不受影响

```
BFC理解和应用?
Block format context,块级格式化上下文  
一块独立渲染的区域，内部元素的渲染不会影响到外界的元素  
形成BFC的条件  
    1.float不是none  
    2.positions是absolute或fixed  
    3.overflow不是visible  
    4.display是flex inline-block等  
① 如何使用BFC布局?如何应用?
```html


```
float布局的问题,以及clearfix?  
① 如何实现圣杯布局和双飞翼布局?
```html

```
② 手写clearfix
```css
.clearfix{
    content: '';
    display: table;
    clear: both;
}
```
flex画筛子 
①flex实现一个三点的色子
```html
<style>
  .container{
    display: flex;
    justify-content: space-between;
  }
  
  .container .item{
    
  }
</style>
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

```
## 2.定位
    absolute和relative分别依据什么定位?
    居中对齐有哪些实现方式?
## 3.图文样式
    line-height的继承问题?
## 4.响应式
    rem是什么？
    如何实现响应式?

## 5.Css3
    关于Css3动画问题
