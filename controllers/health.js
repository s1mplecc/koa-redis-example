const router = require('koa-router')()

// health check
router.get('/health', async (ctx, next) => {
  ctx.body = {
    status: 'UP'
  }
})

module.exports = router
