const SemanticReleaseError = require('@semantic-release/error')
const ERROR_DEFINITIONS = require('./definitions/errors')

module.exports = (code, context = {}) => {
  const { message, details } = ERROR_DEFINITIONS[code](context)

  return new SemanticReleaseError(message, code, details)
}
