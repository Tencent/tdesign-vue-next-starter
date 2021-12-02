
<p style="display:flex; justify-content: center">

[![](https://tdesign.gtimg.com/starter/brand-logo.svg)](http://tdesgin.tencent.com/starter/vue/#/dashboard/base)

</p>
<p align="center">
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatility"></a>
</p>

# TDesign Starter

## 项目简介

TDesign Starter 基于 TDesign UI 组件，旨在提供项目开箱即用的、配置式的并且拥有开发体验和设计感的中后台的项目。

- 设计美观
  - 基于 TDesign UI 设计规范
  - 提供 Figma、 Sketch、 Adobe XD、 Axure等多种类型的设计资源
  - 在开源体系上打造具有自身品牌特色且好用的产品
<br/>
- 完备路由
  - 同时支持配置式路由和自定义路由
  - 对于配置型路由，提供导航类组件的深度定制（“菜单 Menu”、“面包屑 Breadcrumb”），无需手动处理路由映射关系。
<br/>
- 动态布局:
  - 内置“左右布局”、“上左右布局”、“上下布局”等中后台常用布局，
  - 页面内容基于 24 栅格布局设计，内置“常规型”和“紧凑型”两种间距模式
<br/>
- 极速HRM:
  - 采用 `Vite` 构建
  - 开发环境下体验浏览器 esmodule bundless, 达到极速更新，无需等待漫长的 bundle 过程
<br/>
- 开发规范:
  - 统一规范会减少沟通成本，提高开发和维护的体验；
  - 提交规范采用 `Angular commit 规范`
  - 同时推荐采用 `vscode` 开发
<br/>

## 项目脚本

```
// 安装依赖
npm install

// 启动项目
npm run start

// 项目构建 - 体验环境
npm run build:test

// 项目构建
npm run build

// 项目预览
npm run preview

// 项目lint
npm run lint

// 修复lint
npm run lint:fix

```

<br/>

## 路由和菜单

菜单（侧边栏和面包屑）由路由配置自动生成，根据路由变化可自动匹配，开发者无需手动处理这些逻辑。
可在<a href="./src/config/routes.js">src/config/routes.js</a>文件中修改。

菜单和路由的映射如下：

```
    {
        path: '/dashboard',
        icon: 'chart-pie',
        title: '仪表板',
        component: '../layouts/default.vue',
        children: [
            {
                title: '概览仪表盘',
                path: 'base',
                component: '../pages/demo.vue',
                children: [            {
                    title: '概览仪表盘',
                    path: 'base',
                    component: '../pages/demo.vue',
                }]
            }
        ]
    }

```

路由使用 `vue-router`

<br/>

## 布局

网站布局支持“空布局”， “侧边栏导航布局”， “侧边栏布局加头部导航”，“头部导航”四种；布局文件地址在<a href="./src/layouts">src/layouts</a>

更多定制化布局，推荐使用 TDesign UI layout

- ```<t-layout>```
- ```<t-header>```
- ```<t-footer>```
- ```<t-aside>```
- ```<t-content>```

<br/>

## 提交规范

整齐美观的提交规范，沟通维护更加省力 [Angular Git Commit Guidelines](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)

<br/>

## 兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- | --------- |
| Edge >=16 | Firefox >=60| Chrome >=61| Safari >=11

<br/>
