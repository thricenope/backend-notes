const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello MOTO'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'Moto string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'Moto json'
  }
})

module.exports = router
