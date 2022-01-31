const debug = require('debug')('semantic-release:github')
const { RELEASE_NAME } = require('./definitions/constants')
const parseGithubUrl = require('./parse-github-url')
const resolveConfig = require('./resolve-config')
const getClient = require('./get-client')
const isPrerelease = require('./is-prerelease')

module.exports = async (pluginConfig, context) => {
  const {
    options,
    branch,
    nextRelease: { name, gitTag, notes },
    logger
  } = context
  const { githubToken, githubUrl, githubApiPathPrefix, proxy, repositoryUrl } = resolveConfig(pluginConfig, context)
  const { owner, repo } = parseGithubUrl(repositoryUrl)
  const github = getClient({ githubApiPathPrefix, githubToken, githubUrl, proxy })
  let releaseId

  const release = { name, owner, prerelease: isPrerelease(branch), repo, tag_name: gitTag }

  debug('release object: %O', release)

  try {
    ;({
      data: { id: releaseId }
    } = await github.repos.getReleaseByTag({ owner, repo, tag: gitTag }))
  } catch (error) {
    if (error.status === 404) {
      logger.log('There is no release for tag %s, creating a new one', gitTag)

      const {
        data: { html_url: url }
      } = await github.repos.createRelease({ ...release, body: notes })

      logger.log('Published GitHub release: %s', url)

      return { name: RELEASE_NAME, url }
    }

    throw error
  }

  debug('release release_id: %o', releaseId)

  const {
    data: { html_url: url }
  } = await github.repos.updateRelease({ ...release, release_id: releaseId })

  logger.log('Updated GitHub release: %s', url)

  return { name: RELEASE_NAME, url }
}
