const router = require('koa-router')()
const db = require('../config/mongo')

const HIGHEST_LEVEL = 1
const CATEGORY_TYPE = { REPORT: 'REPORT', DATA: 'DATA' }

/**
 * Get Tree Data of Report Module
 */
const getReportTreeData = async (ctx, next) => {
  ctx.body = await db.category.find(
    {
      level: HIGHEST_LEVEL, type: CATEGORY_TYPE.REPORT
    },
    {
      _id: 0, categoryId: 1, categoryName: 1, 'subCategories.categoryName': 1, 'subCategories.categoryId': 1
    }
  ).toArray()
}

router.get('/report/tree-data', getReportTreeData)

module.exports = router
