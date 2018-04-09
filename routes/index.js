const router = require('koa-router')()
const db = require('../config/mongo')

router.get('/json', async (ctx, next) => {
  const a = await db.category.findOne({})
  ctx.body = a
})

module.exports = router
