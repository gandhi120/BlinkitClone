module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        camelcase: [2, { properties: 'always' }], // variable and function name must be camel case
        'no-console': 'error', // give error on console finds,
        'sort-imports': [
          'error',
          {
            ignoreCase: true,
            ignoreMemberSort: false,
            ignoreDeclarationSort: true,
          },
        ],
      },
    },
  ],
};
