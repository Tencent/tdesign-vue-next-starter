module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard'],
  plugin: ['stylelint-less'],
  rules: {
    'max-nesting-depth': 10,
    'string-quotes': 'single',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'font-family-name-quotes': null,
    'no-invalid-double-slash-comments': null,
  },
};
