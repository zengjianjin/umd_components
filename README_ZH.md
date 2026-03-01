# UMD组件库开发环境

中文 | [English](./README.md)

这是一个基于Vue 3和Vite的UMD格式组件库开发环境。您可以使用此项目开发和构建可独立使用的UMD格式组件。可用于拖拽生成页面的组件库。

## 项目特点

- 使用Vue 3组件开发
- 每个组件可单独打包为UMD格式
- 提供可视化组件预览界面
- 自动导入components文件夹下的所有组件
- 使用Vite作为构建工具
- 基础像素宽度为375px

## 技术栈

- Vue 3
- Vite
- Node.js

## 项目结构

```
umd_components/
├── src/
│   ├── components/        # 组件源码目录
│   │   └── CustomHead.vue     # 自定义头部组件
│   ├── App.vue           # 组件预览页面
│   └── main.js
├── scripts/
│   └── build.js          # UMD构建脚本
├── dist/                 # 构建输出目录
│   └── CustomHead.umd.js     # 头部组件UMD文件
├── test.html             # UMD组件测试页面
├── vue.js                # Vue运行时文件
└── package.json
```

## 开发指南

### 添加新组件

1. 在`src/components`目录下创建新的Vue组件文件
2. 组件会自动被App.vue导入，无需手动配置

### 预览组件

运行开发服务器，在浏览器中预览和测试组件：

```bash
pnpm run dev
```

### 构建UMD组件

运行以下命令将所有组件构建为独立的UMD格式文件：

```bash
pnpm run build:umd
pnpm run build:umd:single 组件名 # 单独构建指定组件
```

构建完成后，UMD文件将输出到`dist`目录，文件格式为`组件名.umd.js`。

## 使用示例

### 在HTML中使用UMD组件

参考previre.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>UMD Component Test</title>
  <style>
    html, body {
      width: 100%;
      height: 100%;
      font-family: Arial, sans-serif;
      margin: 0;
    }

    h1 {
      color: #333;
    }

    h2 {
      margin-top: 30px;
      margin-bottom: 15px;
      color: #444;
    }

    .btn {
      margin: 5px;
    }

    .debug-info {
      background-color: #f5f5f5;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      font-family: monospace;
    }
  </style>
</head>

<body>
<div id="app">
  <custom-head></custom-head>
  <custom-list></custom-list>
</div>

<script src="./vue.js"></script>
<script src="./dist/CustomList.umd.js"></script>
<script src="./dist/CustomHead.umd.js"></script>
<script>
  const { createApp } = Vue
  createApp({
    components: {
      'custom-list': CustomList,
      'custom-head': CustomHead,
    },
  }).mount('#app')
</script>
</body>

</html>

```

## 注意事项

目前还在优化阶段,部分设置还存在不兼容的情况,如使用单标签时会产生问题等,请勿用于生产环境。

## 许可证

MIT

