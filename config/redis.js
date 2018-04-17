const redis = require('redis')
const config = require('./config')

const client = redis.createClient(config.redis.port, config.redis.url)

module.exports = client

