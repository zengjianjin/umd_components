
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

// Get current file directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// Components directory
const componentsDir = resolve(__dirname, '../src/components')
// Output directory
const outputDir = resolve(__dirname, '../dist')

// Ensure output directory exists
fs.ensureDirSync(outputDir)

// Get all component files
function getComponents(dir) {
  const components = []
  const files = readdirSync(dir)

  files.forEach(file => {
    const filePath = resolve(dir, file)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      // If it's a directory, search recursively
      components.push(...getComponents(filePath))
    } else if (file.endsWith('.vue')) {
      // If it's a Vue file, add to component list
      const componentName = file.replace('.vue', '')
      components.push({
        name: componentName,
        path: filePath
      })
    }
  })

  return components
}

// Build single component to UMD format
async function buildComponent(component) {
  console.log(`Building component: ${component.name}`)

  await build({
    configFile: false,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../src')
      }
    },
    build: {
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          },
          assetFileNames: (assetInfo) => {
            // If it's a CSS file, use component name for naming
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return `${component.name}.css`
            }
            // Put other static assets in assets folder
            return 'assets/[name].[hash][extname]'
          }
        }
      },
      lib: {
        entry: component.path,
        name: component.name,
        fileName: (format) => `${component.name}.umd.js`,
        formats: ['umd'],
        cssCodeSplit: false
      },
      outDir: outputDir,
      cssMinify: true
    }
  })
  
  // Inject CSS file content into UMD file
  const cssFilePath = resolve(outputDir, `${component.name}.css`)
  const umdFilePath = resolve(outputDir, `${component.name}.umd.js`)
  
  if (fs.existsSync(umdFilePath)) {
    let cssContent = '';
    if (fs.existsSync(cssFilePath)) {
      cssContent = fs.readFileSync(cssFilePath, 'utf-8');
    }
    const umdContent = fs.readFileSync(umdFilePath, 'utf-8')
    
    // Inject CSS at the beginning of UMD file (if exists)
    const cssInjection = `
(function() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = \`${cssContent.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`;
  document.head.appendChild(style);
})();
`
    
    // Modified UMD content
    let modifiedUmdContent = umdContent;
    if (cssContent) {
      modifiedUmdContent = cssInjection + umdContent;
    }
    
    // Write back to UMD file
    fs.writeFileSync(umdFilePath, modifiedUmdContent, 'utf-8')
    
    // Remove standalone CSS file (if exists)
    if (fs.existsSync(cssFilePath)) {
      fs.removeSync(cssFilePath);
    }
  }

  console.log(`Component ${component.name} build completed`)
}

// Main function
async function buildAll() {
  const components = getComponents(componentsDir)

  if (components.length === 0) {
    console.log('No component files found')
    return
  }

  console.log(`Found ${components.length} components`)

  // Build all components in parallel
  await Promise.all(components.map(component => buildComponent(component)))
  
  // Move static assets to assets folder
  const assetsDir = resolve(outputDir, 'assets')
  fs.ensureDirSync(assetsDir)
  
  // Move all non-UMD files to assets folder
  const files = fs.readdirSync(outputDir)
  files.forEach(file => {
    const filePath = resolve(outputDir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isFile() && !file.endsWith('.umd.js')) {
      const destPath = resolve(assetsDir, file)
      fs.moveSync(filePath, destPath, { overwrite: true })
    }
  })

  console.log('All components build completed')
}

// Execute build
buildAll().catch(error => {
  console.error('Error occurred during build:', error)
  process.exit(1)
})
