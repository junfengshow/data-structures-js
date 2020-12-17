import { defineConfig } from 'umi'
export default defineConfig({
  // 站点模式
  mode: 'site',
  // mode: 'doc',
  // ssr: {
  //   forceInitial: false,
  //   // disableExternal: true
  // },
  outputPath: 'data-structures',
  // plugins: [['@umijs/preset-react', {
  //   locale: {
  //     default: 'zh-CN',
  //     antd: false,
  //     title: false,
  //     baseNavigator: true,
  //     baseSeparator: '-',
  //   },
  // }]],
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router-dom': 'ReactRouterDOM',
    // 'antd': 'antd'
  },

  title: '数据结构初探',
  logo: '//www.junfengshow.com/static/assets/logo.png',
  favicon: '//www.junfengshow.com/static/favicon.png',

  resolve: {
    includes: ['./docs'],
    previewLangs: [],
  },

  base: '/',
  navs: [],
  menus: {
    '/': []
  },

  // 默认是中文，index.md index.en-US.md必须要存在的
  locales: [['zh-CN', '中文'], ['en-US', 'English'], ['en', 'English']],
  // locales: [['zh-CN', '中文'],],
  // locale: {
  //   default: 'zh-CN',
  //   antd: false,
  //   title: false,
  //   baseNavigator: true,
  //   baseSeparator: '-',
  // },
  
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 设置 alias
    memo.entry('umi').add('./docs/app.ts')
  }
})
