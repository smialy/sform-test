'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import modRewrite  from 'connect-modrewrite';
import browserSync from 'browser-sync';

import {COLORS,LOG,PORT,OPEN,ENV} from '../const';
import paths from '../paths';

function infos(env) {
  LOG(COLORS.yellow('[INFOS] call `gulp serve --env ' + env + ' --port 9002` (for example) to launch on another port'));
  LOG(COLORS.yellow('[INFOS] call `gulp serve --env ' + env + ' --disable-watch` if you don\'t need it'));
  LOG(COLORS.yellow('[INFOS] call `gulp serve --env ' + env + ' --open false` if you don\'t want the browser to open'));
}

//=============================================
//            PROXY CONFIGURATION
//=============================================

/**
 * Launches a browserSync server
 * Injecting `env` as a global variable + overriding jspm.config.js if in test
 * @param env dev/test/dist
 * @param baseDir
 * @param [options]
 * @param [options.files='default']
 * @param [options.browser='default']
 * @param [options.port=PORT]
 */
function startBrowserSync(env, baseDir, options = {}) {
  env = env.toLowerCase();
  options.browser = options.browser === undefined ? 'default' : options.browser;
  options.files = options.files === undefined ? 'default' : options.files;
  options.port = options.port === undefined ? PORT : options.port;
  options.open = options.open === undefined ? true : options.open;

  var config = {
    open: options.open,
    files: options.files,
    port: options.port,
    notify: false,
    server: {
      baseDir: baseDir,
      middleware: [
        //proxyMiddleware,
        //modRewrite(['!\\.\\w+$ /index.html [L]']), // require for HTML5 mode
        function (req, res, next) {
          //don't cache the entry point (since there are some inline <script> tags injected that can be different according to the env you launch it)
          if (req.url.indexOf('/index.html') > -1) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
          }
          next();
        }
      ]
    },
    browser: options.browser
  };

  /**
   * Replace the tag <!-- inject-browser-sync --> with some specific js code
   * injecting what we need (env var, jspm.config override ...)
   *
   * Also adds the `test/fixtures/bs.snippet.html`file in test mode
   *
   * Only used on dev and test
   */
  if (env.toLowerCase() !== 'dist') {
    var injectBrowserSync = [];
    var bsHtmlSnippet = '';
    injectBrowserSync.push('<script id="inject-browser-sync">');
    injectBrowserSync.push('window.env = "' + env + '";');
    injectBrowserSync.push('console.info("Launched in ' + env + ' mode");');
    switch (env) {
      case 'test':
        injectBrowserSync.push('console.warn("Overriding jspm.config.js");');
        injectBrowserSync.push('console.info("Using following System.paths",System.paths);');
        bsHtmlSnippet = require('fs').readFileSync(__dirname + '/../../test/fixtures/bs.snippet.html');
        break;
    }
    injectBrowserSync.push('</script>');
    injectBrowserSync.push(bsHtmlSnippet);
    injectBrowserSync = injectBrowserSync.join('\n');
    config.rewriteRules = [
      {
        match: /<!-- inject-browser-sync -->/g,
        fn: function (match) {
          return injectBrowserSync;
        }
      }
    ];
  }

  browserSync(config);
}

gulp.task('serve', ['less', 'es6', 'watch'], () => {
  infos(ENV);
  switch(ENV){
    case 'dev':
      startBrowserSync('dev', [paths.dev.root, 'src', './'], {port: PORT, open: OPEN});
      break;
    case 'test':
      startBrowserSync('test', ['src', 'jspm_packages', './'], {port: PORT, open: OPEN});
      break;
  }
});
