# ajax

## 题目
1.手写一个简易的ajax

xhr.readyState  
0 - (未初始化) 还没有调用send()方法  
1 - (载入) 一调用send()方法，正在发送请求  
2 - (载入完成) send()方法执行完成，已接收到全部相应内容    
3 - (交互) 正在解析响应内容  
4 - (完成) 响应内容解析完成，可以在客户端调用  

xhr.status  
2xx - 表示成功处理请求，如200  
3xx - 需要重定向，浏览器直接跳转，如301 302 304  
4xx - 客户端请求错误,如404 403  
5xx - 服务器端错误  
```js
const xhr = new XMLHttpRequest()
xhr.open('GET','/data/test.json',true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText))
        } else {
            console.log("其他情况")
        }
    }
}
xhr.send(null)

const xhr = new XMLHttpRequest()
xhr.open('POST','/login',true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText))
        } else {
            console.log("其他情况")
        }
    }
}
const postData = {
    name: '张三',
    password: 123456
}
xhr.send(JSON.stringify(postData))
```
2.跨域的常用实现方式
什么是跨域(同源策略)?  

## 知识点
1. XMLHttpRequest
2. 状态码
3. 跨域: 同源策略，跨域解决方案
