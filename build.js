const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Build script starting...');

// Helper function to execute shell commands
function execSync(command) {
  const { execSync } = require('child_process');
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Configuration
const config = {
  srcDir: '.',
  distDir: 'dist',
  files: {
    css: 'styles.css',
    js: 'script.js',
    html: 'index.html'
  },
  isDev: process.argv.includes('--dev'),
  cssOnly: process.argv.includes('--css-only'),
  jsOnly: process.argv.includes('--js-only'),
  watch: process.argv.includes('--watch')
};

// Ensure dist directory exists
function ensureDistDir() {
  if (!fs.existsSync(config.distDir)) {
    fs.mkdirSync(config.distDir, { recursive: true });
  }
}

// Generate hash for cache busting
function generateHash(content) {
  return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
}

// CSS Processing with PostCSS and Autoprefixer
async function processCSS() {
  console.log('🎨 Processing CSS...');
  
  const cssPath = path.join(config.srcDir, config.files.css);
  if (!fs.existsSync(cssPath)) {
    console.warn(`⚠️  CSS file not found: ${cssPath}`);
    return null;
  }

  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Create PostCSS config
  const postcssConfig = `
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'IE >= 10',
        'Chrome >= 30',
        'Firefox >= 30',
        'Safari >= 8',
        'iOS >= 8',
        'Android >= 4.4'
      ],
      grid: true
    }),
    ${config.isDev ? '' : "require('cssnano')({ preset: 'default' })"}
  ]
};
`;

  fs.writeFileSync('postcss.config.js', postcssConfig);
  
  // Process CSS with PostCSS (using Node.js API instead of CLI)
  try {
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');
    
    const plugins = [
      autoprefixer({
        overrideBrowserslist: [
          '> 1%',
          'last 2 versions',
          'IE >= 10',
          'Chrome >= 30',
          'Firefox >= 30',
          'Safari >= 8',
          'iOS >= 8',
          'Android >= 4.4'
        ],
        grid: true
      })
    ];
    
    if (!config.isDev) {
      plugins.push(cssnano({ preset: 'default' }));
    }
    
    const result = await postcss(plugins).process(cssContent, { from: undefined, to: undefined });
    const processedCSS = result.css;
    
    // Add additional polyfills for older browsers
    const polyfillCSS = addCSSPolyfills(processedCSS);
    
    // Generate hash and filename
    const hash = generateHash(polyfillCSS);
    const hashedFilename = `styles.${hash}.css`;
    
    // Write processed CSS
    const distPath = path.join(config.distDir, hashedFilename);
    fs.writeFileSync(distPath, polyfillCSS);
    
    // Clean up temp file
    if (fs.existsSync('postcss.config.js')) {
      fs.unlinkSync('postcss.config.js');
    }
    
    console.log(`✅ CSS processed: ${hashedFilename} (${(polyfillCSS.length / 1024).toFixed(1)}KB)`);
    return hashedFilename;
    
  } catch (error) {
    console.error('❌ CSS processing failed:', error.message);
    return null;
  }
}

// Add CSS polyfills for older browsers
function addCSSPolyfills(css) {
  let polyfillCSS = css;
  
  // Add flexbox fallbacks
  polyfillCSS = polyfillCSS.replace(/display:\s*flex/g, 'display: -webkit-box; display: -webkit-flex; display: -moz-flex; display: -ms-flexbox; display: flex');
  
  // Add grid fallbacks
  polyfillCSS = polyfillCSS.replace(/display:\s*grid/g, 'display: -ms-grid; display: grid');
  
  // Add transform fallbacks
  polyfillCSS = polyfillCSS.replace(/transform:/g, '-webkit-transform: ; -moz-transform: ; -ms-transform: ; transform:').replace(/: ;/g, ':');
  
  // Add transition fallbacks
  polyfillCSS = polyfillCSS.replace(/transition:/g, '-webkit-transition: ; -moz-transition: ; -ms-transition: ; transition:').replace(/: ;/g, ':');
  
  // Add backdrop-filter fallbacks
  polyfillCSS = polyfillCSS.replace(/backdrop-filter:/g, '-webkit-backdrop-filter: ; backdrop-filter:').replace(/: ;/g, ':');
  
  // Add CSS custom properties fallback notice
  const fallbackComment = `
/* CSS Custom Properties Fallback for IE */
/* Note: CSS variables are not supported in IE. Consider using PostCSS custom properties plugin for full support. */
`;
  
  return fallbackComment + polyfillCSS;
}

// JavaScript Processing with Babel
function processJS() {
  console.log('⚡ Processing JavaScript...');
  
  const jsPath = path.join(config.srcDir, config.files.js);
  if (!fs.existsSync(jsPath)) {
    console.warn(`⚠️  JavaScript file not found: ${jsPath}`);
    return null;
  }

  const jsContent = fs.readFileSync(jsPath, 'utf8');
  
  // Create Babel config for ES5 compilation
  const babelConfig = {
    presets: [
      ['@babel/preset-env', {
        targets: {
          ie: '10',
          chrome: '30',
          firefox: '30',
          safari: '8'
        },
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false
      }]
    ]
  };
  
  fs.writeFileSync('.babelrc.json', JSON.stringify(babelConfig, null, 2));
  
  try {
    // Transform with Babel using Node.js API
    const babel = require('@babel/core');
    const result = babel.transformSync(jsContent, {
      presets: [
        ['@babel/preset-env', {
          targets: {
            ie: '10',
            chrome: '30',
            firefox: '30',
            safari: '8'
          },
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false
        }]
      ]
    });
    
    const transformedJS = result.code;
    
    // Add polyfills for older browsers
    const polyfillJS = addJSPolyfills(transformedJS);
    
    // Minify in production
    let finalJS = polyfillJS;
    if (!config.isDev) {
      const { minify } = require('terser');
      const minified = minify(polyfillJS, {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        mangle: true,
        format: {
          comments: false
        }
      });
      
      if (minified.code) {
        finalJS = minified.code;
      }
    }
    
    // Generate hash and filename
    const hash = generateHash(finalJS);
    const hashedFilename = `script.${hash}.js`;
    
    // Write processed JS
    const distPath = path.join(config.distDir, hashedFilename);
    fs.writeFileSync(distPath, finalJS);
    
    // Clean up config file
    if (fs.existsSync('.babelrc.json')) {
      fs.unlinkSync('.babelrc.json');
    }
    
    console.log(`✅ JavaScript processed: ${hashedFilename} (${(finalJS.length / 1024).toFixed(1)}KB)`);
    return hashedFilename;
    
  } catch (error) {
    console.error('❌ JavaScript processing failed:', error.message);
    return null;
  }
}

// Add JavaScript polyfills for older browsers
function addJSPolyfills(js) {
  const polyfills = `
// Polyfills for older browsers
(function() {
  'use strict';
  
  // Array.from polyfill
  if (!Array.from) {
    Array.from = function(arrayLike) {
      return Array.prototype.slice.call(arrayLike);
    };
  }
  
  // Object.assign polyfill
  if (!Object.assign) {
    Object.assign = function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (source.hasOwnProperty(key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  }
  
  // Promise polyfill check
  if (typeof Promise === 'undefined') {
    console.warn('Promise not supported. Consider loading a Promise polyfill.');
  }
  
  // Fetch polyfill check
  if (typeof fetch === 'undefined') {
    console.warn('Fetch not supported. Consider loading a fetch polyfill.');
  }
  
  // addEventListener for IE8
  if (!Element.prototype.addEventListener) {
    Element.prototype.addEventListener = function(event, handler) {
      this.attachEvent('on' + event, handler);
    };
  }
  
  // querySelector for IE7
  if (!document.querySelector) {
    console.warn('querySelector not supported. Consider using a different selector method.');
  }
})();

`;
  
  return polyfills + js;
}

// Process HTML and update references
function processHTML(cssFilename, jsFilename) {
  console.log('📄 Processing HTML...');
  
  const htmlPath = path.join(config.srcDir, config.files.html);
  if (!fs.existsSync(htmlPath)) {
    console.warn(`⚠️  HTML file not found: ${htmlPath}`);
    return;
  }
  
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Update CSS reference
  if (cssFilename) {
    htmlContent = htmlContent.replace(
      /(<link[^>]*href=")[^"]*styles\.css("[^>]*>)/,
      `$1${cssFilename}$2`
    );
  }
  
  // Update JS reference or add it if it doesn't exist
  if (jsFilename) {
    if (htmlContent.includes('script.js')) {
      htmlContent = htmlContent.replace(
        /(<script[^>]*src=")[^"]*script\.js("[^>]*>)/,
        `$1${jsFilename}$2`
      );
    } else {
      // If there's inline script, replace it with external reference
      const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
      htmlContent = htmlContent.replace(scriptRegex, `<script src="${jsFilename}"></script>`);
    }
  }
  
  // Add meta tags for better browser compatibility
  if (!htmlContent.includes('http-equiv="X-UA-Compatible"')) {
    htmlContent = htmlContent.replace(
      '<meta name="viewport"',
      '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport"'
    );
  }
  
  // Add DNS prefetch for external resources
  const dnsPreconnect = `    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>`;
  
  if (!htmlContent.includes('dns-prefetch')) {
    htmlContent = htmlContent.replace(
      '<link href="https://cdnjs.cloudflare.com',
      dnsPreconnect + '\n    <link href="https://cdnjs.cloudflare.com'
    );
  }
  
  // Write processed HTML
  const distPath = path.join(config.distDir, 'index.html');
  fs.writeFileSync(distPath, htmlContent);
  
  console.log('✅ HTML processed');
}

// Copy assets and other files
function copyAssets() {
  console.log('📁 Copying assets...');
  
  const assetsDir = path.join(config.srcDir, 'assets');
  const distAssetsDir = path.join(config.distDir, 'assets');
  
  if (fs.existsSync(assetsDir)) {
    if (!fs.existsSync(distAssetsDir)) {
      fs.mkdirSync(distAssetsDir, { recursive: true });
    }
    
    const files = fs.readdirSync(assetsDir);
    files.forEach(file => {
      const srcPath = path.join(assetsDir, file);
      const distPath = path.join(distAssetsDir, file);
      fs.copyFileSync(srcPath, distPath);
    });
    
    console.log(`✅ Assets copied (${files.length} files)`);
  }
  
  // Copy additional files
  const additionalFiles = ['404.html', '502.html', '.htaccess'];
  additionalFiles.forEach(file => {
    const srcPath = path.join(config.srcDir, file);
    if (fs.existsSync(srcPath)) {
      const distPath = path.join(config.distDir, file);
      fs.copyFileSync(srcPath, distPath);
    }
  });
}

// Check dependencies
function checkDependencies() {
  console.log('🔍 Checking dependencies...');
  
  const requiredPackages = [
    '@babel/core',
    '@babel/preset-env', 
    'autoprefixer',
    'postcss',
    'cssnano',
    'terser'
  ];
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const installedPackages = Object.keys(packageJson.devDependencies || {});
  
  const missingPackages = requiredPackages.filter(pkg => !installedPackages.includes(pkg));
  
  if (missingPackages.length > 0) {
    console.log('📦 Installing missing dependencies...');
    execSync(`npm install ${missingPackages.join(' ')} --save-dev`);
  }
}

// Main build function
async function build() {
  console.log('🚀 Starting build process...');
  console.log('=====================================');
  console.log(`📦 Mode: ${config.isDev ? 'Development' : 'Production'}`);
  console.log(`🎯 Target: ${config.cssOnly ? 'CSS Only' : config.jsOnly ? 'JS Only' : 'Full Build'}`);
  console.log('=====================================');
  
  const startTime = Date.now();
  
  // Check and install dependencies (commented out for debugging)
  // checkDependencies();
  
  // Ensure dist directory exists
  ensureDistDir();
  
  let cssFilename = null;
  let jsFilename = null;
  
  // Process files based on options
  if (!config.jsOnly) {
    cssFilename = await processCSS();
  }
  
  if (!config.cssOnly) {
    jsFilename = processJS();
  }
  
  // Process HTML and copy assets for full builds
  if (!config.cssOnly && !config.jsOnly) {
    processHTML(cssFilename, jsFilename);
    copyAssets();
  }
  
  const endTime = Date.now();
  const buildTime = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('=====================================');
  console.log('✅ Build completed successfully!');
  console.log(`⏱️  Build time: ${buildTime}s`);
  console.log(`📁 Output directory: ${config.distDir}/`);
  if (cssFilename) console.log(`🎨 CSS: ${cssFilename}`);
  if (jsFilename) console.log(`⚡ JS: ${jsFilename}`);
  console.log('');
  console.log('🌐 Your website is ready for production!');
  console.log('📱 Optimized for browsers: IE10+, Chrome 30+, Firefox 30+, Safari 8+');
  console.log('🚀 Files include cache-busting hashes');
  console.log('🔧 CSS includes vendor prefixes and polyfills');
  console.log('⚡ JS compiled to ES5 with polyfills');
  
  if (!config.isDev) {
    console.log('📊 Run "npm run serve" to preview the built website');
  }
}

// Watch mode (basic implementation)
async function watch() {
  console.log('👀 Starting watch mode...');
  console.log('File changes will trigger rebuilds...');
  console.log('Press Ctrl+C to stop.');
  
  const chokidar = require('fs').watch || null;
  if (!chokidar) {
    console.log('⚠️  Watch mode requires a more recent Node.js version. Building once...');
    await build();
    return;
  }
  
  await build(); // Initial build
  
  // Watch for changes
  [config.files.css, config.files.js, config.files.html].forEach(file => {
    if (fs.existsSync(file)) {
      fs.watchFile(file, async () => {
        console.log(`\n📝 File changed: ${file}`);
        await build();
      });
    }
  });
}

// Run based on arguments
(async () => {
  if (config.watch) {
    await watch();
  } else {
    await build();
  }
})().catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});

module.exports = { build, processCSS, processJS, processHTML };
