const router = require('koa-router')()
const db = require('../config/mongo')
const UUID = require('uuid-js')
const _ = require('lodash')

/**
 * Add a user's Customized Condition
 */
const insertCustomizedCondition = async (ctx) => {
  const request = ctx.request.body
  const newCustomizedCondition = {
    ...request.customizedCondition,
    conditionId: UUID.create().toString(),
    createTime: new Date(),
    updateTime: new Date()
  }
  ctx.body = await db.report.findOneAndUpdate(
    { reportId: request.reportId },
    { $push: { customizedConditions: newCustomizedCondition } }
  )
}

/**
 * Update a user's customized condition, already exists
 */
const updateCustomizedCondition = async (ctx) => {
  const request = ctx.request.body
  console.log('request', request)
  const newCustomizedCondition = {
    ...request.customizedCondition,
    updateTime: new Date()
  }
  ctx.body = await db.report.findOneAndUpdate(
    { reportId: request.reportId, 'customizedConditions.conditionId': request.customizedCondition.conditionId },
    { $set: { 'customizedConditions.$': newCustomizedCondition } }
  )
}


/**
 * List the filter conditions for a report,
 * contains standard conditions & user's customized conditions
 */
// todo createdUser => userId
const listReportConditions = async (ctx) => {
  const { reportId, userId } = ctx.params
  const report = await db.report.findOne({ reportId })
  ctx.body = {
    standardConditions: report.standardConditions,
    customizedConditions: _.filter(report.customizedConditions, item => item.createdUser === userId)
  }
}

/**
 * Delete a user's customized condition
 */
const deleteReportCondition = async (ctx) => {
  const { reportId, conditionId } = ctx.params
  await db.report.findOneAndUpdate(
    { reportId },
    { $pull: { customizedConditions: { conditionId } } }
  )
  ctx.body = 'ok'
}

router.post('/report/customized-condition', insertCustomizedCondition)
router.put('/report/customized-condition', updateCustomizedCondition)
router.get('/report/conditions/:reportId/:userId', listReportConditions)
router.delete('/report/:reportId/conditions/:conditionId', deleteReportCondition)

module.exports = router
