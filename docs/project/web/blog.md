# VitePress部署博客
 github,gitee都可以部署静态页面，这里使用gitee做介绍  

## 踩坑1：项目部署完成后会出现页面或logo图标等404的问题或者样式丢失的问题
### 效果图
![img](/public/images/vitePress.png)

![img](/public/images/1.png)

### 原因
全部为绝对路径，部署后giteePage会有一层仓库的路径，文件找不到导致的。

![img](/public/images/7.png)

### 解决办法

第一步 打开.vitepress文件下的config.mts/config.js

![img](/public/images/2.png)

第二步 在defineConfig中添加base: "/gitee 仓库名/"(注意要和giteePage服务的名字相同)

giteePage服务仓库地址

![img](/public/images/5.png)

填写的base地址

![img](/public/images/4.png)

修改完成后重新进行打包，部署就好啦！

