# TypeScript
## 1.静态类型检查
下列代码在ts中会爆红，代码无法执行
```ts
    const message = "hello world!"
    message()
```
## 2.非异常错误
未定义属性/方法
```ts
    const person = {
        name: "小千",
        age:18
    }   
    person.location //在js中会返回undefined   但在ts中会报错
```
错别字
```ts
const a = "HKDSADD"

a.toLocaleLoweCase() // ts会报错
a.toLocaleLowerCase()

```
基本逻辑错误
```ts
const value = Math.random() < 0.5 ? "a" : "b"
if(value !== "a") {
    
}else if(value === "b") {
    
} // ts报错
```

## 3.使用工具
1.安装VSCode  
2.安装Node.js  
3.安装TypeScript编译器  
` npm install -g typescript `

## 4.优化编译
1.解决js和ts冲突问题  
执行`tsc --init`生成配置文件  
2.自动编译  
`tsc --watch`  
3.发出错误  
当ts文件中有错误但是编译成js文件还是可以运行，比如类型错误  
执行下列命令ts有错误时不能编译成js文件  
`tsc -noEmitOnError xxx.ts`

## 5.显示类型
```ts
function great(person:string,date:Date) {
    console.log(`你好啊${person},今天是${date}.`)
}
great("小风",new Date("2020-3-20"))

let message  = "21322146" //类型推断会推断出是字符串
message = 123; // 报错
```

## 6.降级编译
ts.config.json文件中的target会编译成指定的版本
```json
"target": "ES2015",    // 编译成响应的版本
```
## 7.严格模式
在ts.config.json文件中有以下几个选项  
```json
    "strict": true, // 忽略类型验证可以将此项改为false 但是不推荐        
    "noImplicitAny": false,                         
    "strictNullChecks": true,
```
默认情况下undefined，null是可以赋给任何类型的值  可以修改"strict": true来改变  
```ts
let surname:string = undefined
let age: numger:age = null
```
## 8.基元类型
string,number,boolean
```ts
let str: string = "hello typescript"
let num: number = 100
let bool: boolean = true
```

## 9.数组类型
数组两种创建方法
```ts
// 第一种
let arr:number[] = [1,2,3] //数组中的每个元素都必须是number类型
arr = ["a"] //报错

// 第二种
let arr2:Array<number> = [1,2,3]
arr2 = [] //可以将数组元素设为空

```

## any
不希望某个特定值导致类型检查错误
any将关闭所有的类型检查  
```ts
let obj:any = {
    x: 0
}

// 报错 ts类型推断
let obj1 = {
    x: 0
}
```

## 变量上的类型注释
```ts
let myName: string =  "Felixiu"
```

## 函数
通常不用定义函数的返回类型，ts会自动推断return的返回类型
```ts
function great(name:string):void {  // 分别代表参数类型和返回值类型
    console.log(`你好啊,${name}.`)
}
```

## 对象类型
```ts
function printCoord(pt: {x:number,y:number}){
    console.log(`坐标的x值为:${x},坐标的y值为:${y}`)
}

printCoord({
    x: 3,
    y: 7
})


// ?表示该参数可传可不传  并且不能传入其他未定义的属性
function printName(obj:{first:string,last?:string}) {
    //obj.last 可传可不传参数不能直接使用
    obj.last?.toLocaleLowerCase()
}

printName({first: "56"})
printName({first: "56",last:"2465"})
```

## 联合类型
```ts
let id: number | string
function printId (id:number | string){
    console.log("yourId is" + id)
    // 要做判断使用各个类型身上的方法
}
printId(101)
printId("202")


```

## 类型别名

```ts
    type Point = {
        x:number,
        y:number
    }
    
    function printCoor(pt: Point) {
    
    }

    printCoor({
        x: 100,
        y: 200
    })

    type ID = number | string
    function printCode(id: ID) {
        
    }
```

## 接口
接口就是一种类型，是定义对象类型的另一种方式
```ts
interface Point {
    x: number,
    y: number
}

function printCode(pt: Point) {
    
}

printCode({
    
})
```
扩展接口
```ts
// 方式一
interface Animal {
    name: string
}
interface Bear extends Animal{
    honey: boolean
}

const bear:Bear = {
    name:"winnie",
    honey: true
}

//方式二
type Animal {
    name: string
}
type Bear  = Animal & {
    honey: boolean
}

const bear:Bear = {
    name:"winnie",
    honey: true
}
```
向现有的类型添加字段
```ts
interface MyWindow{
    const: number
}
interface MyWindow{
    title: string
}

const w: myWindow = {
    title: "2165",
    count: 100
}


// 报错，类型一旦创建不能修改
type MyWindow{
    const: number
}
type MyWindow{
    title: string
}
```

## 类型断言
```ts
// 方式2
const myCanvas = document.getElementById("canvs") as HTMLCanvasElement
// 方式1
const myCanvas = <HTMLCanvasElement> document.getElementById("canvs") 

// 报错
const x = ("hello" as unknown) as number 
```

## 文字类型
```ts
let x: 'hello' = "hello"

function printText(s:string,alignment: "left" | "right" | "center") {
    
}

// 数字类型
function compare(a:string,b:string): -1|0|1{
    return a ===b ? 0 : a>b?1:-1
}

function handleRequest(url:string,method:"GET"|"POST"|"GUESS") {
    
}

const req = {
    url:"http://localhost",
    method: "GET" //as "GET"
}

handleRequest(req.url,req.method) //as "GET") //报错

//解决  使用类型断言
const req = {
    url:"http://localhost",
    method: "GET"
} as const

```
## null 和 undefined
!一般不要使用
```ts
function liveDangerously(x?: number | null) {
    console.log(x!.toFixed()) // ! 表示这个值不可能是Null或者undefined
}
```
## 枚举
```ts
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
console.log(Direction.Up)
```
