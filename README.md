# Nguyễn Trọng Hiếu - Personal Website Build System

This project includes a modern build system for optimizing CSS and JavaScript for production deployment.

## Features

- 🎨 **CSS Processing**: Autoprefixer, polyfills, and minification for older browser support
- ⚡ **JavaScript Compilation**: ES5 transpilation with Babel for maximum compatibility  
- 🚀 **Cache Busting**: Automatic hash generation for CSS/JS files
- 📱 **Browser Support**: IE10+, Chrome 30+, Firefox 30+, Safari 8+
- 🔧 **Polyfills**: Automatic inclusion of polyfills for modern features

## Installation

```bash
# Install dependencies
npm install
```

## Build Commands

### Production Build
```bash
npm run build
```
Creates optimized, minified files with hash codes in the `dist/` directory.

### Development Build
```bash
npm run dev
```
Creates unminified files for easier debugging.

### CSS Only
```bash
npm run build:css
```
Process only CSS files.

### JavaScript Only
```bash
npm run build:js
```
Process only JavaScript files.

### Watch Mode
```bash
npm run watch
```
Watch for file changes and automatically rebuild.

### Clean
```bash
npm run clean
```
Remove the `dist/` directory.

### Preview
```bash
npm run serve
```
Start a local server to preview the built website at http://localhost:3000

## Browser Compatibility

### CSS Features
- Flexbox with fallbacks for older browsers
- CSS Grid with `-ms-grid` fallbacks
- Vendor prefixes for transforms, transitions, animations
- Backdrop-filter with `-webkit-` prefix
- Custom properties with fallback notices

### JavaScript Features  
- ES5 compilation for maximum compatibility
- Polyfills for Array.from, Object.assign
- Promise and Fetch polyfill detection
- IE8+ event listener compatibility
- Console warnings for unsupported features

## Output Structure

```
dist/
├── index.html              # Updated with hashed file references
├── styles.[hash].css       # Processed and prefixed CSS
├── script.[hash].js        # Transpiled and minified JS
├── assets/                 # Copied asset files
│   ├── avatar.jpg
│   └── QR.jpg
├── 404.html               # Error pages
└── 502.html
```

## Build Process Details

### CSS Processing
1. **Autoprefixer**: Adds vendor prefixes based on browserslist
2. **Polyfills**: Manual addition of flexbox and grid fallbacks
3. **Minification**: CSS compression for production builds
4. **Hash Generation**: MD5 hash for cache busting

### JavaScript Processing  
1. **Babel Transpilation**: ES6+ → ES5 compilation
2. **Polyfill Injection**: Browser compatibility patches
3. **Minification**: Code compression with Terser
4. **Hash Generation**: MD5 hash for cache busting

### HTML Processing
1. **File Reference Updates**: Automatic hash code insertion
2. **Meta Tag Addition**: IE compatibility and DNS prefetch
3. **Resource Optimization**: Preconnect and prefetch hints

## Dependencies

### Build Tools
- `@babel/core` & `@babel/preset-env`: JavaScript transpilation
- `autoprefixer` & `postcss`: CSS vendor prefixing  
- `cssnano`: CSS minification
- `terser`: JavaScript minification

### Browser Targets
```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions", 
    "IE >= 10",
    "Chrome >= 30",
    "Firefox >= 30",
    "Safari >= 8",
    "iOS >= 8",
    "Android >= 4.4"
  ]
}
```

## Development Workflow

1. **Development**: Edit source files (`styles.css`, `script.js`, `index.html`)
2. **Build**: Run `npm run build` to create production files
3. **Preview**: Use `npm run serve` to test the built version
4. **Deploy**: Upload `dist/` folder contents to web server

## Performance Optimizations

- **Minified Assets**: 40-60% size reduction
- **Cache Busting**: Automatic browser cache invalidation
- **Vendor Prefixes**: Only necessary prefixes added
- **Polyfill Loading**: Only when needed for compatibility
- **DNS Prefetch**: Faster external resource loading

## Troubleshooting

### Common Issues

**Missing Dependencies**:
```bash
npm install
```

**Build Errors**:
```bash
npm run clean
npm run build
```

**Server Not Starting**:
Check if port 3000 is available or modify the serve script.

### File Watching Issues
The watch mode uses Node.js `fs.watchFile()`. For better watching, consider upgrading to a newer Node.js version.

## Author

**Nguyễn Trọng Hiếu**  
Trợ giảng tại Khoa Công nghệ Thông tin  
Trường Đại học Đà Lạt

---

For more information, visit: [https://nguyentronghieu.io.vn](https://nguyentronghieu.io.vn)
