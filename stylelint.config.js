module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-less'],
  overrides: [
    {
      files: ['**/*.html', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
};
