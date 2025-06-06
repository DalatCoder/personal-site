console.log('🚀 Starting build test...');

const fs = require('fs');
const path = require('path');

// Test basic file operations
console.log('📁 Current directory:', process.cwd());
console.log('📄 Files present:', fs.readdirSync('.').filter(f => f.includes('.')));

// Test PostCSS
try {
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  console.log('✅ PostCSS modules loaded successfully');
  
  // Test CSS processing
  const cssContent = fs.readFileSync('styles.css', 'utf8');
  console.log('📄 CSS file loaded, size:', cssContent.length, 'bytes');
  
  const result = postcss([autoprefixer()]).process(cssContent, { from: undefined });
  console.log('✅ CSS processed successfully, size:', result.css.length, 'bytes');
  
} catch (error) {
  console.error('❌ PostCSS error:', error.message);
}

// Test Babel
try {
  const babel = require('@babel/core');
  console.log('✅ Babel modules loaded successfully');
  
  const jsContent = fs.readFileSync('script.js', 'utf8');
  console.log('📄 JS file loaded, size:', jsContent.length, 'bytes');
  
  const result = babel.transformSync('const x = () => console.log("test");', {
    presets: ['@babel/preset-env']
  });
  console.log('✅ JS transformed successfully');
  
} catch (error) {
  console.error('❌ Babel error:', error.message);
}

console.log('🎉 Build test completed!');
