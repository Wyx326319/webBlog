# 数据结构与算法的学习

## 常见的数据结构

    数据(Array)
    栈(Stack)
    链表(Linked List)
    图(Graph)
    散列表(Hash)
    队列(Queue)
    堆(Heap)
    树(Tree)

## 1.数组(Array)

## 2.栈(Stack)

在js中其实是不存在栈的，栈本质上可以看作是特殊的数组

### 栈的特点：后进先出的线性表

### 栈常用的方法

    stack.pop() //出栈  
    stack.push()  //入栈  
    stack.peek() // 返回栈顶元素  
    stack.toString() // 将栈转为字符串

### 栈的封装

    # 是ES13新特性，表示该变量为私有变量.在类外部无法访问

```js
    class Stack {
    #items = []

    pop() {
        return this.#items.pop()
    }

    push(data) {
        this.#items.push(data)
    }

    peek() {
        return this.#items.at(-1)
    }

    toString() {
        return this.#items.join(',')
    }

    isEmpty() {
        return this.#items.length === 0
    }

    size() {
        return this.#items.length
    }

    clear() {
        return this.#items = []
    }
}

let stack = new Stack();
```

### 实际应用

#### 进制转换

    写一个函数将10进制的数字转为其他进制的数字。

```js
    // 写函数
function reserve(number, base) {
    let stack = new Stack();
    let baseStr = '0123456789ABCDDEF'
    let str = ""
    while (number > 0) {
        stack.push(number % base)
        number = Math.floor(number / base)
    }
    while (!stack.isEmpty()) {
        str += baseStr[stack.pop()]
    }
    return str
}
```

## 3.队列(Queue)

### 队列的特点

先入先出的线性表,队列只允许队头删除，队尾插入，队列中没有元素时，成为空队列

### 队列的封装

第一版  
队列的封装和栈的封装类似

### 队列常用的方法

dequeue() 出队  
enqueue() 入队  
front() 队头  
isEmpty() 是否为空  
size() 队列的长度  
clear() 清楚队列  
toString() 转为字符串

```js
    class Queue {
    #items = []

    dequeue() {
        return this.#items.shift()
    }

    enqueue(data) {
        this.#items.push(data)
    }

    front() {
        return this.#items.at(0)
    }

    isEmpty() {
        return this.#items.length === 0
    }

    size() {
        return this.#items.length
    }

    clear() {
        this.#items = []
    }

    toString() {
        this.#items.join(",")
    }
}
```

### 缺点

1.shift删除数组中的元素比较耗费性能(具体原因可以百度一下)

2.如果使用delete数组中的空间会浪费,如下图

![img](/images/8.png)

第二版 使用删除对象的特性可以解决第一版队列的缺点

```js
class Queue {
    #items = {}
    // 队头的索引
    #lowCount = 0
    // 队尾的索引
    #count = 0

    dequeue() {
        if (this.isEmpty()) return undefined
        let res = this.#items[this.#lowCount]
        delete this.#items[this.#lowCount]
        this.#lowCount++
        return res
    }

    enqueue(data) {
        this.#items[this.#count] = data
        this.#count++
    }

    front() {
        return this.#items[this.#lowCount]
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.#count - this.#lowCount
    }

    clear() {
        this.#items = {}
        this.#lowCount = 0
        this.#count = 0
    }

    toString() {
        let str = ""
        for (let i = this.#lowCount; i < this.#count; i++) {
            str += `${this.#items[i]} `
        }
        return str
    }
}
```

### 队列的实际应用(击鼓传花)

```js
class Queue {
    #items = {}
    // 队头的索引
    #lowCount = 0
    // 队尾的索引
    #count = 0

    dequeue() {
        if (this.isEmpty()) return undefined
        let res = this.#items[this.#lowCount]
        delete this.#items[this.#lowCount]
        this.#lowCount++
        return res
    }

    enqueue(data) {
        this.#items[this.#count] = data
        this.#count++
    }

    front() {
        return this.#items[this.#lowCount]
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.#count - this.#lowCount
    }

