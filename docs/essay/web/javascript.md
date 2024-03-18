# Javascript

## 1.typeof能判断哪些类型？
识别所有的值类型   
```js
let a;      typeof s // 'undefined'
const str = 'abc';      typeof s // 'string'
const n = 100;          typeof s // 'number'
const m = true;             typeof s // 'boolean'
const s = Symbol('s');    typeof s // 'symbol'
```
识别函数
```js
typeof console.log // 'function'
typeof function (){} // 'function'
```
判断是否是引用类型(不可再细分)
```js
typeof null // 'object'
typeof ['a','b']    // 'object'
typeof { x: 100}    // 'object'
```

## 2.何时使用 === 何时使用 ==


## 3.值类型和引用类型的区别?
```js
    // 值类型
    let a = 10;
    let b = a;
    a = 20;
    console.log(b) // 10

    // 引用类型
    let a = { age: 10 };
    let b = a;
    a.age = 21;
    console(b.age) // 21

    // 常见的值类型
    const a ;
    const s = 'abc';
    const n =  100;
    const b = true;
    const s = Symbol('s')

    // 常见的引用类型
    const obj = {}
    const arr = []
    const n = null
    function fn() {}
```

## 4.手写深拷贝
```js
/**
 * 深拷贝
 * @param obj 深拷贝的对象
 */
function deepClone(obj={}) {
    if(typeof obj !== 'object' || obj == null) {
        return obj
    }
    // 初始化返回结果
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    
    for (let key in obj) {
        // 保证key不是原型的属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key])
        }
    }
    // 返回结果
    return result
}
```
## 5.变量计算 - 类型转换
1.字符串拼接
```js
const a = 100 + 10; // 110
const b = 100 + '10'; // '10010'
const c = true + '10'; // 'true10'
```
2.== 运算符

```js
100 == '100' // true
0 == '' // true
0 == false // true
false == '' // true
null == undefined // true
```
除了 == null之外，其他一律用 ===,
例如
```js
const obj = { x: 100 }
if (obj.a == null) {}
// 相当于
// if(obj.a === null || obj.a === undefined) { }
```
3.if语句和逻辑运算  
if语句判断的就是truly变量和falsely变量  
truly变量: !!a === true的变量  
falsely变量: !!a === false的变量
```js
// 以下是fasely变量。除此之外都是 truly 变量
!!0 === false
!!NaN === false
!!'' === false
!!null === false
!!undefined === falsed
!!false === false

console.log(10 && 0) // 0
console.log('' || 'abc')  // abc
console.log(!window.abc)  // true
```
## 6.原型和原型链
原型
```js
// class本质上是函数，可见class是语法糖
typeof Student // "function"
typeof Person // "function"

// 基于原型的执行规则
// 先在自身属性和方法上寻找
// 如果找不到则自动去__proto__中寻找
```

如何准确判断一个变量是不是数组?
```js
[] instanceof Array // Object
[] instanceof Object // Object
{} instanceof Array // Object
```
手写一个简易的jQuery,考虑插件和扩展性
```js
class jQuery{
    constructor(selector) {
        const result = document.querySelectorAll(selector)
        const length = result.length
        for (let i = 0; i < length; i++) {
            this[i] = result[i]
        }
        this.length = length
    }
    
    get(index) {
        return this[index]
    }
    
    each(fn) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i]
            fn(elem)
        }
    }
    
    on(type,fn) {
        return this.each(elem => {
            elem.addEventListener(type,fn,false)
        })
    }
    
}

// 插件
jQuery.prototype.dialog = function (info) {
    alert(info)
}

// "造轮子"

class myJquery extends jQuery{

    constructor(selector) {
        super(selector);
    }
    
    // 扩展自己的方法
    addClass() {
        
    }
    
    style(data) {
        
    }
}

// const $p = new jQuery('p')
// $p.get(1)
// $p.each((elem) => {console.log(elem.nodeName)})
// $p.on('click',() => alert('clicked'))
```
## 7.作用域和闭包
知识点  
三级作用域：全局作用域,函数作用域,块级作用域(ES6新增)  
闭包的两种情况
```js
// 函数作为返回值
function create() {
    let a = 100
    return function () {
        console.log(a)
    }
}

let fn= create()
let a = 200
fn()

// 函数作为参数
function print(fn) {
    let a = 200
    fn()
}
let a = 100
function fn() {
    console.log(a)
}
print(fn)
```

```js
function create() {
    const a = 100
    return function () {
        console.log(a)
    }
}

const fn = create()
const a = 200
fn() // 100


function print(fn){
    const a = 200
    fn()
}

const a = 100
function fn() {
    console.log(a)
}

print(fn) // 100

// 闭包自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方!!!
```
this的不用应用场景,如何取值?  
this取什么样的值，是在函数执行的时候决定的，不是在函数定义的时候决定的
手写bind函数
```js
Function.prototype.bind1 = function () {
    // 将参数拆解为数组,arguments为一个列表
    const args = Array.prototype.slice.call(arguments)
    // 获取要绑定的this
    const t = args.shift()
    // 获取真实的this
    const self = this
    return function () {
        return self.apply(t,args)
    }
}
```
实际开发中闭包的应用场景,举例说明  
闭包隐藏数据，只提供API
```js
function createCache() {
    const data = {}
    return {
        set:function (key,val){
            data[key] = val
        },
        get: function (key) {
            return data[key]            
        }
    }
}

const c = createCache()
c.set('a',100)
console.log(c.get('a'))
```

```js
let a
for (let i = 0; i < 10 ; i++) {
    a=document.createElement('a')
    a.innerHTML= i + '<br>'
    a.addEventListener('click',function(){
        e.preventDefault()
        alert(i)
    })
    document.body.appendChild(a)
}
```

## 8.同步和异步有什么不同?
JS是单线程语言，只能同时做一件事  
基于js是单线程语言  
异步不会阻塞代码  
同步会阻塞代码执行  
```js
// 同步

console.log(100)
setTimeout(() => {
    console.log(200)
})
console.log(300)

// 异步
console.log(100)
alert(200)
console.log(300)
```
应用场景  
网络请求,如ajax图片加载
定时任务,如setTimeout

## 9.async-await和promise有什么关系?
执行async函数，返回的是Promise对象  
await相当于Promise的then
执行async返回的是一个promise对象


