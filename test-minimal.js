#!/usr/bin/env node

console.log('🚀 Minimal test starting...');

const fs = require('fs');
const path = require('path');

console.log('✅ Basic requires work');

// Test async function
async function testAsync() {
  console.log('🔍 Testing async function...');
  return 'async works';
}

// Test PostCSS
async function testPostCSS() {
  console.log('🎨 Testing PostCSS...');
  
  try {
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    
    const testCSS = 'body { display: flex; transform: scale(1); }';
    const result = await postcss([autoprefixer]).process(testCSS, { from: undefined });
    
    console.log('✅ PostCSS result:', result.css);
    return result.css;
    
  } catch (error) {
    console.error('❌ PostCSS error:', error.message);
    return null;
  }
}

// Main execution
(async () => {
  console.log('🔍 Starting main execution...');
  
  const asyncResult = await testAsync();
  console.log('✅ Async result:', asyncResult);
  
  const postcssResult = await testPostCSS();
  console.log('✅ PostCSS completed');
  
  console.log('🎉 All tests completed!');
  
})().catch(error => {
  console.error('❌ Main execution error:', error);
  process.exit(1);
});