    clear() {
        this.#items = {}
        this.#lowCount = 0
        this.#count = 0
    }

    toString() {
        let str = ""
        for (let i = this.#lowCount; i < this.#count; i++) {
            str += `${this.#items[i]} `
        }
        return str
    }
}

function game(arr, nums) {
    const queue = new Queue();
    for (let i = 0; i < arr.length; i++) {
        queue.enqueue(arr[i])
    }

    while (queue.size() > 1) {
        for (let i = 0; i < nums; i++) {
            queue.enqueue(queue.dequeue())
        }
        console.log(queue.dequeue(), "淘汰了");
    }
    return queue.dequeue()
}
```

### 上述代码千万不要忽略console.log()中的出队操作

## 双端队列

所谓的双端队列就是同时遵循后进先出和先进先出的特性的队列,在队列的基础上添加栈的特性。

```js
class DeQueue {
    #items = {}
    #lowCount = 0 // 队头索引
    #count = 0 // 队尾索引

    dequeue() {
        if (this.isEmpty()) return
        let res = this.#items[this.#lowCount]
        delete this.#items[this.#lowCount]
        this.#lowCount++
        return res
    }

    removeBack() {
        if (this.isEmpty()) return
        this.#count--
        let res = this.#items[this.#count]
        delete this.#items[this.#count]
        return res;
    }

    peekFront() {
        return this.#items[this.#lowCount]
    }

    peekBack() {
        if (this.isEmpty()) return
        return this.#items[this.#count - 1]
    }

    addBack(data) {
        this.#items[this.#count] = data
        this.#count++
    }

    addFront(data) {
        if (this.isEmpty()) {
            this.addBack(data)
        } else {
            if (this.#lowCount > 0) {
                this.#lowCount--
                this.#items[this.#lowCount] = data
            } else {
                for (let i = this.size(); i > 0; i--) {
                    this.#items[i] = this.#items[i - 1]
                }
                this.#items[0] = data
                this.#count++
            }
        }
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.#count - this.#lowCount
    }

    clear() {
        this.#items = {}
        this.#lowCount = 0
        this.#count = 0
    }

    toString() {
        let str = ''
        for (let i = 0; i < this.#count; i++) {
            str += `${this.#items[i]} `
        }
        return str
    }
}
```

### 实际运用

如何判断一个字符串是否是回文字符串？  
回文字符串是字符串正着读和逆着读都是同一个字符串，例如"aba","ata"

```js
function test(str) {
    const lowStr = str.toLocaleLowerCase().split(' ').join('')
    let deQueue = new DeQueue()

    for (let i = 0; i < str.length; i++) {
        deQueue.addBack(str[i])
    }
    let isEqual = true
    while (deQueue.size() > 1){
        if (deQueue.removeBack() !== deQueue.dequeue()) {
            isEqual = false
            break;
        }
    }
    return isEqual
}

console.log(test("a b a")); // 输出 true
console.log(test("a b c")); // 输出 false
console.log(test("ab")); // 输出 false
console.log(test("aa")); // 输出 true
console.log(test("a")); // 输出 true
console.log(test("acgca")); // 输出 true
```

## 4.链表
## 单链表
单链表的特点:  
① 插入和删除的效率高O(1)级别,只需要更改指针指向即可.随机访问效率低O(n)级别,需要从链头至链尾一个个遍历  
② 和数组相比，内存消耗更大，因为每个存储数据的节点都需要额外的空间存储后继指针 
```js
class Node{
    constructor(element) {
        this.element = element
        this.next = null
    }    
}

class LinkList {
    constructor() {
        this.count = 0
        this.head = null
    }
    
