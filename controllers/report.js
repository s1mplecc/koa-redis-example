const router = require('koa-router')()
const db = require('../config/mongo')
const _ = require('lodash')

/**
 * Get all reports
 */
const getReports = async (ctx) => {
  const reports = await db.report.find(
    {},
    {
      _id: 0,
      reportId: 1,
      reportName: 1,
      wideTableName: 1,
      categoryId: 1,
      available: 1,
      standardConditions: 1
    }
  ).sort({ reportOrder: 1 }).toArray()
  ctx.body = _.map(reports, (report) => {
    const filters = _.get(report, ['standardConditions', 0, 'filters'])
    const filterNames = _.map(filters, 'filterName')
    const dateFilters = _.get(report, ['standardConditions', 0, 'dateFilters'])
    const dateFilterNames = _.map(dateFilters, 'fieldName')
    return _.omit({ ...report, filterNames, dateFilterNames }, 'standardConditions')
  })
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
