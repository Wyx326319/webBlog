import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],
  vite: {
    plugins: [
        // add plugin
        AutoSidebar(),
    ],
  },
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  },
  lastUpdated: true,
  base: '',
  title: "王玉祥",
  description: "菜鸟程序员的修炼",

  themeConfig: {
    outlineTitle: "文章目录",
    outline:[1,3],
    // https://vitepress.dev/reference/default-theme-config
    logo: "/images/logo.png",
    nav: [
      { text: '首页', link: '/' },
      { text: "前端",link:"/web/css" },
      { text: '后端', link:"/server/搭建onlyoffice"},
      { text: '工具', link:"/tools/nvm"},
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
