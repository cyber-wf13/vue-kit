module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb", "prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: "off",
    "linebreak-style": "off",
    "comma-dangle": "off",
    "vuejs-accessibility/click-events-have-key-events": "off",
    "vuejs-accessibility/mouse-events-have-key-events": "off",
    "vuejs-accessibility/label-has-for": "off",
    "operator-linebreak": "off",
    "no-use-before-define": "off",
  },
};
