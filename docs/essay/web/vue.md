# Vue

## 1.v-if和v-show的区别？

都可以控制元素的显示和隐藏

1.v-show时控制元素的display值来让元素显示和隐藏；v-if显示隐藏时把DOM元素整个添加和删除

2.v-if有一个局部编译/卸载的过程，切换这个过程中会适当的销毁和重建内部的事件监听和子组件；v-show只是简单的css切换

3.v-if才是真正的条件渲染；v-show从false变成true的时候不会触发组件的声明周期，v-if会触发声明周期

4.v-if的切换效率比较低  v-show的效率比较高

## 2.如何理解MVVM的？

是Model-View-ViewModel的缩写。前端开发的架构模式

M：模型，对应的就是data的数据

V：视图，用户界面，DOM

VM：视图模型：Vue的实例对象，连接View和Model的桥梁

核心是提供对View和ViewModel的双向数据绑定，当数据改变的时候，ViewModel能监听到数据的变化，自动更新视图，当用户操作视图的时候，ViewModel也可以监听到视图的变化，然后通知数据进行改动，这就实现了双向数据绑定

ViewModel通过双向绑定把View和Model连接起来，他们之间的同步是自动的，不需要认为干涉，所以我们只需要关注业务逻辑即可，不需要操作DOM，同时也不需要关注数据的状态问题，因为她是由MVVM统一管理

## 3.v-for中的key值的作用是什么？

key属性是DOM元素的唯一标识

作用：

1.提高虚拟DOM的更新

2.若不设置key，可能会触发一些bug

3.为了触发过度效果

## 4.说一下你对vue生命周期的理解。

组件从创建到销毁的过程就是它的生命周期

### 创建  
beforeCreat  
在这个阶段属性和方法都不能使用
created

这里时实例创建完成之后，在这里完成了数据监测，可以使用数据，修改数据，不会触发updated，也不会更新视图

### 挂载

beforeMount

完成了模板的编译，虚拟DOM也完成创建，即将渲染，修改数据，不会触发updated

Mounted

把编译好的模板挂载到页面，这里可以发送异步请求也可以访问DOM节点

### 更新

beforeUpdate

组件数据更新之前使用，数据是新的，页面上的数据时旧的，组件即将更新，准备渲染，可以改数据

updated

render重新做了渲染，这时数据和页面都是新的，避免在此更新数据

### 销毁

beforeDestroy

实例销毁前，在这里实例还可以用，可以清楚定时器等等

destroyed

组件已经被销毁了，全部都销毁

使用了keep-alive时多出两个周期：

activited

组件激活时

deactivited

组件被销毁时

## 5.在created和mounted去请求数据，有什么区别？

created：在渲染前调用，通常先初始化属性，然后做渲染

mounted：在模板渲染完成后，一般都是初始化页面后，在对元素节点进行操作

在这里请求数据可能会出现闪屏的问题，created里不会

一般用created比较多

请求的数据对DOM有影响，那么使用created

如果请求的数据对DOM无关，可以放在mounted

## 6.vue中的修饰符有哪些？

1.事件修饰符

.stop       组织冒泡

.prevent    组织默认行为

.capture    内部元素触发的事件先在次处理

.self       只有在event.target是当前元素时触发

.once       事件只会触发一次

.passive    立即触发默认行为

.native     把当前元素作为原生标签看待

2.按键修饰符

.keyup      键盘抬起

.keydown    键盘按下

3.系统修饰符

.ctrl

.alt

.meta

4.鼠标修饰符

.left       鼠标左键

.right      鼠标右键

.middle     鼠标中键

5.表单修饰符

.lazy       等输入完之后再显示

.trim       删除内容前后的空格

.number     输入是数字或转为数字

## 7.elementui是怎么做表单验证的？

1.在表单中加rules属性，然后再data里写校验规则

2.内部添加规则

3.自定义函数校验

## 8.vue如何进行组件通信？

1.父传子

props

父组件使用自定义属性，然后子组件使用props

$ref

引用信息会注册在父组件的$refs对象上

