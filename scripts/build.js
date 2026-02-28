
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

// 获取当前文件目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// 组件目录
const componentsDir = resolve(__dirname, '../src/components')
// 输出目录
const outputDir = resolve(__dirname, '../dist')

// 确保输出目录存在
fs.ensureDirSync(outputDir)

// 获取所有组件文件
function getComponents(dir) {
  const components = []
  const files = readdirSync(dir)

  files.forEach(file => {
    const filePath = resolve(dir, file)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      // 如果是目录，递归查找
      components.push(...getComponents(filePath))
    } else if (file.endsWith('.vue')) {
      // 如果是Vue文件，添加到组件列表
      const componentName = file.replace('.vue', '')
      components.push({
        name: componentName,
        path: filePath
      })
    }
  })

  return components
}

// 构建单个组件为UMD格式
async function buildComponent(component) {
  console.log(`正在构建组件: ${component.name}`)

  await build({
    configFile: false,
    plugins: [vue()],
    build: {
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          },
          assetFileNames: (assetInfo) => {
            // 如果是CSS文件，使用组件名命名
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return `${component.name}.css`
            }
            // 其他静态资源放到assets文件夹
            return 'assets/[name].[hash][extname]'
          }
        }
      },
      lib: {
        entry: component.path,
        name: component.name,
        fileName: (format) => `${component.name}.umd.cjs`,
        formats: ['umd'],
        cssCodeSplit: false
      },
      outDir: outputDir,
      cssMinify: true
    }
  })
  
  // 将CSS文件内容注入到UMD文件中
  const cssFilePath = resolve(outputDir, `${component.name}.css`)
  const umdFilePath = resolve(outputDir, `${component.name}.umd.cjs`)
  
  if (fs.existsSync(umdFilePath)) {
    let cssContent = '';
    if (fs.existsSync(cssFilePath)) {
      cssContent = fs.readFileSync(cssFilePath, 'utf-8');
    }
    const umdContent = fs.readFileSync(umdFilePath, 'utf-8')
    
    // 在UMD文件开头注入CSS（如果有）
    const cssInjection = `
(function() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = \`${cssContent.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`;
  document.head.appendChild(style);
})();
`
    
    // 修改后的UMD内容
    let modifiedUmdContent = umdContent;
    if (cssContent) {
      modifiedUmdContent = cssInjection + umdContent;
    }
    
    // 写回UMD文件
    fs.writeFileSync(umdFilePath, modifiedUmdContent, 'utf-8')
    
    // 删除独立的CSS文件（如果存在）
    if (fs.existsSync(cssFilePath)) {
      fs.removeSync(cssFilePath);
    }
  }

  console.log(`组件 ${component.name} 构建完成`)
}

// 主函数
async function buildAll() {
  const components = getComponents(componentsDir)

  if (components.length === 0) {
    console.log('没有找到组件文件')
    return
  }

  console.log(`找到 ${components.length} 个组件`)

  // 并行构建所有组件
  await Promise.all(components.map(component => buildComponent(component)))
  
  // 移动静态资源到assets文件夹
  const assetsDir = resolve(outputDir, 'assets')
  fs.ensureDirSync(assetsDir)
  
  // 移动所有非UMD文件到assets文件夹
  const files = fs.readdirSync(outputDir)
  files.forEach(file => {
    const filePath = resolve(outputDir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isFile() && !file.endsWith('.umd.cjs')) {
      const destPath = resolve(assetsDir, file)
      fs.moveSync(filePath, destPath, { overwrite: true })
    }
  })

  console.log('所有组件构建完成')
}

// 执行构建
buildAll().catch(error => {
  console.error('构建过程中发生错误:', error)
  process.exit(1)
})
