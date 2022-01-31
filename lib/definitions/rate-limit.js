/**
 * Default exponential backoff configuration for retries.
 */
const RETRY_CONF = { factor: 2, minTimeout: 1000, retries: 3 }

/**
 * Rate limit per API endpoints.
 *
 * See {@link https://developer.github.com/v3/search/#rate-limit|Search API rate limit}.
 * See {@link https://developer.github.com/v3/#rate-limiting|Rate limiting}.
 */
const RATE_LIMITS = {
  // 30 calls per minutes => 1 call every 2s + 10% safety margin
  core: {
    read: ((60 * 60 * 1000) / 5000) * 1.1, // 5000 calls per hour => 1 call per 720ms + 10% safety margin
    write: 3000 // 1 call every 3 seconds
  },
  search: ((60 * 1000) / 30) * 1.1
}

/**
 * Global rate limit to prevent abuse.
 *
 * See {@link https://developer.github.com/v3/guides/best-practices-for-integrators/#dealing-with-abuse-rate-limits|Dealing with abuse rate limits}
 */
const GLOBAL_RATE_LIMIT = 1000

module.exports = { GLOBAL_RATE_LIMIT, RATE_LIMITS, RETRY_CONF }
