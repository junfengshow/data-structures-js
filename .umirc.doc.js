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

  title: '算法与数据结构',
  logo: '//www.junfengshow.com/static/assets/logo.png',
  favicon: '//www.junfengshow.com/static/favicon.png',

  resolve: {
    includes: ['./docs'],
    previewLangs: ['jsx', 'tsx'],
  },

  base: '/',
  navs: [
    { path: '/foundation', title: '数据结构简' },
    { path: '/tree-graph', title: '树和图' },
    { path: '/calculation', title: '算法' },
  ],
  // menus: {
  //   '/foundation': [
  //     {
  //       title: '数据结构',
  //       // path: '/foundation',
  //       children: [
  //         'foundation/index.md',
  //         'foundation/stack.md',
  //         {
  //           title: '链表',
  //           path: '/foundation/linked-list'
  //         },
  //       ]
  //     },
  //     {
  //       title: '集合',
  //       path: '/foundation/set'
  //     }
  //   ]
  // },

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
  },
  hash: true
})
