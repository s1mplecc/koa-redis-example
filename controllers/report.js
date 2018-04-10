const router = require('koa-router')()
const db = require('../config/mongo')

const getReports = async (ctx, next) => {
  ctx.body = await db.report.find(
    {},
    {
      _id: 0, reportId: 1, reportName: 1, wideTableName: 1, available: 1
    }
  ).toArray()
}

/**
 * Get all reports
 */
router.get('/reports', getReports)

module.exports = router
