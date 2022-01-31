const RETRY_CONF = { factor: 1, maxTimeout: 1, minTimeout: 1, retries: 3 }

const RATE_LIMITS = { core: { read: 1, write: 1 }, search: 1 }

const GLOBAL_RATE_LIMIT = 1

module.exports = { GLOBAL_RATE_LIMIT, RATE_LIMITS, RETRY_CONF }
