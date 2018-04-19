const router = require('koa-router')()
const db = require('../config/mongo')
const redis = require('../config/redis')
const bcrypt = require('bcryptjs')
const TokenGen = require('uuid-token-generator')

const tokenGen = new TokenGen(256, TokenGen.BASE62)
const TOKEN_EXPIRE_TIME = 3600

/**
 * Check user login & generate access_token
 * set token -> userId hash to redis
 */
const login = async (ctx) => {
  const { username, password } = ctx.request.body
  const user = await db.user.findOne({ username })
  ctx.assert(user, '401', 'User not found!')
  ctx.assert(bcrypt.compareSync(password, user.password), '401', 'Incorrect password!')
  const token = tokenGen.generate()
  await redis.set(`access_token:${token}`, user.userId)
  redis.expire(`access_token:${token}`, TOKEN_EXPIRE_TIME)
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
  await redis.del(`access_token:${token}`, token)
  ctx.body = 'ok'
}

router.post('/login', login)
router.delete('/logout', logout)

module.exports = router
