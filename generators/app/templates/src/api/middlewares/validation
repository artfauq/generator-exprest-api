const { celebrate, Joi } = require('celebrate');

/**
 * Module that exposes `celebrate` and `Joi`, along with custom defined validation schemas.
 *
 * @example
 *
 * // /src/api/routes/users.js
 *
 * const usersController = require('../controllers/users');
 * const { celebrate, Joi, id } = require('../middlewares/validation');
 *
 * router.get(
 *    '/users/:id',
 *    celebrate({
 *      params: {
 *        // Custom validation schema defined and exported from validation.js
 *        id: id.required(),
 *      }
 *    }),
 *    usersController.getUser
 * );
 */
module.exports = {
  // Export celebrate and Joi
  celebrate,
  Joi,

  // Export custom validation schemas
};
