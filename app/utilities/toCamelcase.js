const toCamelcase = (str) => {
  return str.toLowerCase()
  .replaceAll('(', '$')
  .replaceAll(')', '$')
  .replaceAll(':', '$')
  .replace(new RegExp(/[-+?,_]+/, 'g'), ' ')
  .replace(
    new RegExp(/\s+(.)(\w*)/, 'g'),
    ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
  )
  .replace("'", "")
  .replace(new RegExp(/\w/), (s, index) => index > 0 ? s.toUpperCase() : s);
}

module.exports = toCamelcase;
