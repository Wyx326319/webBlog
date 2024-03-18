import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vite-press/',
  title: "王玉祥",
  description: "A VitePress 111Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/images/logo.png",
    nav: [
      { text: '首页', link: '/' },
      { text: "前端",items: [
        { text: "若依皮肤改造",link:"/project/web/ruoyi" },
        { text: "VitePress打造个人博客",link:"/project/web/blog" },
        { text: "从零搭建Vue-cli",link:"/project/web/VueCli" },
        { text: "从零搭建React-cli",link:"/project/web/reactCli" },
        { text: "Webpack",link:"/project/web/webpack" }
      ] },
      { text: "后端",items: [
        { text: "java",link:"/project/service/java" },
        { text: "javaWeb",link:"/project/service/javaWeb" },
        { text: "springboot",link:"/project/service/springboot" },
        { text: "maven",link:"/project/service/maven" }
      ] },
      { text: '八股文', items:[
      {text:"前端知识框架",link:"/essay/web/knowledge"},
        {text:"Html,Css",link:"/essay/web/css"},
        {text:"Javascript",link:"/essay/web/javascript"},
        {text:"Ajax",link:"/essay/web/ajax"},
        {text:"Vue",link:"/essay/web/vue"},
        {text:"uni-app",link:"/essay/web/uni-app"},
        {text:"Webpack",link:"/essay/web/webpack"},
        {text:"Git",link:"/essay/web/Git"},
        {text:"前端面试题测试",link:"/essay/web/test"}
      ] },
      { text: '算法',items:[
        { text: "数据结构与算法学习",link: "/algorithm/index" },
        { text: "javascript",link: "/algorithm/Javascript/index" },
        { text: "java",link: "/algorithm/Java/index" },
      ] }
    ],

    sidebar: [
      {
        items: [
          { text: "前端",items: [
            { text: "若依皮肤改造",link:"/project/web/ruoyi" },
            { text: "VitePress打造个人博客",link:"/project/web/blog" },
            { text: "从零搭建Vue-cli",link:"/project/web/VueCli" },
            { text: "从零搭建React-cli",link:"/project/web/reactCli" },
            { text: "Webpack",link:"/project/web/webpack" },
          ] },
          { text: "后端",items: [
            { text: "java",link:"/project/service/java" },
            { text: "javaWeb",link:"/project/service/javaWeb" },
            { text: "springboot",link:"/project/service/springboot" },
            { text: "maven",link:"/project/service/maven" }
          ] },
          { text: '八股文', items:[
            {text:"前端知识框架",link:"/essay/web/knowledge"},
            {text:"Html,Css",link:"/essay/web/css"},
            {text:"Javascript",link:"/essay/web/javascript"},
            {text:"Ajax",link:"/essay/web/ajax"},
            {text:"Vue",link:"/essay/web/vue"},
            {text:"uni-app",link:"/essay/web/uni-app"},
            {text:"Webpack",link:"/essay/web/webpack"},
            {text:"Git",link:"/essay/web/Git"},
            {text:"前端面试题测试",link:"/essay/web/test"}
          ] },
          { text: '算法',items:[
            { text: "数据结构与算法学习",link: "/algorithm/index" },
            { text: "javascript",link: "/algorithm/Javascript/index" },
            { text: "java",link: "/algorithm/Java/index" },
          ] }
        ]
      }
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
    }
  }
})
