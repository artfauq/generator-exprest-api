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
 *        id: Joi
 *          .number()
 *          .integer()
 *          .positive()
 *          .required(),
 *        // OR use custom validation schema defined in validation.js
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
