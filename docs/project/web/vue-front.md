# 搭建自己的前端框架

学习前端这么长时间，一直在用现在比较成熟的前端框架，例如,[若依框架](https://www.ruoyi.vip/), [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/)等，最近想跟同事自己写一个属于自己的前端框架。


## 技术选型 
前端采用Vue3 + typescript，后端只是会用，所以目前用springboot，不使用其他任何的中间件等。

## 项目搭建
### 前端
前端git仓库 [https://gitee.com/wanyux/jnpf-web](https://gitee.com/wanyux/jnpf-web)

前端优先创建一个项目，不展示创建项目过程，直接看搭建基础结果！！！

### 下面的项目的目录结构

![img](/vue-front/web.png)

在目录中有几个关键的文件  
1. layout 这个文件是用来方便以后换皮肤，或者说多种布局的
2. style文件是一些公共的css文件
3. permission文件是用来做权限的
4. settings文件是项目的基本配置
目前基本上就搭建个简单的项目，后续逐步的添加功能并完善.

### 后端
后端git仓库 [https://gitee.com/wanyux/jnpf-java](https://gitee.com/wanyux/jnpf-java) 

1. 在idea中先创建一个简单的springboot项目，在这里就不详细展示创建项目的过程了，写一个/hello接口
![img](/vue-front/hello.png)
2. 在浏览器中输入localhost:8080,可以看到浏览器有返回的信息.
![img](/vue-front/webHello.png)

最简单的后端搭建完成！！