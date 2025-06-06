#!/usr/bin/env node

console.log('🔍 Debug: Starting build debug...');

try {
  const fs = require('fs');
  const path = require('path');
  
  console.log('🔍 Debug: Current directory:', process.cwd());
  console.log('🔍 Debug: Node version:', process.version);
  
  // Check if styles.css exists
  if (fs.existsSync('styles.css')) {
    console.log('✅ Debug: styles.css found');
  } else {
    console.log('❌ Debug: styles.css NOT found');
  }
  
  // Check if build.js exists
  if (fs.existsSync('build.js')) {
    console.log('✅ Debug: build.js found');
  } else {
    console.log('❌ Debug: build.js NOT found');
  }
  
  // Test PostCSS
  console.log('🔍 Debug: Testing PostCSS...');
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  
  const testCSS = 'body { display: flex; }';
  postcss([autoprefixer]).process(testCSS, { from: undefined })
    .then(result => {
      console.log('✅ Debug: PostCSS working');
      console.log('🔍 Debug: Result:', result.css);
      
      // Now try to run the main build
      console.log('🔍 Debug: Running main build...');
      require('./build.js');
      
    })
    .catch(error => {
      console.error('❌ Debug: PostCSS error:', error);
    });
    
} catch (error) {
  console.error('❌ Debug: Error:', error);
}
