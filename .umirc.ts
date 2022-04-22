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
  // more config: https://d.umijs.org/config
});
