const log = require('../utils/log')
const Router = require('koa-router')
const queries = require('../db/queries/breeds')

const router = new Router()
const BASE_URL = `/api/v1/breed`

// Router to get all breeds
router.get(BASE_URL, async (ctx) => {
  try {
    const breeds = await queries.getAllBreeds()
    ctx.body = {
      status: 'success',
      data: breeds
    }
  } catch (err) {
    log.error(err)
  }
})

// Router to get one breed based on id and error if it doesn't exist
router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const breed = await queries.getSingleBreed(ctx.params.id)
    if (breed.length) {
      ctx.body = {
        status: 'success',
        data: breed
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That breed does not exist.'
      }
    }
  } catch (err) {
    log.error(err)
  }
})

// Router to add a breed to the database
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const breed = await queries.addBreed(ctx.request.body)
    if (breed.length) {
      ctx.status = 201
      ctx.body = {
        status: 'success',
        data: breed
      }
    } else {
      ctx.status = 400
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      }
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
    log.error(err)
  }
})

// Route to update a breed by it's passed in id in url
router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const breed = await queries.updateBreed(ctx.params.id, ctx.request.body)
    if (breed.length) {
      ctx.status = 200
      ctx.body = {
        status: 'success',
        data: breed
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That breed does not exist.'
      }
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
    log.error(err)
  }
})

// route to delete breed in the database
router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const breed = await queries.deleteBreed(ctx.params.id)
    if (breed.length) {
      ctx.status = 200
      ctx.body = {
        status: 'success',
        data: breed
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That breed does not exist.'
      }
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
    log.error(err)
  }
})

module.exports = router
