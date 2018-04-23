const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')

const controllers = require('./controllers')

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json({}))
app.use(logger())

// controllers
controllers.forEach((controller) => {
  app.use(controller.routes(), controller.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
