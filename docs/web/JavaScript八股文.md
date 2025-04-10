## 1.js中的数据类型
在js中有8种数据类型，包括基本数据类型和引用数据类型，基本数据类型为: null, undefined, string, boolean, number, symbol, bigInt,引用数据类型为 Object. 其中symbol和bigint是es6新增的数据类型。

在这里面有很多需要注意的问题: 
1. 转换问题: 
    显示转换: 
        转为数值类型: Number(), parseInt(), parseFloat()
        转为字符串类型: String(), toString()
    隐式转换: 
        转为数值类型: +符号 / + 0
        转为字符串: + '', `${}`所有插入的值都会通过toStirng()转换为字符串
2. 模板字符串中会保留字符串中的空格，需注意!


## 2. 作用域