2.子传父

$emit

子组件绑定自定义事件，触发执行后，传给父组件，父组件需要用事件监听来接收参数

3.兄弟传

new一个新的vue实例，用on和emit来对数据进行传输

4.vuex传值

## 9.keep-alive是什么？怎么使用？

Vue的一个内置组件，包裹组件的时候，会缓存不活跃的组件实例，并不是销毁他们

作用：把组件切换的状态保存在内存里，防止重复渲染DOM节点，减少加载时间和性能消耗，提高用户体验

## 10.axios是怎么做封装的？

下载 创建实例 接着封装请求响应拦截器  抛出 最后封装接口

## 11.vue路由时怎么传参的？

params传参

~~~js
    this.$router.push({name:'index',params:{id:item.id}})
    this.$route.params.id
~~~

路由属性传参

~~~js

    this.$router.push({name:'/index/${item.id}'})

~~~

路由配置 { path:'/index:id' }

query传参（可以解决页面刷新参数丢失的问题）

~~~js
    this.$router.push({
        name:'index',
        query:{id:item.id}
    })
~~~

## 12.vue路由的hash模式和history模式有什么区别？

1.hash的路由地址上有#号，history模式没有

2.在做回车刷新的时候，hash模式会加载对应页面，history会报错404

3.hash模式支持低版本浏览器，history不支持，因为是H5新增的API

4.hash不会重新加载页面，单页面应用必备

5.history有历史记录，H5新增了pushState和replaceState()去修改历史记录，并不会立刻发送请求

6.history需要后台配置

## 13.路由拦截是怎么实现的？

路由拦截 axios拦截

需要在路由配置中添加一个字段，它是用于判断路由是否需要拦截

~~~js

{
    name:'index',
    path:'/index',
    component:Index,
    meta:{
    requirtAuth:true
    }
}

router.beforeEach((to,from,next) => {
    if(to.meta.requirtAuth){
        if( store.satte.token ){
            next()
        }else{

        }
    }
})
~~~

## 14.说一下vue的动态路由。
要在路由配置里设置meat属性，扩展权限相关的字段，在路由导航守卫里通过判断这个权限标识，实现路由的动态增加和跳转  
根据用户登录的账号，返回用户角色  
前端再根据角色，跟路由表的meta.role进行匹配  
把匹配搭配的路由形成可访问的路由  
## 15.如何解决刷新后二次加载路由？
1.window.location.reload()  
2.matcher  

~~~js
    const router = createRouter()
    export function resetRouter(){
        const newRouter = creatRouter()
        router.matcher = newRouter.matcher
    }
~~~

