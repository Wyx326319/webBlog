import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],
  lastUpdated: true,
  base: '',
  title: "王恒|技术分享",
  description: "菜鸟程序员的修炼",

  themeConfig: {
    outlineTitle: "文章目录",
    outline:[2,2],
    // https://vitepress.dev/reference/default-theme-config
    logo: "/images/logo.png",
    sidebar: [
         { text: "前端",items: [
           { text: "QT",link:"/project/web/QT" },
           { text: "鸿蒙开发",link:"/project/harmonyOS/index" },
           { text: "开发场景应用",link:"/project/web/scene" },
          { text: "若依皮肤改造",link:"/project/web/ruoyi" },
          { text: "VitePress打造个人博客",link:"/project/web/blog" },
          { text: "从零搭建Vue-cli",link:"/project/web/VueCli" },
          { text: "从零搭建React-cli",link:"/project/web/reactCli" },
          { text: "百度图片拖拽",link:"/project/web/百度图片拖拽" },
          { text: "Vue大屏可视化适配方案",link:"/project/web/fullscreen" },
          {
             text: "前端知识",
             collapsible: true,
             collapsed: true,
             items: [
                { text: "TypeScript",link:"/project/web/knowdage/ts" },
                { text: "Vue全家桶",link:"/project/web/knowdage/vue" },
                { text: "打包工具",items:[
                  {text: "Webpack",link:"/project/web/knowdage/webpack"},
                  {text: "gulp",link:"/project/web/knowdage/gulp"}
                ] },
                { text: "包管理器",link:"/project/web/knowdage/PackageManager" },
             ]
         }
        ]},
         { text: "后端",items: [
            {
             text: "后端知识",
             collapsible: true,
             collapsed: true,
             items: [
               {text: "java",link:"/project/service/java" },
               { text: "javaWeb",link:"/project/service/javaWeb" },
               { text: "springboot",link:"/project/service/springboot" },
               { text: "maven",link:"/project/service/maven" }
             ]
            }]
         },
         { text: "八股文",items: [
                     {
                      text: "面试题",
                      collapsible: true,
                      collapsed: true,
                      items: [
                        {text:"前端知识框架",link:"/essay/web/knowledge"},
                         {text:"Html,Css",link:"/essay/web/css"},
                         {text:"Javascript",link:"/essay/web/javascript"},
                         {text:"Ajax",link:"/essay/web/ajax"},
                         {text:"Vue",link:"/essay/web/vue"},
                         {text:"uni-app",link:"/essay/web/uni-app"},
                         {text:"Webpack",link:"/essay/web/webpack"},
                         {text:"Git",link:"/essay/web/Git"},
                         {text:"前端面试题测试",link:"/essay/web/test"},
                         { text: '算法',link: "/algorithm/index"}
                      ]
                     }]
                  },
       ],
    nav: [
      { text: '首页', link: '/' },
      { text: "前端",link:"/project/web/ruoyi" },
      { text: "后端",link:"/project/service/java" },
      { text: '工具', link:"/essay/web/tools"},
      { text: '算法',items:[
        { text: "数据结构与算法学习",link: "/algorithm/index" },
        { text: "javascript",link: "/algorithm/Javascript/index" },
        { text: "java",link: "/algorithm/Java/index" },
      ] }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    footer: {
          copyright: 'Copyright © 2023-至今 王玉祥'
    }
  }
})
