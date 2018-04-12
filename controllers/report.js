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

/**
 * Get report clause for spark runner execute spark api,
 * contains groupby, pivot, agg
 */
const getReportClause = async (ctx) => {
  const { reportId } = ctx.params
  ctx.body = await db.report.findOne(
    { reportId },
    {
      _id: 0, clause: 1
    }
  )
}

router.get('/reports', getReports)
router.get('/report/:reportId/clause', getReportClause)

module.exports = router
