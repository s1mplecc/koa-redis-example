const router = require('koa-router')()
const db = require('../config/mongo')
const client = require('../config/redis')
const UUID = require('uuid-js')
const bcrypt = require('bcryptjs')

/**
 * Check user login & generate access_token
 * set token -> userId hash to redis
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
  const { email, userId } = user
  ctx.body = {
    access_token: token,
    userProfile: { username, email, userId }
  }
}

/**
 * User logout, delete token -> userId from redis
 */
const logout = async (ctx) => {
  const token = ctx.request.header.authorization
  console.log('token', token)
  await client.hdel('access_token', token)
  ctx.body = 'ok'
}

router.post('/login', login)
router.delete('/logout', logout)

module.exports = router
