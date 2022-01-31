const nock = require('nock')

/**
 * Return a `nock` object setup to respond to a github authentication request. Other expectation and responses can be chained.
 *
 * @param {Object} [env={}] Environment variables.
 * @param environment
 * @param environment.githubToken
 * @param {string} [githubToken=env.GH_TOKEN || env.GITHUB_TOKEN || 'GH_TOKEN'] The github token to return in the authentication response.
 * @param {string} [githubUrl=env.GITHUB_API_URL || env.GH_URL || env.GITHUB_URL || 'https://api.github.com'] The url on which to intercept http requests.
 * @param {string} [githubApiPathPrefix=env.GH_PREFIX || env.GITHUB_PREFIX || ''] The GitHub Enterprise API prefix.
 * @param environment.githubUrl
 * @param environment.githubApiPathPrefix
 * @returns {Object} A `nock` object ready to respond to a github authentication request.
 */
function authenticate(
  environment = {},
  {
    githubToken = environment.GH_TOKEN || environment.GITHUB_TOKEN || 'GH_TOKEN',
    githubUrl = environment.GITHUB_API_URL || environment.GH_URL || environment.GITHUB_URL || 'https://api.github.com',
    githubApiPathPrefix = environment.GH_PREFIX || environment.GITHUB_PREFIX || ''
  } = {}
) {
  return nock(`${githubUrl}/${githubApiPathPrefix}`, { reqheaders: { Authorization: `token ${githubToken}` } })
}

/**
 * Return a `nock` object setup to respond to a github release upload request. Other expectation and responses can be chained.
 *
 * @param {Object} [env={}] Environment variables.
 * @param environment
 * @param environment.githubToken
 * @param {string} [githubToken=env.GH_TOKEN || env.GITHUB_TOKEN || 'GH_TOKEN'] The github token to return in the authentication response.
 * @param {string} [uploadUrl] The url on which to intercept http requests.
 * @param environment.uploadUrl
 * @param environment.contentType
 * @param environment.contentLength
 * @returns {Object} A `nock` object ready to respond to a github file upload request.
 */
function upload(
  environment = {},
  {
    githubToken = environment.GH_TOKEN || environment.GITHUB_TOKEN || 'GH_TOKEN',
    uploadUrl,
    contentType = 'text/plain',
    contentLength
  } = {}
) {
  return nock(uploadUrl, {
    reqheaders: { Authorization: `token ${githubToken}`, 'content-length': contentLength, 'content-type': contentType }
  })
}

module.exports = { authenticate, upload }