    push(element) {
        const node = new Node(element);
        if (this.head === null) {
            this.head = node 
        } else {
            let current = this.head
            while (current.next !== null) {
                current = current.next
            }
            current.next = node
        }
        this.count++
    }
    
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                this.head = this.head.next
            } else {
                let previous = this.getNodeAt(index - 1)
                let current = this.getNodeAt(index)
                previous.next = current.next
            }
            this.count--
            return current.element
        }   
        return 
    }
    
    equal(a,b) {
        return a === b
    }
    
    indexOf(element) {
        let current = head
        for (let i = 0; i < this.count; i++) {
            if (this.equal(element,current.element)){
                return i
            }
            current = current.next            
        }
        return -1
    }
    
    removeElement(element) {
        // 根据数据返回索引
        const index = this.indexOf(element)
        return this.removeAt(index)
    }
    
    getNodeAt(index) {
        if (index >= 0 && index < this.count) {
            let node = this.head
            for (let i = 0; i < index; i++) {
                node = node.next
            }
            return node
        }
        return 
    }
    
    insert(element,index) {
        if (index >= 0 && index <= this.count){
            const node = new Node(element);
            if(index === 0) {
                const current = this.head
                node.next = current
                this.head = node
            } else {
                const previous = this.getNodeAt(index-1)
                const current = previous.next
                node.next = current
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }
    
    isEmpty() {
        return this.size() === 0
    }
    
    size() {
        return this.count        
    }
    
    getHead() {
        return this.head
    }
    
}
```

## 双向链表

```js
class DoublyNode extends Node {
    constructor() {
        super()
        this.prev = null
    }
}

class DoublyLinkList extends LinkList {
    constructor(){
        super()
        this.tail = null
    }
    
    push(element) {
        const doublyNode = new DoublyNode(element)
        if (this.head === null) {
            this.head = doublyNode
            this.tail = doublyNode
        } else {
            this.tail.next = doublyNode
            doublyNode.prev = this.tail
            this.tail = doublyNode
        }
        this.count++
    }
    
    insert(index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyLinkList()
            let current = this.head
            if (index === 0) {
                if (this.head === null) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    this.head.prev = node
                    this.head = node
                }
            } else if(index === this.count - 1) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                let previous = this.getNodeAt(index - 1)
                let current = previous.next
                previous.next = node
                node.prev = previous
                node.next = current
                current.prev = node
            }
            this.count++
        }   
        return
    }
    
    removeAt(index) {
        if (index >= 0 && index < this.count){
            let current = this.head
            if (index = 0) {
                this.head = current.next
                if (this.count = 1){
                    this.tail = null                    
                } else {
                    this.head.prev = undefined
                }
            }else if (index === this.count-1) {
                current = this.tail
                this.tail = current.prev
                this.tail.next = undefined
            } else {
                let previous = this.getNodeAt(index - 1)
                current = previous.next
                previous.next = current.next
                current.next.prev = previous
            }
            this.count--
            return true
        }
        return false
    }
    
    getHead() {
        return this.head
    }
    
    getTail() {
       return this.tail
    }
}

const linkList = new DoublyLinkList()
```

## 循环链表
```js

class CirularLinkedList extends LinkList{
    constructor() {
        super()
    }
    push(element) {
        const node = new Node(element);
        if (this.head = null){
            this.head = node            
        } else {
            let current = this.getNodeAt(this.size() - 1)
            current.next = node
        }
        node.next = this.head
        this.count++
    }
    
    insert(element,index) {
        if (index >= 0 && index <= this.count){
            const node = new CirularLinkedList()
            if (index === 0) {
                if (this.head=== null) {
                    this.head = node
                    node.next = this.head
                } else {
                    node.next = this.head
                    current = this.getNodeAt(this.size() - 1)
                    this.head = node
                    current.next = this.head
                }
            } else {
                const previous = this.getNodeAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }
    
    removeAt(index) {
        if (index >=0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = null
                }else {
                    let lastNode = this.getNodeAt(this.size() - 1)
                    this.head = current.next
                    lastNode.next = this.head
                }
            }else {
                let previous = this.getNodeAt(index-1)
                current = previous.next
                previous.next = current.next
            }
            this.count--
            return current.element
        }
    }
    
}

