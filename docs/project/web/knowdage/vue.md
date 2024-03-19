# Vue全家桶

## Vue3简介
- 2020年9月18日，Vue.js发布版3.0版本
- 经历了：4800+次提交、40+个RFC、600+次PR、300+贡献者
- 官方发版地址：Release v3.0.0 One Piece · vuejs/core
- 截止2023年10月，最新的公开版本为：3.3.4

### 1.1. 【性能的提升】

- 打包大小减少41%。
- 初次渲染快55%, 更新渲染快133%。
- 内存减少54%。


### 1.2.【 源码的升级】

- 使用Proxy代替defineProperty实现响应式。
- 重写虚拟DOM的实现和Tree-Shaking。


### 1.3. 【拥抱TypeScript】

- Vue3可以更好的支持TypeScript。

### 1.4. 【新的特性】

1. Composition API（组合API）：
    - setup
    - ref与reactive
    - computed与watch
      ......
2. 新的内置组件：
    - Fragment
    - Teleport
    - Suspense
      ......
3. 其他改变：
    - 新的生命周期钩子
    - data 选项应始终被声明为一个函数
    - 移除keyCode支持作为v-on 的修饰符
      ......
      
## 创建Vue工程
### 【基于 vue-cli 创建】
点击查看[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
备注: 目前Vue-cli已处于维护模式，官方推荐基于Vite创建项目
```powershell
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version

## 安装或者升级你的@vue/cli 
npm install -g @vue/cli

## 执行创建命令
vue create vue_test

##  随后选择3.x
##  Choose a version of Vue.js that you want to start the project with (Use arrow keys)
##  > 3.x
##    2.x

## 启动
cd vue_test
npm run serve
```
### 【基于 vite 创建】(推荐)
vite 是新一代前端构建工具，[官网地址](https://vitejs.cn)，vite的优势如下：

- 轻量快速的热重载（HMR），能实现极速的服务启动。
- 对 TypeScript、JSX、CSS 等支持开箱即用。
- 真正的按需编译，不再等待整个应用编译完成。
- webpack构建 与 vite构建对比图如下：
  ![img](/images/vscode/ts.png)
  ![img](/images/vscode/volar.png)
- 具体操作如下[点击查看官方文档](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)
```powershell
## 1.创建命令
npm create vue@latest

## 2.具体配置
## 配置项目名称
√ Project name: vue3_test
## 是否添加TypeScript支持
√ Add TypeScript?  Yes
## 是否添加JSX支持
√ Add JSX Support?  No
## 是否添加路由环境
√ Add Vue Router for Single Page Application development?  No
## 是否添加pinia环境
√ Add Pinia for state management?  No
## 是否添加单元测试
√ Add Vitest for Unit Testing?  No
## 是否添加端到端测试方案
√ Add an End-to-End Testing Solution? » No
## 是否添加ESLint语法检查
√ Add ESLint for code quality?  Yes
## 是否添加Prettiert代码格式化
√ Add Prettier for code formatting?  No
```

- Vite 项目中，`index.html` 是项目的入口文件，在项目最外层。
- 加载`index.html`后，Vite 解析 `<script type="module" src="xxx"></script>` 指向的JavaScript。
- Vue3中是通过 createApp 函数创建一个应用实例。

## 【OptionsAPI 与 CompositionAPI】
- Vue2的API设计是Options（配置）风格的。
- Vue3的API设计是Composition（组合）风格的。
 ###  Options API 的弊端
Options类型的 API，数据、方法、计算属性等，是分散在：data、methods、computed中的，
若想新增或者修改一个需求，就需要分别修改：data、methods、computed，不便于维护和复用。  
<img src="/images/vue3/1696662197101-55d2b251-f6e5-47f4-b3f1-d8531bbf9279.gif" alt="4.gif" style="display:inline-block;height:300px;border-radius:10px"  />
<img src="/images/vue3/1696662200734-1bad8249-d7a2-423e-a3c3-ab4c110628be.gif" alt="2.gif" style="display:inline-block;zoom:70%;border-radius:20px" />
### Composition API 的优势
可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。
<img src="/images/vue3/1696662249851-db6403a1-acb5-481a-88e0-e1e34d2ef53a.gif" alt="4.gif" style="display:inline-block;zoom:70%;height:300px;border-radius:10px"  />
<img src="/images/vue3/1696662256560-7239b9f9-a770-43c1-9386-6cc12ef1e9c0.gif" alt="4.gif" style="display:inline-block;zoom:70%;height:300px;border-radius:10px"  />  
说明：以上四张动图原创作者：大帅老猿

## setup
setup是Vue3中一个新的配置项，值是一个函数，它是 Composition API “表演的舞台”，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在setup中。

特点如下：

- setup函数返回的对象中的内容，可直接在模板中使用。
- setup中访问this是undefined。
- setup函数会在beforeCreate之前调用，它是“领先”所有钩子执行的。
### setup 的返回值
- 若返回一个对象：则对象中的：属性、方法等，在模板中均可以直接使用（重点关注）。
- 若返回一个函数：则可以自定义渲染内容，代码如下：
```js
setup(){
  return ()=> '你好啊！'
}
```
### setup 与 Options API 的关系
Vue2 的配置（data、methos......）中可以访问到 setup中的属性、方法。

但在setup中不能访问到Vue2的配置（data、methos......）。

如果与Vue2冲突，则setup优先。

### setup 语法糖
