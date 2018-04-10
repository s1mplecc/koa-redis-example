const Koa = require('koa')

const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onError = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const mongo = require('./config/mongo')

const condition = require('./controllers/condition')
const treeData = require('./controllers/treeData')
const report = require('./controllers/report')
const health = require('./controllers/health')
const users = require('./controllers/users')

// error handler
onError(app)

// middlewares
app.use(cors())
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// connect to mongoDB
app.init = async () => {
  await mongo.connect()
}
app.init()

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// controllers
app.use(condition.routes(), condition.allowedMethods())
app.use(treeData.routes(), treeData.allowedMethods())
app.use(report.routes(), report.allowedMethods())
app.use(health.routes(), health.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
