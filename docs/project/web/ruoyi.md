# 若依多皮肤改造

## 目标
选用若依前后端分离,多皮肤改造。  
项目示例: [https://gitee.com/wanyux/ruoyi.git](https://gitee.com/wanyux/ruoyi.git)  
线上地址: [http://59.110.225.57:8000](http://59.110.225.57:8000)  
## 改造过程
1.拉取项目 https://github.com/yangzongzhuan/RuoYi-Vue3  
2.修改vite.config.js配置文件: target: 'http://vue.ruoyi.vip/prod-api'  
3.layout下新建classic文件夹,将之前 layout下所有文件移到此皮肤下  
4.main.js 导入 Classic模块

~~~js
    import Classic from '@/layout/classic/index'
    ......
    app.component('Classic', Classic)
~~~

5.layout 文件夹下新建索引 index.vue

~~~vue

<template>
  <component :is="layoutType"></component>
</template>

<script setup>
import useSettingsStore from "../store/modules/settings";
import {computed} from "docs/project/web/knowdage/vue";

const settingsStore = useSettingsStore()
const layoutType = computed(() => settingsStore.layoutType)
</script>
~~~

6.提到的 layoutType 为全局变量

layoutType 变量设置如下: 根目录 setting.js

~~~js
    layoutType: 'classic',

~~~

store/modules/setting.js设置如下:  

7.permission.js有个导入报错,修改如下:  

~~~ js
 import InnerLink from '@/layout/classic/components/InnerLink'  
~~~

8.至此导入完成  
9.在layout下新建 functional 文件夹,开始开发 functional 新皮肤!  
good luck !
