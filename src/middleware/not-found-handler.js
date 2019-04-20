'use strict'

const { STATUS_CODES } = require('http')

/**
 * Extends the Error class with a custom NotFoundError
 */
class NotFoundError extends Error {
  constructor () {
    super(STATUS_CODES['404'])
    Error.captureStackTrace(this, this.constructor)
    this.code = 'NOT_FOUND'
    this.status = 404
  }
}

/**
 * Creates a NotFound error handling middleware
 */
function notFoundHandlerFactory () {
  return function notFoundHandler (_req, _res, next) {
    next(new NotFoundError())
  }
}

exports.notFoundMiddleware = notFoundHandlerFactory
exports.NotFoundError = NotFoundError
