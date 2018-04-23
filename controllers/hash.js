const router = require('koa-router')()
const redis = require('../config/redis')

const setHash = async (ctx) => {
  const student = {
    name: 'Jack',
    age: 18,
    score: 90
  }
  ctx.body = await redis.hmset('hash:hash1', student)
}

const getHashAll = async (ctx) => {
  ctx.body = await redis.hgetall('hash:hash1')
}

const getHashByField = async (ctx) => {
  ctx.body = await redis.hget('hash:hash1', ctx.params.field)
}

const delHash = async (ctx) => {
  ctx.body = await redis.del('hash:hash1')
}

const delHashByField = async (ctx) => {
  ctx.body = await redis.hdel('hash:hash1', ctx.params.field)
}

router.post('/hash', setHash)
router.get('/hash', getHashAll)
router.get('/hash/:field', getHashByField)
router.delete('/hash', delHash)
router.delete('/hash/:field', delHashByField)

module.exports = router
