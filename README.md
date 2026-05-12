# XCMove - 发现好电影

一个支持 PC 端和手机端的电影观看平台，采用 React + TypeScript + Vite 构建。

## ✨ 特性

- 🎬 **精美 UI** - 暗色电影主题设计，毛玻璃效果，流畅动画
- 📱 **响应式** - 完美适配 PC、平板、手机
- 🎯 **智能搜索** - 实时搜索，支持片名、导演、演员、类型
- 📂 **分类浏览** - 动作、喜剧、科幻、爱情等 10+ 分类
- 🎭 **电影详情** - 完整的影片信息展示
- 🔄 **轮播推荐** - 首页精选电影自动轮播
- ⚡ **快速构建** - Vite 构建，秒级热更新

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Vite 6 | 构建工具 |
| React Router 6 | 路由管理 |
| Lucide React | 图标库 |

## 📁 项目结构

```
src/
├── components/       # 可复用组件
│   ├── Header.tsx        # 顶部导航栏
│   ├── MobileNav.tsx     # 移动端底部导航
│   ├── MovieCard.tsx     # 电影卡片
│   ├── HeroBanner.tsx    # 首页轮播横幅
│   └── MovieRow.tsx      # 横向电影列表
├── pages/            # 页面组件
│   ├── HomePage.tsx          # 首页
│   ├── MovieDetailPage.tsx   # 电影详情页
│   ├── SearchPage.tsx        # 搜索页
│   └── CategoryPage.tsx      # 分类页
├── data/             # 数据层
│   ├── movies.ts           # 电影数据
│   └── feedback.ts         # 开发反馈系统
├── styles/           # 样式
│   ├── global.css          # 全局样式 + CSS 变量
│   └── components.css      # 组件样式
├── App.tsx           # 应用入口
└── main.tsx          # 渲染入口
```

## 📋 开发反馈

本项目由 AI Dev Platform 自动开发框架生成。开发过程中收集的反馈记录在 `src/data/feedback.ts` 中，涵盖：

- 框架改进建议
- LLM 代码生成质量
- Agent 间通信优化
- 工具集成问题
- 性能优化方向

这些反馈将用于迭代改进 AI Dev Platform 框架本身。

## 📄 许可证

MIT
