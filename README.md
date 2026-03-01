# UMD Components Development Environment

[中文](./README_ZH.md) | English

This is a UMD format component library development environment based on Vue 3 and Vite. You can use this project to develop and build standalone UMD format components.

## Project Features

- Support for Vue 3 component development
- Each component can be individually packaged in UMD format
- Provides a visual component preview interface
- Automatically imports all components from the components folder
- Uses Vite as the build tool
- Base pixel width is 375px

## Project Structure

```
umd_components/
├── src/
│   ├── components/        # Component source directory
│   │   ├── CustomButton.vue   # Custom button component
│   │   ├── CustomInput.vue    # Custom input component
│   │   └── CustomHead.vue     # Custom header component
│   ├── App.vue           # Component preview page
│   └── main.js
├── scripts/
│   └── build.js          # UMD build script
├── dist/                 # Build output directory
│   ├── CustomButton.umd.js   # Button component UMD file
│   ├── CustomInput.umd.js    # Input component UMD file
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
npm run dev
```

### Building UMD Components

Run the following command to build all components as standalone UMD format files:

```bash
npm run build:umd
```

After building, UMD files will be output to the `dist` directory with the format `ComponentName.umd.js`.

## Usage Examples

### Using UMD Components in HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UMD Component Example</title>
</head>
<body>
  <div id="app">
    <custom-button type="primary" @click="handleClick">Click Me</custom-button>
    <custom-input v-model="inputValue" placeholder="Enter content"></custom-input>
    <p>Input value: {{ inputValue }}</p>
  </div>

  <!-- Import Vue -->
  <script src="./vue.js"></script>
  <!-- Import UMD components -->
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
          alert('Button clicked!');
        }
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## Tech Stack

- Vue 3
- Vite
- Node.js

## License

MIT