## 16.vuex刷新数据会丢失吗？怎么解决？
vuex肯定会重新获取数据，页面也会丢失数据  
1.把数据直接保存在浏览器缓存里（cookie  localstorage  sessionstorage）  
2.页面刷新的时候，再次请求数据，达到可以动态更新的方法  
监听浏览器的刷新书简，在刷新前把数据保存到sessionstorage里，刷新后请求数据，请求到了用vuex，如果没有那就用sessionstorage里的数据  
## 17.computed和watch的区别？
1.computed是计算属性，watch是监听，监听的是data中数据的变化  
2.computed是支持缓存，依赖的属性值发生变化，计算属性才会重新计算，否则用缓存；watch不支持缓存  
3.computed不支持异步，watch是可以异步操作  
4.computed是第一次加载就监听，watch是不监听  
5.computed函数中必须有return  watch不用  
## 18.vuex在什么场景会去使用？属性有哪些？
state       存储变量  
getters     state的计算属性  
mutations   提交更新数据的方法  
actions     和mutations差不多，他是提交mutations来修改  数据，可以包括异步操作  
modules     模块化vuex  
使用场景：  
用户的个人信息、购物车模块、订单模块  
## 19.vue的双向数据绑定原理是什么？
通过数据劫持和发布订阅者模式来实现，同时利用Object.defineProperty()劫持各个属性的setter和getter，
在数据发生改变的时候发布消息给订阅者，触发对应的监听回调渲染视图，也就是说数据和视图时同步的，数据发生改变，视图跟着发生改变，视图改变，数据也会发生改变。  
第一步：需要observer的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter    
第二步：compile模板解析指令，把模板中的变量替换成数据，然后初始化渲染视图，同时把每个指令对应的节点绑定上更新函数，添加订阅者，如果数据变化，收到通知，更新视图  
第三步：Watcher订阅者是Observer和Compile之间的通信桥梁，作用：  
1.在自身实例化的时候忘订阅器内添加自己  
2.自身要有一个update()方法  
3.等待属性变动时，调用自身的update方法，触发compile这种的回调  
第四步：MVVM作为数据绑定的入口，整合了observer、compile和watcher三者，通过observer来监听自己的数据变化，通过compile解析模板指令，最后利用watcher把observer和compile联系起来，最终达到数据更新视图更新，视图更新数据更新的效果  
## 20.了解diff算法和虚拟DOM吗？
虚拟DOM，描述元素和元素之间的关系，创建一个JS对象  
如果组件内有响应的数据，数据发生改变的时候，render函数会生成一个新的虚拟DOM，这个新的虚拟DOM会和旧的虚拟DOM进行比对，找到需要修改的虚拟DOM内容，然后去对应的真实DOM中修改  
diff算法就是虚拟DOM的比对时用的，返回一个patch对象，这个对象的作用就是存储两个节点不同的地方，最后用patch里记录的信息进行更新真实DOM  
步骤：  
1.JS对象表示真实的DOM结构，要生成一个虚拟DOM，再用虚拟DOM构建一个真实DOM树，渲染到页面  
2.状态改变生成新的虚拟DOM，跟就得虚拟DOM进行比对，这个比对的过程就是DIFF算法，利用patch记录差异  
3.把记录的差异用在第一个虚拟DOM生成的真实DOM上，视图就更新了。  
## 21.vue和jquery的区别是什么？
1.原理不同  
vue就是数据绑定；jq是先获取dom再处理  
2.着重点不同  
vue是数据驱动，jq是着重于页面  
3.操作不同  
4.未来发展不同  
## 22.vuex的响应式处理。
vuex是vue的状态管理工具  
vue中可以直接触发methods中的方法，vuex是不可以的。未来处理异步，当触发事件的时候，会通过dispatch来访问actions中的方法，actions中的commit会触发  mutations中的方法从而修改state里的值，通过getter把数据更新到视图  
Vue.use(vuex)，调用install方法，通过applyMixin(vue)在任意组件内执行this.$store就可以访问到store对象。  
vuex的state是响应式的，借助的就是vue的data，把state存到vue实例组件的data中  
## 23.vue中遍历全局的方法有哪些？
1.普通遍历，对象.forEach()  

~~~js
arr.forEach(function(item,index,arr){
    console.log(item,index)
})
~~~

2.对元素统一操作  对象.map()

~~~js
var newarr = arr.map(function(item){
    return item+1
})

~~~
3.查找符合条件的元素 对象.filter()  

~~~js
arr.filter(function(item){
    if(item > 2){
        return false
    }else{
        return true
    }
})  
~~~
4.查询符合条件的元素，返回索引 对象.findindex()  

~~~js
arr.finindex(function(item){
    if(item>1){
        return true
    }else{
        return false
    }
})
~~~

对象.evening()  遇到不符合的对象会停止  
对象.some()  找到符合条件的元素就停止  
## 24.如何搭建脚手架？
下载：node  cnpm  webpack vue-cli  
创建项目：  
1.找到对应的文件，然后利用node指令创建（cmd）  
2.vue init webpack xxxx  
3.回车项目描述  
4.作者回车  
5.选择vue build  
6.回车  
7.输入n  
8.不按照yarn  
9.输入npm run dev  
## 25.如何封装一个组件？
1.使用Vue.extend()创建一个组件  
2.使用Vue.components()方法注册组件  
3.如果子组件需要数据，可以在props中接收定义  
4.子组件修改好数据，要把数据传递给父组件，可以用emit()方法  
原则：  
把功能拆开  
尽量让组件原子化，一个组件做一件事情  
容器组件管数据，展示组件管视图  
## 26.封装一个可复用的组件，需要满足什么条件？
1.低耦合，组件之间的依赖越小越好  
2.最好从父级传入信息，不要在公共组件中请求数据  
3.传入的数据要进行校验  
4.处理事件的方法写在父组件中
## 27.vue的过滤器怎么使用？
vue的特性，用来对文本进行格式化处理
使用它的两个地方，一个是插值表达式，一个是v-bind
分类：
1.全局过滤器

