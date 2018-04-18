const router = require('koa-router')()
const db = require('../config/mongo')
const client = require('../config/redis')
const UUID = require('uuid-js')
const bcrypt = require('bcrypt')

/**
 * Check user login & generate access_token
 * set token and userId hash to redis
 * @code {String} hash: the data encrypted with salt
 */
const login = async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await db.user.findOne({ username })
  ctx.assert(user, '401', 'User not found!')
  const hash = bcrypt.hashSync(password, user.salt)
  ctx.assert(hash === user.password, '401', 'Incorrect password!')
  const token = UUID.create().toString()
  await client.hmset('access_token', token, user.userId)
  ctx.body = {
    access_token: token
  }
}

router.post('/login', login)

module.exports = router
