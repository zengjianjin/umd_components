<template>
  <div class="app-container">
    <header class="header">
      <h1>{{ t.title }}</h1>
      <p>{{ t.description }}</p>
      <button class="lang-toggle" @click="toggleLanguage">{{
          currentLang === 'zh' ? 'EN' : '中文'
        }}
      </button>
    </header>

    <div class="content">
      <aside class="sidebar">
        <h2>{{ t.componentList }}</h2>
        <ul class="component-list">
          <li v-for="item in componentList" :key="item.name"
              :class="{ active: activeComponent === item.name }"
              @click="activeComponent = item.name">
            {{ item.name }}
          </li>
        </ul>
        <div class="build-info">
          <p>{{ t.buildInfo }}</p>
          <code>npm run build:umd</code>
          <p>{{ t.singleBuildInfo }}</p>
          <code>npm run build:umd:single {{ activeComponent }}</code>
        </div>
      </aside>
      <main class="preview">
        <div class="component-preview">
          <h2>{{ activeComponent }} {{ t.preview }}</h2>
          <div class="preview-area">
            <img alt="" src="./assets/header.png">
            <component :is="getComponent(activeComponent)" v-if="getComponent(activeComponent)"
                       ref="currentComponent" :data="componentData"/>
            <div v-else class="no-component">
              {{ t.noComponent }}
            </div>
          </div>
        </div>
      </main>
      <aside class="configuration">
        <div v-for="(item,index) in componentDescription">
          <template v-if="item.type==='array'">
            <div v-for="n in componentData[index].length" class="arrayBox">
              <div v-for="(subItem, subIndex) in item.data">
                <div>{{ subItem.label }}</div>
                <input v-model="componentData[index][n-1][subIndex]" :type="subItem.type"/>
              </div>
            </div>
          </template>
          <template v-if="item.type!=='array'">
            <div v-for="(subItem,subIndex) in item">
              <div>{{ subItem.label }}</div>
              <template v-if="formCheck.includes(subItem.type)">
                <label v-for="data in subItem.data"
                       @click="componentData[index] = data.value">
                  <input :name="`${index}-${subIndex}`"
                         :type="subItem.type"
                         :value="data.value">
                  {{ data.label }}
                </label>
              </template>
              <template v-if="formInput.includes(subItem.type)">
                <input v-model="componentData[index][subIndex]" :type="subItem.type">
              </template>
            </div>
          </template>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup>
import { computed, markRaw, reactive, ref, watch } from 'vue'
import translations from './config/translations.js'
import { formCheck, formInput } from './config/configuration.js'
// 自动导入components文件夹下所有组件
const components = import.meta.glob('./components/*.vue')

// 组件映射对象
const componentMap = reactive({})

// 当前选中的组件
const activeComponent = ref('')

// 组件列表
const componentList = reactive([])

// 当前语言
const currentLang = ref('en')

// 切换语言
const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
}

const currentComponent = ref(null)
const componentData = ref({})
const componentDescription = ref({})
// 获取当前语言的翻译
const t = computed(() => {
  return translations[currentLang.value]
})

// 动态加载组件
const loadComponents = async () => {
  for (const path in components) {
    const componentName = path.match(/\.\/components\/(.*)\.vue$/)[1]
    const module = await components[path]()
    componentMap[componentName] = markRaw(module.default)

    // 添加到组件列表
    componentList.push({
      name: componentName,
      component: componentName,
    })
  }
}

// 初始化加载组件
loadComponents()

// 获取组件
const getComponent = (name) => {
  return componentMap[name] || null
}

watch(() => currentComponent.value, (newVal) => {
  if (!newVal) return
  console.log(newVal.argument)
  componentData.value = newVal.argument
  componentDescription.value = newVal.description
})
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1015px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.header {
  position: relative;
  text-align: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.header h1 {
  margin: 0;
  color: #42b983;
}

.header p {
  color: #999;
}

.lang-toggle {
  position: absolute;
  bottom: 20px;
  right: 0px;
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.lang-toggle:hover {
  background-color: #3aa876;
}

.content {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
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
  width: 375px;
  height: 667px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.component-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.component-preview h2 {
  margin-top: 0;
  font-size: 18px;
  color: #2c3e50;
}

.preview-area {
  margin-top: 17px;
  border: 1px solid #ddd;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-area > img {
  width: 100%;
  display: block;
  border-bottom: 1px solid #ddd;
}

.configuration {
  width: 300px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
}

.no-component {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #999;
}

.arrayBox {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
