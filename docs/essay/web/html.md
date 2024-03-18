# HTML5,CSS3

## 1.语义化的理解。

在写HTML页面结构时所用的标签有意义,头部用head  主体用main  底部用foot...

### 怎么判断页面是否语义化了？

把CSS去掉，如果能够清晰的看出来页面结构，显示内容较为正常

### 为什么要选择语义化？

1.让HTML结构更加清晰明了

2.方便团队协作，利于开发

3.有利于爬虫和SEO

4.能够让浏览器更好的去解析代码

5.给用户带来良好的体验

## 2.H5C3有哪些新特性？

H5的新特性：

1.语义化的标签

2.新增音频视频

3.画布canvas

4.数据存储localstorage sessionstorage

5.增加了表单控件 email url search...

6.拖拽释放API

## CSS3的新特性：

1.新增选择器：属性选择器、伪类选择器、伪元素选择器

2.增加了媒体查询

3.文字阴影

4.边框

5.盒子模型box-sizing

6.渐变

7.过度

8.自定义动画

9.背景的属性

10.2D和3D

### 3.rem是如何做适配的？

rem是相对长度，相对于根元素（html）的font-size属性来计算大小，通常来做移动端的适配

rem是根据根元素font-size计算值的倍数

比如html上的font-size:16px，给div设置宽为1.5rem,1.2rem = 16px*1.2 = 19.2px.

## 4.解决了哪些移动端的兼容问题？

### 当设置样式overflow:scroll/auto时，IOS上的华东会卡顿

-webkit-overflow-scrolling:touch;

### 在安卓环境下placeholder文字设置行高时会偏上

input有placeholder属性的时候不要设置行高

### 移动端字体小于12px时异常显示

应该先把在整体放大一倍，然后再用transform进行缩小

### ios下input按钮设置了disabled属性为true显示异常

input[typy=button]{

    opcity:1

}

### 安卓手机下取消语音输入按钮

input::-webkit-input-speech-button{

    display:none

}

### IOS下取消input输入框在输入引文首字母默认大写

<input autocapitalize='off' autocorrect='off'/>

### 禁用IOS和安卓用户选中文字

添加全局CSS样式：-webkit-user-select:none
### 禁止IOS弹出各种窗口

-webkit-touch-callout:none

### 禁止IOS识别长串数字为电话

添加meta属性 <meta conten='telephone=no' name='format-detection'>
