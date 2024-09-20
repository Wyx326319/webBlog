# 鸿蒙开发
## 1. 开发工具和环境配置
官网: [https://developer.huawei.com/consumer/cn/develop](https://developer.huawei.com/consumer/cn/develop)
## 2. 基础语法
### 1.生命变量
```ts
// let 声明变量  可以修改
let hi:string = "hello"

hi = "hello allen"
console.log(hi)  // hello allen
// const 声明常量 不可修改
const foo:number = 1
console.log("const",foo)  // const 1
number = 2 // 报错

const arr:string[] = ['1']
arr[0] = '2' 

console.log("arr",arr) // 2
console.log(JOSN.stringfy(arr)) // ["2"]
```