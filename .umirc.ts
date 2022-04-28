import { defineConfig } from 'dumi';

export default defineConfig({
  title: "Alex's Playground",
  favicon: '/images/pig.jpg',
  logo: '/images/pig.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  menus: {
    '/code-learn': [
      {
        title: 'Python 阅读：requests',
        path: '/code-learn',
        children: [
          // 暂时让内容界面不可见
          // 'CodeLearn/01_init.zh-CN.md',
          // 'CodeLearn/02_sessions.zh-CN.md',
          // 'CodeLearn/03_utils.zh-CN.md',
          // 'CodeLearn/04_auth.zh-CN.md',
          // 'CodeLearn/05_cookie.zh-CN.md',
          // 'CodeLearn/06_model.zh-CN.md',
          // 'CodeLearn/07_adapters.zh-CN.md',
          // 'CodeLearn/05_cookie.zh-CN.md'
        ],
      },
    ],
    '/en-US/code-learn': [
      {
        title: 'Python Learn',
        path: '/code-learn',
        children: [
          // 菜单子项（可选）
          'CodeLearn/04_auth.zh-CN.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
        ],
      },
    ],
  },
  // more config: https://d.umijs.org/config
});
