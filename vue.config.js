const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === "production" ? "/vue-kit/" : "/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "sass:map"; @use "sass:math"; @import "~@/scss/helpers/_helpers.scss";`,
      },
    },
  },
});
