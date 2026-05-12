import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI素养',
  description: '大学生的第一本人工智能启蒙书',
  base: '/ai-competency-book/',
  head: [
    ['link', { rel: 'icon', href: '/images/book_logo_rb.png', type: 'image/png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@400;600;700;900&display=swap', rel: 'stylesheet' }],
  ],
  themeConfig: {
    logo: '/images/book_logo_rb.png',
    siteTitle: 'AI素养',
    nav: [
      { text: '首页', link: '/' },
      { text: '前言', link: '/preface' },
      {
        text: '目录',
        items: [
          { text: '第一部分 重新认识AI', link: '/part1/chapter1' },
          { text: '第二部分 学会提问', link: '/part2/chapter3' },
          { text: '第三部分 学会学习', link: '/part3/chapter6' },
          { text: '第四部分 学会判断', link: '/part4/chapter8' },
          { text: '第五部分 学会组织信息', link: '/part5/chapter10' },
          { text: '第六部分 学会使用工具', link: '/part6/chapter12' },
          { text: '第七部分 学会安全行动', link: '/part7/chapter14' },
        ]
      },
      { text: '后记', link: '/epilogue' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hyyhf/ai-competency-book' }
    ],
    sidebar: [
      {
        text: '开始阅读',
        items: [
          { text: '前言', link: '/preface' },
        ]
      },
      {
        text: '第一部分 重新认识AI',
        collapsed: false,
        items: [
          { text: '第1章 每个专业都需要新的基础素养', link: '/part1/chapter1' },
          { text: '第2章 AI不是搜索引擎，也不是万能老师', link: '/part1/chapter2' },
        ]
      },
      {
        text: '第二部分 学会提问',
        collapsed: false,
        items: [
          { text: '第3章 问题定义：比Prompt更重要的能力', link: '/part2/chapter3' },
          { text: '第4章 Context：会准备工作环境', link: '/part2/chapter4' },
          { text: '第5章 迭代式协作：不是许愿，而是校准', link: '/part2/chapter5' },
        ]
      },
      {
        text: '第三部分 学会学习',
        collapsed: false,
        items: [
          { text: '第6章 AI学习法：从答案依赖到深度理解', link: '/part3/chapter6' },
          { text: '第7章 AI作为思维伙伴', link: '/part3/chapter7' },
        ]
      },
      {
        text: '第四部分 学会判断',
        collapsed: false,
        items: [
          { text: '第8章 审美、品味与判断力', link: '/part4/chapter8' },
          { text: '第9章 AI输出七问法', link: '/part4/chapter9' },
        ]
      },
      {
        text: '第五部分 学会组织信息',
        collapsed: false,
        items: [
          { text: '第10章 文件、文本与数据', link: '/part5/chapter10' },
          { text: '第11章 结构化表达', link: '/part5/chapter11' },
        ]
      },
      {
        text: '第六部分 学会使用工具',
        collapsed: false,
        items: [
          { text: '第12章 从Chatbot到Agent', link: '/part6/chapter12' },
          { text: '第13章 AI如何长出手脚', link: '/part6/chapter13' },
        ]
      },
      {
        text: '第七部分 学会安全行动',
        collapsed: false,
        items: [
          { text: '第14章 不害怕技术环境', link: '/part7/chapter14' },
          { text: '第15章 责任、验证与人的主体性', link: '/part7/chapter15' },
        ]
      },
      {
        text: '尾声',
        items: [
          { text: '后记', link: '/epilogue' },
        ]
      },
    ],
    outline: {
      level: [2, 3],
      label: '本章目录'
    },
    docFooter: {
      prev: '上一章',
      next: '下一章'
    },
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除搜索',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    footer: {
      message: '从提问、学习、判断到智能协作',
      copyright: 'AI素养：大学生的第一本人工智能启蒙书'
    }
  }
})
