<script setup>
import { ref, reactive } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import CustomButton from './components/CustomButton.vue';
import CustomInput from './components/CustomInput.vue';

// 当前选中的组件
const activeComponent = ref('HelloWorld');

// 组件列表
const componentList = reactive([
  { name: 'HelloWorld', component: 'HelloWorld' },
  { name: 'Button', component: 'CustomButton' },
  { name: 'CustomInput', component: 'CustomInput' },
]);

// 动态导入组件
const getComponent = (name) => {
  switch (name) {
    case 'HelloWorld':
      return HelloWorld;
    case 'Button':
      return CustomButton;
    case 'CustomInput':
      return CustomInput;
    default:
      return null;
  }
};
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>UMD组件库开发环境</h1>
      <p>开发和预览您的组件，构建后将生成UMD格式的独立文件</p>
    </header>

    <div class="content">
      <aside class="sidebar">
        <h2>组件列表</h2>
        <ul class="component-list">
          <li v-for="item in componentList" :key="item.name" :class="{ active: activeComponent === item.name }"
            @click="activeComponent = item.name">
            {{ item.name }}
          </li>
        </ul>
        <div class="build-info">
          <p>运行以下命令构建UMD组件:</p>
          <code>npm run build:umd</code>
        </div>
      </aside>

      <main class="preview">
        <div class="component-preview">
          <h2>{{ activeComponent }} 组件预览</h2>
          <div class="preview-area">
            <component :is="getComponent(activeComponent)" v-if="getComponent(activeComponent)" />
            <div v-else class="no-component">
              请选择一个组件进行预览
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.header h1 {
  margin: 0;
  color: #2c3e50;
}

.content {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.sidebar h2 {
  margin-top: 0;
  font-size: 18px;
  color: #2c3e50;
}

.component-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.component-list li {
  padding: 10px 15px;
  margin-bottom: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.component-list li:hover {
  background-color: #e9ecef;
}

.component-list li.active {
  background-color: #42b983;
  color: white;
}

.build-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f1f3f4;
  border-radius: 4px;
  font-size: 14px;
}

.build-info code {
  display: block;
  margin-top: 8px;
  padding: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  font-family: monospace;
}

.preview {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.component-preview h2 {
  margin-top: 0;
  font-size: 18px;
  color: #2c3e50;
}

.preview-area {
  margin-top: 20px;
  padding: 20px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  min-height: 200px;
}

.no-component {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
}
</style>
