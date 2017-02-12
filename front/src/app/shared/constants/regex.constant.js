module.exports = {
  CAMEL_CASE: /([A-Z])/g,
  CAMEL_CASE_SPACE: ' $1',
  CAPITALIZE_FIRST_LETTERS: /^./,
  HTML_ID: /[^A-Z0-9]/ig,
  NAME_INITIALS: /\b\w/g
};