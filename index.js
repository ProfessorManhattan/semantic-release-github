/* eslint require-atomic-updates: off */

const { defaultTo, castArray } = require('lodash')
const verifyGitHub = require('./lib/verify')
const addChannelGitHub = require('./lib/add-channel')
const publishGitHub = require('./lib/publish')
const successGitHub = require('./lib/success')
const failGitHub = require('./lib/fail')

let verified

/**
 * @param pluginConfig
 * @param context
 */
async function verifyConditions(pluginConfig, context) {
  const { options } = context
  // If the GitHub publish plugin is used and has `assets`, `successComment`, `failComment`, `failTitle`, `labels` or `assignees` configured, validate it now in order to prevent any release if the configuration is wrong
  if (options.publish) {
    const publishPlugin =
      castArray(options.publish).find((config) => config.path && config.path === 'semantic-release-gh') || {}

    pluginConfig.assets = defaultTo(pluginConfig.assets, publishPlugin.assets)
    pluginConfig.successComment = defaultTo(pluginConfig.successComment, publishPlugin.successComment)
    pluginConfig.failComment = defaultTo(pluginConfig.failComment, publishPlugin.failComment)
    pluginConfig.failTitle = defaultTo(pluginConfig.failTitle, publishPlugin.failTitle)
    pluginConfig.labels = defaultTo(pluginConfig.labels, publishPlugin.labels)
    pluginConfig.assignees = defaultTo(pluginConfig.assignees, publishPlugin.assignees)
  }

  await verifyGitHub(pluginConfig, context)
  verified = true
}

/**
 * @param pluginConfig
 * @param context
 */
async function publish(pluginConfig, context) {
  if (!verified) {
    await verifyGitHub(pluginConfig, context)
    verified = true
  }

  return publishGitHub(pluginConfig, context)
}

/**
 * @param pluginConfig
 * @param context
 */
async function addChannel(pluginConfig, context) {
  if (!verified) {
    await verifyGitHub(pluginConfig, context)
    verified = true
  }

  return addChannelGitHub(pluginConfig, context)
}

/**
 * @param pluginConfig
 * @param context
 */
async function success(pluginConfig, context) {
  if (!verified) {
    await verifyGitHub(pluginConfig, context)
    verified = true
  }

  await successGitHub(pluginConfig, context)
}

/**
 * @param pluginConfig
 * @param context
 */
async function fail(pluginConfig, context) {
  if (!verified) {
    await verifyGitHub(pluginConfig, context)
    verified = true
  }

  await failGitHub(pluginConfig, context)
}

module.exports = { addChannel, fail, publish, success, verifyConditions }
