const router = require('koa-router')()
const redis = require('../config/redis')

const pushListAndGetAll = async (ctx) => {
  for (let i = 0; i < 5; i++) {
    redis.lpush('list:list1', i)
  }
  for (let i = 5; i < 10; i++) {
    redis.rpush('list:list1', i)
  }
  const length = await redis.llen('list:list1')
  console.log('length', length)
  ctx.body = await redis.lrange('list:list1', 0, length)
}

const popList = async (ctx) => {
  const lPopValue = await redis.lpop('list:list1')
  const rPopValue = await redis.rpop('list:list1')
  ctx.body = { lPopValue, rPopValue }
}

const deleteListByValue = async (ctx) => {
  ctx.body = await redis.lrem('list:list1', 0, ctx.params.value)
}

router.post('/list', pushListAndGetAll)
router.delete('/list', popList)
router.delete('/list/:value', deleteListByValue)

module.exports = router
