'use strict'

/**
 * A function to clean up the error to be ready for user viewing. It should be
 * stripped of all stack traces and indication of which libraries are being
 * used. It should return an object and not an error. This should not modify the
 * original error.
 * @param {Error} err - The error to clean up
 * @returns {Object} { message: err.message } - An object with the error message
 */
function cleanError (err) {
  return {
    message: err.message
  }
}

/**
 * Create an error handling middleware
 * @param {Function} logError - A function to call that is responsible for logging the error.
 * @default {Function} () => {} - A blank function
 */
function errorHandlerFactory (logError = () => {}) {
  return function errorHandler (err, req, res, _next) {
    logError(err, req)
    const error = cleanError(err)
    res.status(error.status || err.status || err.statusCode || 500)
    res.format({
      'text/plain': () => res.send(error.message),
      'application/json': () => res.json(error)
    })
  }
}

exports.errorMiddleware = errorHandlerFactory