~~~vue
Vue.filter('add',function(v){
    return v < 10 ? '0' + v : v
})
<div>{{33 | add}}</div>
~~~

2.本地过滤器
和methods同级  

~~~js
filter:{
    add:function(v){
        return v < 10 ? '0' + v : v
    }
}
~~~

## 28.vue中如何做强制刷新？  
1.localtion.reload()
2.this.$router.go(0)
3.provide和inject  

## 29.vue3和vue2有哪些区别？
1.双向数据绑定的原理不同  
2.是否支持碎片  
3.API不同  
4.定义数据变量方法不同  
5.生命周期的不同  
6.传值不同  
7.指令和插槽不同  
8.main.js不同  
## 30.vue的性能优化怎么做？
1.编码优化  
不要把所有数据都放在data中
v-for时给每个元素绑定事件用事件代理
keep-alive缓存组件
尽可能拆分组件，提高复用性、维护性
key值要保证唯一
合理使用路由懒加载，异步组件
数据持久化存储的使用尽量用防抖、节流优化  
2.加载优化  
按需加载
内容懒加载
图片懒加载  
3.用户体验    
骨架屏  
4.SEO优化  
预渲染
服务端渲染ssr  
5.打包优化  
CDN形式加载第三方模块
多线程打包
抽离公共文件
6.缓存和压缩  
客户端缓存、服务端缓存
服务端Gzip压缩
## 31.首屏优化该如何去做？
1.使用路由懒加载  
2.非首屏组件使用异步组件  
3.首屏不中要的组件延迟加载  
4.静态资源放在CDN上  
5.减少首屏上JS、CSS等资源文件的大小  
6.使用服务端渲染  
7.简历减少DOM的数量和层级  
8.使用精灵图请求  
9.做一些loading  
10.开启Gzip压缩  
11.图片懒加载  
## 32.vue3的性能为什么比vue2好？
1.diff算法的优化  
2.静态提升  
3.事件侦听缓存  
## 33.vue3为什么使用proxy？
1.proxy可以代理整个对象，defineproperty只代理对象上的某个属性  
2.proxy对代理对象的监听更加丰富  
3.proxy代理对象会生成新的对象，不会修改被代理对象本身  
4.proxy补兼容ie浏览器  
## 34.说一下你对组件的理解。
可以重复使用的vue实例，独一无二的组件名称  
可以抽离单独的公共模块  
提高代码的复用率  
## 35.你是如何规划项目文件的？

~~~js
public
图标、index.html、img
src
api
assets
components
按分类再次划分子目录
plugins
router
static
styles
utils
views
App.vue
main.js
package.json
vue.config.js
~~~

## 36.是否使用过nuxt.js？
是基于vue的应用框架，关注的是渲染，可以开发服务端渲染应用的配置  
SSR：服务端渲染  
好处：  
SSR生成的是有内容的HTML页面，有利于搜索引擎的搜索  
优化了首屏加载时间  
SEO：优化搜索引擎  
SPA的应用不利于搜索引擎SEO的操作  
## 37.SEO如何优化？
1.SSR  
2.预渲染 prerender-spa-plugin

## 38.echarts有用过吗？常用的组件有哪些？

title标题组件 show  text  link  
toolbox工具栏 导出图片 数据视图 切换 缩放 show orient feature  
tooltip tigger 触发类型  
markPoint标注点  
markLine图标的标线

