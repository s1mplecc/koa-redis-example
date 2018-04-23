const router = require('koa-router')()
const redis = require('../config/redis')

const setString = async (ctx) => {
  ctx.body = await redis.set('string:s1', 'hello world')
}

const getString = async (ctx) => {
  ctx.body = await redis.get('string:s1')
}

const delString = async (ctx) => {
  ctx.body = await redis.del('string:s1')
}

router.post('/string', setString)
router.get('/string', getString)
router.delete('/string', delString)

module.exports = router
