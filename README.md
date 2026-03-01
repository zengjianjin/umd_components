# UMD Component Library Development Environment

[中文](./README_ZH.md) | English

This is a UMD format component library development environment based on Vue 3 and Vite. You can use
this project to develop and build standalone UMD format components. It can be used as a component
library for drag-and-drop page generation.

## Project Features

- Vue 3 component development
- Each component can be individually packaged in UMD format
- Provides a visual component preview interface
- Automatically imports all components from the components folder
- Uses Vite as the build tool
- Base pixel width is 375px

## Tech Stack

- Vue 3
- Vite
- Node.js

## Project Structure

```
umd_components/
├── src/
│   ├── components/        # Component source directory
│   │   └── CustomHead.vue     # Custom header component
│   ├── App.vue           # Component preview page
│   └── main.js
├── scripts/
│   └── build.js          # UMD build script
├── dist/                 # Build output directory
│   └── CustomHead.umd.js     # Header component UMD file
├── test.html             # UMD component test page
├── vue.js                # Vue runtime file
└── package.json
```

## Development Guide

### Adding New Components

1. Create a new Vue component file in the `src/components` directory
2. Components will be automatically imported by App.vue, no manual configuration needed

### Previewing Components

Run the development server to preview and test components in your browser:

```bash
pnpm run dev
```

### Building UMD Components

Run the following command to build all components as standalone UMD format files:

```bash
pnpm run build:umd
pnpm run build:umd:single <component-name> # Build specified component individually
```

After building, UMD files will be output to the `dist` directory with the format
`ComponentName.umd.js`.

## Usage Examples

### Using UMD Components in HTML

Refer to preview.html

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

## Notes

Currently in the optimization phase, some settings may still have compatibility issues, such as
problems when using self-closing tags, etc. Please do not use in production environments.

## License

MIT
