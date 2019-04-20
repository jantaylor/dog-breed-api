'use strict'

const { STATUS_CODES } = require('http')

class NotFoundError extends Error {
  constructor () {
    super(STATUS_CODES['404'])
    Error.captureStackTrace(this, this.constructor)
    this.code = 'NOT_FOUND'
    this.status = 404
  }
}

/**
 * Create a NotFound error handling middleware
 */
function notFoundHandlerFactory () {
  return function notFoundHandler (req, res, next) {
    next(new NotFoundError())
  }
}

exports.notFoundMiddleware = notFoundHandlerFactory
exports.NotFoundError = NotFoundError
