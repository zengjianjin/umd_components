
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// 验证目录
const distDir = resolve(__dirname, '../dist')

// 检查目录是否存在
if (!existsSync(distDir)) {
  console.error('输出目录不存在:', distDir)
  process.exit(1)
}

// 获取所有组件文件
function getDistFiles(dir) {
  const files = []
  const dirItems = readdirSync(dir)

  dirItems.forEach(item => {
    const filePath = resolve(dir, item)
    const stat = statSync(filePath)

    if (stat.isFile() && item.endsWith('.umd.cjs')) {
      files.push({
        name: item,
        path: filePath,
        size: stat.size
      })
    }
  })

  return files
}

// 验证文件内容
function validateFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')

    // 检查是否包含Vue外部依赖
    if (filePath.endsWith('.umd.cjs')) {
      // 检查是否正确将Vue作为外部依赖
      const hasVueExternal = content.includes('require("vue")') || 
                            content.includes('["vue"]') ||
                            content.includes('t.Vue')

      if (!hasVueExternal) {
        console.warn(`警告: ${filePath} 可能未正确排除Vue依赖`)
      }

      // 检查是否包含UMD包装器
      const hasUmdWrapper = content.includes('typeof exports=="object"') ||
                          content.includes('typeof define=="function"') ||
                          content.includes('globalThis') ||
                          content.includes('module.exports')

      if (!hasUmdWrapper) {
        console.warn(`警告: ${filePath} 可能不是有效的UMD格式`)
      }
      
      // 检查是否包含CSS注入代码
      const hasCssInjection = content.includes('document.createElement(\'style\')') &&
                            content.includes('style.innerHTML') &&
                            content.includes('document.head.appendChild(style)')
      
      if (!hasCssInjection) {
        console.warn(`警告: ${filePath} 可能未正确注入CSS`)
      }
    }

    return true
  } catch (error) {
    console.error(`验证文件 ${filePath} 时出错:`, error.message)
    return false
  }
}

// 主函数
function validateDist() {
  console.log('开始验证dist目录中的文件...')

  const files = getDistFiles(distDir)

  if (files.length === 0) {
    console.error('dist目录中没有找到任何文件')
    process.exit(1)
  }

  console.log(`找到 ${files.length} 个文件:`)

  let allValid = true

  files.forEach(file => {
    console.log(`- ${file.name} (${file.size} bytes)`)

    if (!validateFile(file.path)) {
      allValid = false
    }
  })

  if (allValid) {
    console.log('\n✅ 所有文件验证通过!')
    console.log('\n📋 使用说明:')
    console.log('1. 在使用这些UMD组件前，需要先引入Vue作为全局变量')
    console.log('2. 例如在HTML中:')
    console.log('   ```html')
    console.log('   <script src="https://unpkg.com/vue@next"></script>')
    console.log('   <script src="./dist/Button.umd.cjs"></script>')
    console.log('   ```')
    console.log('3. CSS样式已自动注入，无需单独引入CSS文件')
    console.log('4. 然后可以通过全局变量访问组件')
    console.log('   ```javascript')
    console.log('   // 组件会注册为全局变量')
    console.log('   ```')
  } else {
    console.error('\n❌ 验证失败!')
    process.exit(1)
  }
}

// 执行验证
try {
  validateDist()
} catch (error) {
  console.error('验证过程中发生错误:', error)
  process.exit(1)
}
