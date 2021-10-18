module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-airbnb'],
  plugins: ['stylelint-scss'],
  rules: {
    'max-nesting-depth': 10,
    'string-quotes': 'single',
    'declaration-property-value-disallowed-list': { '/^border/': ['none'] },
  },
};
