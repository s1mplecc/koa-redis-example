const router = require('koa-router')()

/**
 * Health check for Sidecar
 */
router.get('/health', async (ctx) => {
  ctx.body = {
    status: 'UP'
  }
})

module.exports = router
