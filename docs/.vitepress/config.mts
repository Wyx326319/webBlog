import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],
  lastUpdated: true,
  base: '',
  title: "王玉祥",
  description: "菜鸟程序员的修炼",

  themeConfig: {
    outlineTitle: "文章目录",
    outline:[2,3],
    // https://vitepress.dev/reference/default-theme-config
    logo: "/images/logo.png",
    sidebar: [
         { text: "前端",items: [
           { text: "css",link:"/project/web/css" },
           { text: "qiankun微前端",link:"/project/web/qiankun" },
           { text: "web前端大师课",link:"/project/web/session" },
           { text: "鸿蒙开发",link:"/project/harmonyOS/index" },
           { text: "开发场景应用",link:"/project/web/scene" },
          { text: "搭建自己的前端框架",link:"/project/web/vue-front.md" },
          { text: "若依皮肤改造",link:"/project/web/ruoyi" },
          { text: "VitePress打造个人博客",link:"/project/web/blog" },
          { text: "从零搭建Vue-cli",link:"/project/web/VueCli" },
          { text: "百度图片拖拽",link:"/project/web/百度图片拖拽" },
          { text: "Vue大屏可视化适配方案",link:"/project/web/fullscreen" },
          { text: "前端常见难点",link:"/project/web/difficulty" }
        ]}
       ],
    nav: [
      { text: '首页', link: '/' },
      { text: "前端",link:"/project/web/ruoyi" },
      { text: '工具', link:"/project/web/tools"},
      { text: '算法',items:[
        { text: "数据结构与算法学习",link: "/algorithm/index" },
        { text: "javascript",link: "/algorithm/Javascript/index" }
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
