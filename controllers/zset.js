const router = require('koa-router')()
const redis = require('../config/redis')

const addMembersAndGetAll = async (ctx) => {
  const students = [['Jack', 99], ['John', 90], ['Tony', 88], ['Helen', 92]]
  students.forEach((item) => {
    redis.zadd('zset:zset1', item[1], item[0])
  })
  const count = await redis.zcard('zset:zset1')
  ctx.body = await redis.zrange('zset:zset1', 0, count)
}

const removeMemberByValue = async (ctx) => {
  ctx.body = await redis.zrem('zset:zset1', ctx.params.value)
}

router.post('/zset', addMembersAndGetAll)
router.delete('/zset/:value', removeMemberByValue)

module.exports = router
