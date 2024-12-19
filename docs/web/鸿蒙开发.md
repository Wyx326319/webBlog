# 鸿蒙开发
## 1. 开发工具和环境配置
官网: [https://developer.huawei.com/consumer/cn/develop](https://developer.huawei.com/consumer/cn/develop)
## 2. 基础语法
### 1.声明变量
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
### 2.boolean和数组

### 3.对象
```ts
const obj = new Object()
console.log(JSON.stringify(obj))

// 给对象添加键值对
interface generate{
  name?: string,
  age?: number
}

const obj1:Record<string,string|number> = {
  'name': 'allen',
  'age': 18
}


console.log("obj," + JSON.stringify(obj1))

// 动态添加属性


// 动态添加键名
// 需要定义泛型Record<K,V>
let key = "sex"
obj1[key] = "男"
console.log('obj1,' + JSON.stringify(obj1))

// 如何遍历对象

console.log(JSON.stringify(Object.entries(obj1)))
Object.entries(obj1).forEach(item => {
  console.log("key",item[0])
  console.log("value",item[1])
})
```
### 4.类
```ts
class Car {
  public name:string = ''
  model:string = ''
  static staticAttr= "静态属性"
  private privateAttr= "私有属性"

  constructor(name:string,model:string) {
    this.name=name
    this.model=model
  }
}

const car = new Car("宝马","530")
console.log(JSON.stringify(car))

// 对象字面量的方式创建实例

class Person{
  name?:string
  age?:number
}

const p:Person = {

}
```