let list = new CirularLinkedList()
```

## set集合结构
集合是由一组无序且唯一(即不能重复)的项组成的。
特点：  
1. 无序  
2. 唯一
```js
class Set {
    #items = {}
    add(element) {
        if (!this.has(element)) {
            this.#items[element] = element
            return true
        }
        return false
    }
    delete(element){
        if (this.has(element)) {
            delete this.#items[element]
            return true
        }
        return false
    }
    has(element) {
        return element in this.#items
    }
    clear() {
        this.#items = {}
    }
    size() {
        return Object.keys(this.#items).length
    }
    values() {
        return Object.values(this.#items)
    }
}
let set = new Set() 
```
## ES6中的Set集合
```js
const setA = new Set([1,2,3])
const setB = new Set([1,2,3])

//交集
const set = new Set([...setA].filter(item => setB.has(item)))
    
//并集
const set = new Set([...setA,...setB])

//差集
const set = new Set([...setA].filter(item => !setB.has(item)))
```
## 字典数据结构

```js
class Dictionary {
    #table = {}

    toStrFn(item) {
        if (item === null) return "Null"
        else if (item === undefined) return "UNDEFINED"
        else if (typeof item || item instanceof String) return item
        else JSON.stringify(item)
    }

    hasKey(key) {
        return this.#key[this.toStrFn(key)] !== null
    }

    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key)
            this.#table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }

    get(key) {
        let valuePair = this.#table[toStrFn(key)];
        return valuePair === null ? undefined : valuePair
    }
    
    remove(key) {
        if (this.hasKey(toStrFn(key))){
            delete this.#table[toStrFn(key)]
            return true
        }
        return false
    }
    
    keys() {
        return this.keyValues().map(item => item.key)
    }
    
    values() {
        return this.keyValues().map(item => item.value)
    }
    
    keyValues() {
        return Object.values(this.#table)   
    }
    
    clear() {
        this.#table = {}
    }

    size() {
        return Object.keys(this.#table).length
    }

    isEmpty() {
        return this.size() === 0
    }
    
    forEach(cb) {
        const valuePair = this.keyValues()
        for (var i = 0; i < valuePair.length; i++) {
            cb(valuePair[i].key,valuePair[i].value)
        }
    }
}

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}
```
## 散列表

~~~js
    class Dictionary {
    #table = {}

    toStrFn(item) {
        if (item === null) return "Null"
        else if (item === undefined) return "UNDEFINED"
        else if (typeof item || item instanceof String) return item
        else JSON.stringify(item)
    }
    
    hashCode(key) {
        let num
        for (let i = 0; i < key.length; i++) {
            num += key.chartCodeAt(i)            
        }
        return num
    }

    hasKey(key) {
        return this.#key[this.toStrFn(key)] !== null
    }

    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.hashCode(this.toStrFn(key)) 
            this.#table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }

    get(key) {
        let valuePair = this.#table[toStrFn(key)];
        return valuePair === null ? undefined : valuePair
    }

    remove(key) {
        if (this.hasKey(toStrFn(key))){
            delete this.#table[toStrFn(key)]
            return true
        }
        return false
    }

    keys() {
        return this.keyValues().map(item => item.key)
    }

    values() {
        return this.keyValues().map(item => item.value)
    }

    keyValues() {
        return Object.values(this.#table)
    }

    clear() {
        this.#table = {}
    }

    size() {
        return Object.keys(this.#table).length
    }

    isEmpty() {
        return this.size() === 0
    }

    forEach(cb) {
        const valuePair = this.keyValues()
        for (var i = 0; i < valuePair.length; i++) {
            cb(valuePair[i].key,valuePair[i].value)
        }
    }
}

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}
~~~
## 二叉搜索树
二叉搜索树是二叉树特殊的一种,只允许在左侧节点存储(比父节点)小的值，在右侧节点存储(比父节点)大的值

### 二叉搜索树-插入-查询-删除

```js
class Node {
    constructor() {
        this.key = null
        this.left = null
        this.right = null
    }
}

const compare = {
    less: -1,
    equl: 0,
    bigger: 1
}

class BST {

    constructor() {
        this.root = null
    }

    insert(key) {
        if(this.root === null) {
            this.root = new Node()
        } else {
            this.insertNode(this.root,key)
        }
    }

    compareFn(a,b) {
        if (a===b) {
            return compare.equl
        }
        return a < b ? compare.less : compare.bigger
    }

    insertNode(node,key) {
        if (this.compareFn(node.key,key) === compare.less) {
            if (node.right === null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right,key)
            }
        } else {
            if (node.left === null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left,key)
            }
        }
    }
    
