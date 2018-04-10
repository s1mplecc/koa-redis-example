const router = require('koa-router')()

/**
 * Health check for Sidecar
 */
router.get('/health', async (ctx, next) => {
  ctx.body = {
    status: 'UP'
  }
})

module.exports = router
