const router = require('koa-router')()
const db = require('../config/mongo')
const UUID = require('uuid-js')
const bcrypt = require('bcryptjs')
const md5 = require('blueimp-md5')
const _ = require('lodash')

const extractUserIdFromCtx = require('./public/extractUserIdFromCtx')

const saltRounds = 10

/**
 * Create User, Contain username, userId, email,
 * salt generate by bcrypt & password encrypted
 *
 * @Code {String} username
 * @Code {String} plainPassword -> md5 -> bcrypt
 * @Code {String} email
 */
const createUser = async (ctx) => {
  const plainUser = ctx.request.body
  const userId = UUID.create().toString()
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashPassword = bcrypt.hashSync(md5(plainUser.plainPassword), salt)
  const user = _.omit({
    ...plainUser,
    userId,
    password: hashPassword,
    salt
  }, 'plainPassword')
  db.user.save(user)
  ctx.body = user
}

/**
 * Update user password, Contain password, newPassword, they are md5 encrypted.
 */
const updateUserPassword = async (ctx) => {
  const { password, newPassword } = ctx.request.body
  const userId = extractUserIdFromCtx(ctx)
  const user = await db.user.findOne({ userId })
  ctx.assert(bcrypt.compareSync(password, user.password), '401', 'Incorrect password!')
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashPassword = bcrypt.hashSync(newPassword, salt)
  ctx.body = await db.user.findOneAndUpdate(
    { userId },
    { $set: { password: hashPassword, salt } }
  )
}

router.post('/user/create', createUser)
router.post('/user/password', updateUserPassword)

module.exports = router
