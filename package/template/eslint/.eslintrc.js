module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', 'import'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  settings: {
    'import/resolver': {
      alias: [
        ['@', './src'],
        ['@C', './src/components'],
        ['@V', './src/views'],
        ['@assets', './src/assets'],
        ['@libs', './src/libs'],
        ['@api', './src/api'],
      ],
    },
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-void': 'error',
    camelcase: 'off',
    'no-param-reassign': ['error', { props: false }], // 参数不可改变，属性可改变
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1, flatTernaryExpressions: true }], // 使用两个空格，switch强制缩进default:0

    // vue
    'vue/html-indent': 'off',
    'vue/html-self-closing': ['off'],
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/custom-event-name-casing': 'error',
    'vue/no-deprecated-props-default-this': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/max-len': [
      'error',
      {
        code: 150,
        template: 100,
        tabWidth: 2,
        comments: 150,
        ignorePattern: '',
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      },
    ],
  },
};

