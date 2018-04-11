const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const onError = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const mongo = require('./config/mongo')

const controllers = require('./controllers')

// error handler
onError(app)

// middlewares
app.use(cors())
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// connect to mongoDB
app.init = async () => {
  await mongo.connect()
}
app.init()

// controllers
controllers.forEach((controller) => {
  app.use(controller.routes(), controller.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
