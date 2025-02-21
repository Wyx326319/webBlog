import{_ as a,c as t,a2 as r,o as i}from"./chunks/framework.Dz7_3PEu.js";const o="/vue-front/web.png",l="/vue-front/hello.png",n="/vue-front/webHello.png",_=JSON.parse('{"title":"搭建自己的前端框架","description":"","frontmatter":{},"headers":[],"relativePath":"web/搭建自己的前端框架.md","filePath":"web/搭建自己的前端框架.md","lastUpdated":1734596260000}'),s={name:"web/搭建自己的前端框架.md"};function p(h,e,c,d,m,u){return i(),t("div",null,e[0]||(e[0]=[r('<h1 id="搭建自己的前端框架" tabindex="-1">搭建自己的前端框架 <a class="header-anchor" href="#搭建自己的前端框架" aria-label="Permalink to &quot;搭建自己的前端框架&quot;">​</a></h1><p>学习前端这么长时间，一直在用现在比较成熟的前端框架，例如,<a href="https://www.ruoyi.vip/" target="_blank" rel="noreferrer">若依框架</a>, <a href="https://panjiachen.github.io/vue-element-admin-site/zh/" target="_blank" rel="noreferrer">vue-element-admin</a>等，最近想跟同事自己写一个属于自己的前端框架。</p><h2 id="技术选型" tabindex="-1">技术选型 <a class="header-anchor" href="#技术选型" aria-label="Permalink to &quot;技术选型&quot;">​</a></h2><p>前端采用Vue3 + typescript，后端只是会用，所以目前用springboot，不使用其他任何的中间件等。</p><h2 id="项目搭建" tabindex="-1">项目搭建 <a class="header-anchor" href="#项目搭建" aria-label="Permalink to &quot;项目搭建&quot;">​</a></h2><h3 id="前端" tabindex="-1">前端 <a class="header-anchor" href="#前端" aria-label="Permalink to &quot;前端&quot;">​</a></h3><p>前端git仓库 <a href="https://gitee.com/wanyux/jnpf-web" target="_blank" rel="noreferrer">https://gitee.com/wanyux/jnpf-web</a></p><p>前端优先创建一个项目，不展示创建项目过程，直接看搭建基础结果！！！</p><h3 id="下面的项目的目录结构" tabindex="-1">下面的项目的目录结构 <a class="header-anchor" href="#下面的项目的目录结构" aria-label="Permalink to &quot;下面的项目的目录结构&quot;">​</a></h3><p><img src="'+o+'" alt="img"></p><p>在目录中有几个关键的文件</p><ol><li>layout 这个文件是用来方便以后换皮肤，或者说多种布局的</li><li>style文件是一些公共的css文件</li><li>permission文件是用来做权限的</li><li>settings文件是项目的基本配置 目前基本上就搭建个简单的项目，后续逐步的添加功能并完善.</li></ol><h3 id="后端" tabindex="-1">后端 <a class="header-anchor" href="#后端" aria-label="Permalink to &quot;后端&quot;">​</a></h3><p>后端git仓库 <a href="https://gitee.com/wanyux/jnpf-java" target="_blank" rel="noreferrer">https://gitee.com/wanyux/jnpf-java</a></p><ol><li>在idea中先创建一个简单的springboot项目，在这里就不详细展示创建项目的过程了，写一个/hello接口 <img src="'+l+'" alt="img"></li><li>在浏览器中输入localhost:8080,可以看到浏览器有返回的信息. <img src="'+n+'" alt="img"></li></ol><p>最简单的后端搭建完成！！</p>',16)]))}const b=a(s,[["render",p]]);export{_ as __pageData,b as default};
