'use strict'

const config = require('config')
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const koaBunyanLogger = require('koa-bunyan-logger')

const indexRoutes = require('./routes/index')
const breedRoutes = require('./routes/breeds')

// Custom middleware
const { notFoundMiddleware } = require('./middleware/not-found-handler')
const { errorMiddleware } = require('./middleware/error-handler')

// Utils
const log = require('./utils/log')

// Config
const PORT = config.get('port')

const server = new Koa()

// Middleware
server.use(cors())
server.use(helmet())
server.use(bodyParser())
server.use(koaBunyanLogger())
server.use(koaBunyanLogger.requestIdContext())
server.use(koaBunyanLogger.requestLogger())

// Routing
server.use(indexRoutes.routes())
server.use(breedRoutes.routes())

// Custom Middleware
server.use(notFoundMiddleware())
server.use(errorMiddleware((err, req) => req.log.error(err, 'Request Error')))

module.exports = server.listen(PORT)
  .on('listening', () => log.info(`Server listening on port ${PORT}`))
  .on('error', err => log.error(err, `Error starting server`))
