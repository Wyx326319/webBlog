# VitePress部署博客
[VitePress官方地址](https://vitepress.dev/zh/reference/site-config)
 github,gitee都可以部署静态页面，这里使用gitee做介绍  
 markdown语法介绍 [https://www.runoob.com/](https://www.runoob.com/)

## 踩坑1：项目部署完成后会出现页面或logo图标等404的问题或者样式丢失的问题
### 效果图
![img](/images/vitePress.png)

![img](/images/1.png)

### 原因
全部为绝对路径，部署后giteePage会有一层仓库的路径，文件找不到导致的。

![img](/images/7.png)

### 解决办法

第一步 打开.vitepress文件下的config.mts/config.js

![img](/images/2.png)

第二步 在defineConfig中添加base: "/gitee 仓库名/"(注意要和giteePage服务的名字相同)

giteePage服务仓库地址

![img](/images/5.png)

填写的base地址

![img](/images/4.png)

修改完成后重新进行打包，部署就好啦！


## 如何将github上部署的博客绑定自己的域名

### 第一步在[阿里云官网](https://www.aliyun.com/)购买自己的域名
1.打开域名列表点击解析  
![img](/images/vitepress/aliyun.png)
2.点击添加记录
![img](/images/vitepress/aliyun1.png)
3.记录类型选择CNAME，主机记录填入www,记录值写自己github博客地址的域名,然后点击确定
![img](/images/vitepress/aliyun2.png)
4.进入自己的github仓库，项目的根目录下创建一个CNAME文件，在CNAME文件中填入自己购买的域名。
5.在github的settings下,点击page,在该页面的下方Custom domain中填入自己购买的域名，然后点击Save.
![img](/images/vitepress/aliyun3.png)
6.当该页面上方博客地址变化为自己的域名就绑定成功啦 !
![img](/images/vitepress/aliyun4.png)

