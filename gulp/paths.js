'use strict';

import path from 'path';

const root = path.dirname(__dirname);

const paths = {
  gulpfile: `${root}/gulpfile.js`,
  jspmConfig: `${root}/jspm.config.js`,
  app: {
    root: `${root}/src/`,
    scripts: [`${root}/src/app/**/*.js`],
    less: `${root}/src/styles/less/**/*.less`,
    styles: `${root}/src/styles/`,
    fonts: [
      `${root}/src/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
      `${root}/jspm_packages/**/*.{eot,svg,ttf,woff,woff2}`,
    ],
    images: `${root}/src/imgs/**/*.{png,gif,jpg,jpeg}`,
    html: `${root}/src/index.html`,
    templates: `${root}/src/app/**/*.html`
  },
  dev: {
      root: `${root}/.dev/`,
      scripts: `${root}/.dev/app/`,
      styles: `${root}/.dev/styles/`
  },
  build: {
    root: `${root}/build/`,
    script:`${root}/build/scripts/build.js`,
    scripts: `${root}/build/scripts/`,
    fonts: `${root}/build/fonts/`,
    images: `${root}/build/images/`,
    styles: `${root}/build/styles/`,
    docs: `${root}/build/docs/`
  }
};

export default paths;
