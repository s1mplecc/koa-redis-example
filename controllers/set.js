const router = require('koa-router')()
const redis = require('../config/redis')

const addMembersAndGetAll = async (ctx) => {
  redis.sadd('set:set1', 'hello', 'world', 'my', 'friend', 'hello')
  ctx.body = await redis.smembers('set:set1')
}

const popRandomMember = async (ctx) => {
  ctx.body = await redis.spop('set:set1')
}

const removeMemberByValue = async (ctx) => {
  ctx.body = await redis.srem('set:set1', ctx.params.value)
}

router.post('/set', addMembersAndGetAll)
router.delete('/set/random', popRandomMember)
router.delete('/set/:value', removeMemberByValue)

module.exports = router
