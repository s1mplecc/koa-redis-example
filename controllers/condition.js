const router = require('koa-router')()
const db = require('../config/mongo')
const UUID = require('uuid-js')
const _ = require('lodash')

const insertCustomizedCondition = async (ctx, next) => {
  const request = JSON.parse(ctx.request.body)
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

const updateCustomizedCondition = async (ctx, next) => {
  const request = JSON.parse(ctx.request.body)
  const newCustomizedCondition = {
    ...request.customizedCondition,
    updateTime: new Date()
  }
  ctx.body = await db.report.findOneAndUpdate(
    { reportId: request.reportId, 'customizedConditions.conditionId': request.customizedCondition.conditionId },
    { $set: { 'customizedConditions.$': newCustomizedCondition } }
  )
}

// todo createdUser => userId
const listReportConditions = async (ctx, next) => {
  const { reportId, userId } = ctx.params
  const report = await db.report.findOne({ reportId })
  ctx.body = {
    standardConditions: report.standardConditions,
    customizedConditions: _.filter(report.customizedConditions, item => item.createdUser === userId)
  }
}

/**
 * Add a user's Customized Condition
 */
router.post('/report/customized-condition', insertCustomizedCondition)

/**
 * Update a user's customized condition, already exists
 */
router.put('/report/customized-condition', updateCustomizedCondition)

/**
 * List the filter conditions for a report,
 * contains standard conditions & user's customized conditions
 */
router.get('/report/conditions/:reportId/:userId', listReportConditions)

module.exports = router
