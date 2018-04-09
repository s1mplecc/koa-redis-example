const router = require('koa-router')()
const mongo = require('../config/mongo')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const a = await mongo.category.findOne({})
  ctx.body = a
})

module.exports = router