    // 中序遍历
    inOrderMap(callback) {
        this.inOrderMapNode()
    }
    
    inOrderMapNode(node,callback) {
        if (node != null) {
            this.inOrderMapNode(node.left,callback)
            callback(node.key)
            this.inOrderMapNode(node.right,callback)
        }
    }
    
    // 先序遍历
    preOrderMap(callback) {
        this.preOrderMapNode()
    }

    preOrderMapNode(node,callback) {
        if (node != null) {
            callback(node.key)
            this.preOrderMapNode(node.left,callback)
            this.preOrderMapNode(node.right,callback)
        }
    }

    // 后序遍历
    postOrderMap(callback) {
        this.postOrderMapNode()
    }

    postOrderMapNode(node,callback) {
        if (node != null) {
            this.postOrderMapNode(node.left,callback)
            this.postOrderMapNode(node.right,callback)
            callback(node.key)
        }
    }
    
    min() {
        return this.minNode(this.root)
    }

    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }
    
    max() {
        return this.maxNode(this.root)
    }

    maxNode() {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }
    
    search(key) {
        return this.searchNode(this.root,key)
    }
    
    searchNode(node,key) {
        if (node === null) {
            return false
        } 
        if(this.compareFn(node.key,key) === compare.less) {
            return  searchNode(node.left,key)
        } else if(this.compareFn(node.key,key) === compare.bigger) {
            return searchNode(node.right,key)
        } else {
            return true 
        }
    }
    
    remove(key) {
        this.root = this.removeNode(this.root,key)
    }
    removeNode(node,key) {
        if (node == null) {
            return null
        }
        if(this.compareFn(key,node.key) === compare.less) {
            node.left = this.removeNode(node.left,key)
            return node
        }else if(this.compareFn(key,node.key) === compare.bigger) {
            node.right = this.removeNode(node.left,key)
            return node
        }else {
            if(node.left === null && node.right === null) {
                node = null
            }
            if (node.left == null){
                node = node.right
                return node
            }else if(node.right == null) {
                node = node.left
                return node
            }
            
            const target = minNode()
            node.key = target.key
            node.right = this.removeNode(node.right,target.key)
            return node
        }
    }
}
```

## 二叉堆
二叉堆是一种特殊的二叉堆，它有以下两种特性:  
1.它是一颗完全二叉树，表示树的每一层都有左侧和右侧子节点(除了最后一层的叶子节点),并且最后一层的
叶子节点尽可能都是左侧子节点，这叫做结构特性
2.二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值。所
有的节点都大于等于或小于等于每个它的子节点。这叫做堆特性

```js
const compare = {
    less: -1,
    equal: 0,
    bigger: 1
}

class Minheap{
    constructor() {
        this.heap = [];
    }
    
    getLeftIndex(index) {
        return 2 * index + 1
    }
    
    getRightIndex(index) {
        return 2 * index + 2 
    }
    getParentIndex(index) {
        return Math.floor((index-1)/2)
    }
    
    insert(value) {
        if (value != null) {
            this.heap.push(value)
           this.shiftUp(this.heap.length - 1 )
           return true 
        }
        return false
    }
    
    shiftUp(index) {
        let parent =  this.getParentIndex(index)
        while (index > 0 && this.compareFn(this.heap[parent],this.heap[index] === compare.bigger)) {
            swap(this.heap,parent,index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }
    
    swap(array,a,b) {
        const temp = array[a]
        array[a] = array[b]
        array[b] = temp
    }
    
    size() {
        return this.heap.length
    }
    
    isEmpty() {
        return this.size() === 0
    }
    
    findTarget() {
        return this.heap[0]
    }
    
    remove(){
        
    }
}
```
