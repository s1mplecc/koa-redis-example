const Koa = require('koa')
const router = require('koa-router')()
const mongo = require('koa-mongo')

const app = new Koa()

app.use(mongo({
  uri: 'mongodb://bigdata:bigdata_123@172.20.10.126/bigdata',
  max: 100,
  min: 1
}))
app.use(router.routes())

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/', async (ctx, next) => {
  console.log('ctx', ctx)
  const collection = ctx.mongo.collection('bi_report');
  ctx.body = await collection.findOne({});
})

app.listen('3001')