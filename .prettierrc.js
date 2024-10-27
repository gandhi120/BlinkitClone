module.exports = {
  trailingComma: 'all',
  bracketSameLine: true,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  endOfLine: 'lf',
  proseWrap: 'always',
  bracketSpacing: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx'],
      options: {
        parser: 'babel',
        requirePragma: false,
      },
    },
  ],
};
