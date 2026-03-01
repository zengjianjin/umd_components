# UMD组件库开发环境

中文 | [English](./README.md)

这是一个基于Vue 3和Vite的UMD格式组件库开发环境。您可以使用此项目开发和构建可独立使用的UMD格式组件。

## 项目特点

- 支持Vue 3组件开发
- 每个组件可单独打包为UMD格式
- 提供可视化组件预览界面
- 自动导入components文件夹下的所有组件
- 使用Vite作为构建工具
- 基础像素宽度为375px

## 项目结构

```
umd_components/
├── src/
│   ├── components/        # 组件源码目录
│   │   ├── CustomButton.vue   # 自定义按钮组件
│   │   ├── CustomInput.vue    # 自定义输入框组件
│   │   └── CustomHead.vue     # 自定义头部组件
│   ├── App.vue           # 组件预览页面
│   └── main.js
├── scripts/
│   └── build.js          # UMD构建脚本
├── dist/                 # 构建输出目录
│   ├── CustomButton.umd.js   # 按钮组件UMD文件
│   ├── CustomInput.umd.js    # 输入框组件UMD文件
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
npm run dev
```

### 构建UMD组件

运行以下命令将所有组件构建为独立的UMD格式文件：

```bash
npm run build:umd
```

构建完成后，UMD文件将输出到`dist`目录，文件格式为`组件名.umd.js`。

## 使用示例

### 在HTML中使用UMD组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UMD组件示例</title>
</head>
<body>
  <div id="app">
    <custom-button type="primary" @click="handleClick">点击我</custom-button>
    <custom-input v-model="inputValue" placeholder="请输入内容"></custom-input>
    <p>输入的值: {{ inputValue }}</p>
  </div>

  <!-- 引入Vue -->
  <script src="./vue.js"></script>
  <!-- 引入UMD组件 -->
  <script src="./dist/CustomButton.umd.js"></script>
  <script src="./dist/CustomInput.umd.js"></script>

  <script>
    const { createApp, ref } = Vue;

    createApp({
      components: {
        'custom-button': CustomButton,
        'custom-input': CustomInput,
      },
      setup() {
        const inputValue = ref('');
        return {
          inputValue
        };
      },
      methods: {
        handleClick() {
          alert('按钮被点击了!');
        }
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## 技术栈

- Vue 3
- Vite
- Node.js

## 许可证

MIT

