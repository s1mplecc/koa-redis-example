const redis = require('redis')
const config = require('./config')

const client = redis.createClient(config.redis.port, config.redis.url)

client.on('ready', () => console.log('------------> redis is ready'))
client.on('end', () => console.log('------------> redis is end'))
client.on('error', err => console.error(err))
client.on('reconnecting', () => console.log('------------> redis is on reconnecting'))

module.exports = client

