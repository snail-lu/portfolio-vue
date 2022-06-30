<h2 align="center">Vue Portfolio</h2>
<p align="center">
    <a href="https://portfolio-snail.vercel.app" target="_blank">线上地址</a>
    ·
    <a href="https://github.com/Snail-Lu/portfolio-vue" target="_blank">仓库地址</a>
    ·
    <a href="https://github.com/Snail-Lu/portfolio-vue/issues" target="_blank">建议意见</a>
</p>

## 简介

基于 `Vue2` 搭建的项目集，项目中多为平时开发遇到的需求或有趣的 demo。

## 基本使用

```bash
// 克隆代码
git clone https://github.com/Snail-Lu/portfolio-vue.git

// 安装依赖
cd portfolio-vue
npm install

// 本地运行
npm run serve

// 生产打包
npm run build

// 部署到 github pages
npm run deploy
```

## 待优化内容

-   <span style="color:green;">【已优化】</span>`Element-UI`按需引入
-   <span style="color:green;">【已优化】</span>首屏白屏增加加载动画效果
-   <span style="color:green;">【已优化】</span>过渡组件`transition`和`scrollBehavior`冲突，导致页面无法回退到指定位置

## 其他

1. 项目中使用的图标为[iconify](http://icon-sets.iconify.design/ep/)中`Element-Plus`图标集的按需引入，使用方法为`<i-ep-图标名称></i-ep-图标名称`。示例：

```html
<i-ep-bell-filled></i-ep-bell-filled>
```

## 参考文档

[codemirror](https://codemirror.net/5/doc/manual.html#usage)
[ICONS8 免费插图](https://icons8.com)
