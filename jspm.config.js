System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "es7.decorators"
    ]
  },
  paths: {
    "app/*": "src/app/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "babel": "npm:babel-core@5.8.25",
    "fetch-polyfill": "npm:fetch-polyfill@0.8.1",
    "text": "github:systemjs/plugin-text@0.0.2"
  }
});
