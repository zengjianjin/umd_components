# UMD组件库开发环境

这是一个基于Vue 3、TypeScript和Vite的UMD格式组件库开发环境。您可以使用此项目开发和构建可独立使用的UMD格式组件。

## 项目特点

- 支持Vue 3组件开发
- 每个组件可单独打包为UMD格式
- 提供可视化组件预览界面
- 支持TypeScript
- 使用Vite作为构建工具

## 项目结构

```
umd_components/
├── src/
│   ├── components/        # 组件源码目录
│   │   ├── HelloWorld.vue
│   │   └── Button.vue
│   ├── lib/              # 组件库导出入口
│   │   └── index.ts
│   ├── App.vue           # 组件预览页面
│   └── main.ts
├── scripts/
│   └── build.js          # UMD构建脚本
├── dist/                 # 构建输出目录
│   └── umd/              # UMD格式组件输出目录
└── package.json
```

## 开发指南

### 添加新组件

1. 在`src/components`目录下创建新的Vue组件文件
2. 在`src/lib/index.ts`中导出新组件
3. 在`src/App.vue`中导入并添加到组件列表

### 预览组件

运行开发服务器，在浏览器中预览和测试组件：

```bash
npm run dev
```

### 构建UMD组件

运行以下命令将所有组件构建为独立的UMD格式文件：

```bash
npm run build:umd
```

构建完成后，UMD文件将输出到`dist/umd`目录。

## 使用示例

### 在HTML中使用UMD组件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UMD组件示例</title>
</head>
<body>
  <div id="app">
    <my-button type="primary">点击我</my-button>
  </div>

  <!-- 引入Vue -->
  <script src="https://unpkg.com/vue@next"></script>
  <!-- 引入UMD组件 -->
  <script src="./dist/umd/Button.js"></script>

  <script>
    const { createApp } = Vue;

    createApp({
      components: {
        'my-button': Button
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## 技术栈

- Vue 3
- TypeScript
- Vite
- Node.js

## 许可证

MIT

