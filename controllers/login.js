const router = require('koa-router')()
const db = require('../config/mongo')
const client = require('../config/redis')
const UUID = require('uuid-js')

/**
 *
 */
const login = async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await db.user.findOne({ username })
  ctx.assert(user.password === password, '401', 'Incorrect password!')
  const token = UUID.create().toString()
  await client.hmset('access_token', token, user.userId)
  ctx.body = {
    access_token: token
  }
}

router.post('/login', login)

module.exports = router
