const router = require('koa-router')()
const db = require('../config/mongo')

/**
 * Get all reports
 */
const getReports = async (ctx) => {
  ctx.body = await db.report.find(
    {},
    {
      _id: 0, reportId: 1, reportName: 1, wideTableName: 1, categoryId: 1, available: 1
    }
  ).sort({ reportOrder: 1 }).toArray()
}

router.get('/reports', getReports)

module.exports = router
