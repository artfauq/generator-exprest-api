const chalk = require('chalk').default;

const logger = require('../config/winston');
const { isDevelopment } = require('../config');

/**
 * Logs an error to configured outputs.
 *
 * Accepts an optional message parameter that will override any existing error message.
 *
 * @param {any} err
 * @param {string} message
 */
const logError = (err, message = '') => {
  let error = message || err.message || err;

  // Append error stack if app is in development mode
  if (isDevelopment) {
    error += `\n\n${err.stack}\n`;
  }

  logger.error(error);
};

/**
 * Event listener for server 'error' event.
 *
 * @param {any} err
 */
const onServerError = err => {
  let message = '';

  const { code, port, address } = err;

  switch (code) {
    case 'EADDRINUSE':
      message = `${chalk.red('X')} Error: port ${port} of ${address} already in use\n`;
      break;

    case 'EACCES':
      message = `${chalk.red('X')} Error: port ${port} requires elevated privileges`;
      break;

    default:
      message = err.message || `${err}`;
  }

  logError(err, message);
};

module.exports = { logError, onServerError };
