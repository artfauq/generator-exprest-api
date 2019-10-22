const jwt = require('express-jwt');

const { JWT } = require('../../config');

const { secret } = JWT;

/**
 * Express request handlers that verify if a valid token exists in request.
 *
 * The token can be passed as an `Authorization` header or a query parameter named `token`.
 *
 * Decoded payload will then be available in `req.auth`.
 *
 * @example
 *
 * // /src/api/routes/users.js
 *
 * const usersController = require('../controllers/users');
 * const { auth } = require('../middlewares');
 *
 * router.get('/users', auth.required, usersController.getUsers);
 */
module.exports = {
  required: jwt({
    secret,
    requestProperty: 'auth',
  }),
  optional: jwt({
    secret,
    requestProperty: 'auth',
    credentialsRequired: false,
  }),
};
