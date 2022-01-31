const { inspect } = require('util')
const { isString } = require('lodash')
const package_ = require('../../package.json')

const [homepage] = package_.homepage.split('#')
const stringify = (object) =>
  isString(object) ? object : inspect(object, { breakLength: Number.POSITIVE_INFINITY, depth: 2, maxArrayLength: 5 })
const linkify = (file) => `${homepage}/blob/master/${file}`

module.exports = {
  EGHNOPERMISSION: ({ owner, repo }) => ({
    details: `The user associated with the [GitHub token](${linkify(
      'README.md#github-authentication'
    )}) configured in the \`GH_TOKEN\` or \`GITHUB_TOKEN\` environment variable must allows to push to the repository ${owner}/${repo}.

Please make sure the GitHub user associated with the token is an [owner](https://help.github.com/articles/permission-levels-for-a-user-account-repository/#owner-access-on-a-repository-owned-by-a-user-account) or a [collaborator](https://help.github.com/articles/permission-levels-for-a-user-account-repository/#collaborator-access-on-a-repository-owned-by-a-user-account) if the reposotory belong to a user account or has [write permissions](https://help.github.com/articles/managing-team-access-to-an-organization-repository) if the repository [belongs to an organization](https://help.github.com/articles/repository-permission-levels-for-an-organization).`,
    message: `The GitHub token doesn't allow to push on the repository ${owner}/${repo}.`
  }),
  EINVALIDADDRELEASES: ({ addReleases }) => ({
    details: `The [addReleases option](${linkify('README.md#options')}) if defined, must be one of \`false|top|bottom\`.

Your configuration for the \`addReleases\` option is \`${stringify(addReleases)}\`.`,
    message: 'Invalid `addReleases` option.'
  }),
  EINVALIDASSETS: ({ assets }) => ({
    details: `The [assets option](${linkify(
      'README.md#assets'
    )}) must be an \`Array\` of \`Strings\` or \`Objects\` with a \`path\` property.

Your configuration for the \`assets\` option is \`${stringify(assets)}\`.`,
    message: 'Invalid `assets` option.'
  }),
  EINVALIDASSIGNEES: ({ assignees }) => ({
    details: `The [assignees option](${linkify('README.md#options')}) must be an \`Array\` of non empty \`Strings\`.

Your configuration for the \`assignees\` option is \`${stringify(assignees)}\`.`,
    message: 'Invalid `assignees` option.'
  }),
  EINVALIDFAILCOMMENT: ({ failComment }) => ({
    details: `The [failComment option](${linkify('README.md#failcomment')}) if defined, must be a non empty \`String\`.

Your configuration for the \`failComment\` option is \`${stringify(failComment)}\`.`,
    message: 'Invalid `failComment` option.'
  }),
  EINVALIDFAILTITLE: ({ failTitle }) => ({
    details: `The [failTitle option](${linkify('README.md#failtitle')}) if defined, must be a non empty \`String\`.

Your configuration for the \`failTitle\` option is \`${stringify(failTitle)}\`.`,
    message: 'Invalid `failTitle` option.'
  }),
  EINVALIDGHTOKEN: ({ owner, repo }) => ({
    details: `The [GitHub token](${linkify(
      'README.md#github-authentication'
    )}) configured in the \`GH_TOKEN\` or \`GITHUB_TOKEN\` environment variable must be a valid [personal token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line) allowing to push to the repository ${owner}/${repo}.

Please make sure to set the \`GH_TOKEN\` or \`GITHUB_TOKEN\` environment variable in your CI with the exact value of the GitHub personal token.`,
    message: 'Invalid GitHub token.'
  }),
  EINVALIDGITHUBURL: () => ({
    details: `The **semantic-release** \`repositoryUrl\` option must a valid GitHub URL with the format \`<GitHub_or_GHE_URL>/<owner>/<repo>.git\`.

By default the \`repositoryUrl\` option is retrieved from the \`repository\` property of your \`package.json\` or the [git origin url](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) of the repository cloned by your CI environment.`,
    message: 'The git repository URL is not a valid GitHub URL.'
  }),
  EINVALIDLABELS: ({ labels }) => ({
    details: `The [labels option](${linkify(
      'README.md#options'
    )}) if defined, must be an \`Array\` of non empty \`String\`.

Your configuration for the \`labels\` option is \`${stringify(labels)}\`.`,
    message: 'Invalid `labels` option.'
  }),
  EINVALIDPROXY: ({ proxy }) => ({
    details: `The [proxy option](${linkify(
      'README.md#proxy'
    )}) must be a \`String\`  or an \`Objects\` with a \`host\` and a \`port\` property.

Your configuration for the \`proxy\` option is \`${stringify(proxy)}\`.`,
    message: 'Invalid `proxy` option.'
  }),
  EINVALIDRELEASEDLABELS: ({ releasedLabels }) => ({
    details: `The [releasedLabels option](${linkify(
      'README.md#options'
    )}) if defined, must be an \`Array\` of non empty \`String\`.

Your configuration for the \`releasedLabels\` option is \`${stringify(releasedLabels)}\`.`,
    message: 'Invalid `releasedLabels` option.'
  }),
  EINVALIDSUCCESSCOMMENT: ({ successComment }) => ({
    details: `The [successComment option](${linkify(
      'README.md#successcomment'
    )}) if defined, must be a non empty \`String\`.

Your configuration for the \`successComment\` option is \`${stringify(successComment)}\`.`,
    message: 'Invalid `successComment` option.'
  }),
  EMISSINGREPO: ({ owner, repo }) => ({
    details: `The **semantic-release** \`repositoryUrl\` option must refer to your GitHub repository. The repository must be accessible with the [GitHub API](https://developer.github.com/v3).

By default the \`repositoryUrl\` option is retrieved from the \`repository\` property of your \`package.json\` or the [git origin url](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) of the repository cloned by your CI environment.

If you are using [GitHub Enterprise](https://enterprise.github.com) please make sure to configure the \`githubUrl\` and \`githubApiPathPrefix\` [options](${linkify(
      'README.md#options'
    )}).`,
    message: `The repository ${owner}/${repo} doesn't exist.`
  }),
  ENOGHTOKEN: ({ owner, repo }) => ({
    details: `A [GitHub personal token](${linkify(
      'README.md#github-authentication'
    )}) must be created and set in the \`GH_TOKEN\` or \`GITHUB_TOKEN\` environment variable on your CI environment.

Please make sure to create a [GitHub personal token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line) and to set it in the \`GH_TOKEN\` or \`GITHUB_TOKEN\` environment variable on your CI environment. The token must allow to push to the repository ${owner}/${repo}.`,
    message: 'No GitHub token specified.'
  })
}
