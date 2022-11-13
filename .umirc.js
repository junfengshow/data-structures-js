import { defineConfig } from 'umi'
export default defineConfig({
  outputPath: 'dist',
  chainWebpack (memo, { env, webpack, createCSSRule}) {
    // memo.module.rule('less').exclude.add(/@fdt\/cmp-react/);
    // memo.module.rule('lessInUi')
    // .test(/\.less$/)
    // .include.add(/@fdt\/cmp-react/)
    // .end()
    // .use('style-loader')
    // .loader('style-loader')
    // .end()
    // .use('css-loader')
    // .loader('css-loader')
    // .options({ modules: true })
    // .end()
    // .use('less-loader')
    // .loader('less-loader')
    // .options({})
    // .end();
  },
  devServer: {
    port: 8080
  },
  proxy: {
    '/api': {
      'target': 'http://localhost:7001',
      'changeOrigin': false,
      // 'pathRewrite': { '^/api' : '' },
    }
  }
});
