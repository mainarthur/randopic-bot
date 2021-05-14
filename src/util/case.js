// Matches uppercase letter
const uppercaseRegex = /([A-Z])/g

/**
 * @param {String | Object} arg - string or object with keys in camel case
 *
 * @returns {String | Object} - string or object with keys in snake case
 */
function snakeCase(arg) {
  if (typeof arg.constructor === 'string') {
    return arg.replace(uppercaseRegex, '_$1').toLowerCase()
  }

  const newObject = {}
  const keys = Object.keys(arg)

  keys.forEach((key) => {
    newObject[snakeCase(key)] = arg[key]
  })

  return newObject
}

module.exports = { snakeCase }
