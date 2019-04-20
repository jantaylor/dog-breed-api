const Router = require('koa-router')
const router = new Router()

router.get('/hc', async ctx => {
  ctx.status = 204
}
)
module.exports = router
