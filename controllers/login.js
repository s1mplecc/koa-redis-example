const router = require('koa-router')()
const db = require('../config/mongo')
const redis = require('../config/redis')
const UUID = require('uuid-js')
const bcrypt = require('bcryptjs')

/**
 * Check user login & generate access_token
 * set token -> userId hash to redis
 */
const login = async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await db.user.findOne({ username })
  ctx.assert(user, '401', 'User not found!')
  ctx.assert(bcrypt.compareSync(password, user.password), '401', 'Incorrect password!')
  const token = bcrypt.hashSync(UUID.create().toString())
  await redis.hmset('access_token', token, user.userId)
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
  await redis.hdel('access_token', token)
  ctx.body = 'ok'
}

router.post('/login', login)
router.delete('/logout', logout)

module.exports = router
