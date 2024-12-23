# qiankun微前端
qiankun是一种微前端框架，可以将多个前端应用集成为一个整体。每个子应用可以使用不用的框架和技术栈，它们之前可以独立开发和部署，qiankun提供了一套完整的生命周期函数和通信机制
可以让不同的子应用之间进行跨框架和跨域的通信和交互  
具体查看官网: [跳转地址](https://qiankun.umijs.org/zh/guide)

## 微前端架构的核心价值

1. 技术栈无关  
主框架不限制接入应用的技术栈，微应用具备完全自主权  
2. 独立开发、独立部署  
微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新  
3. 增量升级  
在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略  
4. 独立运行时  
每个微应用之间状态隔离，运行时状态不共享

微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用(Frontend Monolith)后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。

## 搭建一个简单的微前端demo(Vue3 + Vite)

gitee地址: [https://gitee.com/wanyux/qiankun-vue.git](https://gitee.com/wanyux/qiankun-vue.git)

### 第一步 首先我们先创建一个主应用

创建vue项目的过程在这里就不赘述了，我们主要是搭建qiankun的相关配置!  

### 第二步 安装qiankun,vue-router
在控制台上执行```npm install qiankun vue-router```

### 第三步 注册子应用
在main.js文件中注册  
```js
import { createApp } from 'vue'
import './style.css' // 全局css
import App from './App.vue'
import {registerMicroApps, start} from "qiankun"
import router from './router/index.js'
const app = createApp(App)

app.use(router)
app.mount('#app')
registerMicroApps(
    [
        {
            name: "qiankun-subApp", // 子应用的名称
            entry: '//localhost:5555', // 子应用的入口地址
            container: '#qiankun-subApp', // 挂载的DOM元素
            activeRule: '/subHomePage' // 激活子应用的路由规则(子应用首次访问的路由地址)
        }
    ],
    {
        beforeMount(app){
            console.log("挂载前",app)
        },
        afterMount(app){
            console.log("挂载后",app);
        }
    }
)

start({
    prefetch: false, //取消预加载
    sandbox: { experimentalStyleIsolation: true }, //沙盒模式
})

```

在vite-config.js中允许跨域访问应用页面
```js
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    port: 5111,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许跨域访问子应用页面
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url))
    }
  }

})

```

注册路由 

```js
import { createWebHistory, createRouter } from 'vue-router'

const contantRoutes = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about.vue'),
    }
  ]


  const router = createRouter({
    routes: [...contantRoutes],
    history: createWebHistory()
  })

  export default router


```
美化页面
```vue
<template>
  <div class="MainAppVue">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
      <el-menu-item index="/">主应用Home</el-menu-item>
      <el-menu-item index="/about">主应用About</el-menu-item>
      <el-menu-item index="/subHomePage">子应用</el-menu-item>
      <el-menu-item index="/subHomePage/about">子应用About</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
  <!-- 子应用绑定容器 -->
  <div id="qiankun-subApp"></div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const activeIndex = ref('/')
const handleSelect = (key) => {
  router.push({ path: key })
}
</script>
<style>
body {
  margin: 0px;
}

#qiankun-subApp{
  height: 400px;
}
</style>

```

#### 主应用就搭建好了！！


### 第四步 搭建子应用
子应用的步骤跟主应用的步骤基本一致，只有几点不同

1. 在路由配置中需要添加配置防止跳向主路由
```js
import { createWebHistory, createRouter } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? `/subHomePage` : '/'),   //这里需要配置/subHomePage,不然会点击跳转home到主应用的home
    routes,
})

export default router
```

2. vite.config.js中需要使用vite-plugin-qiankun插件
```js
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import qiankun from 'vite-plugin-qiankun'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('qiankun-subApp', {
      useDevMode: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    port: 5555
  }
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url))
    }
  }

})

```

3. main.js中需要判断是否独立运行，代码如下: 
``` js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {registerMicroApps, start} from "qiankun"
import router from './router/index.js'
const app = createApp(App)

app.use(router)
app.mount('#app')
registerMicroApps(
    [
        {
            name: "qiankun-subApp", // 子应用的名称
            entry: '//localhost:5555', // 子应用的入口地址
            container: '#qiankun-subApp', // 挂载的DOM元素
            activeRule: '/subHomePage' // 激活子应用的路由规则(子应用首次访问的路由地址)
        }
    ],
    {
        beforeMount(app){
            console.log("挂载前",app)
        },
        afterMount(app){
            console.log("挂载后",app);
        }
    }
)

start({
    prefetch: false, //取消预加载
    sandbox: { experimentalStyleIsolation: true }, //沙盒模式
})

```

![img](/images/qiankun/qiankunyingyong.png)

#### qiankun Demo就搭建好啦!!!! 


