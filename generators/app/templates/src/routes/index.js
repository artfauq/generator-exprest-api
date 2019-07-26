const { Router } = require('express');
const { NotFound } = require('http-errors');

const router = Router();

/**
 * API routes
 */
router.get('/', (req, res) => res.redirect('/docs'));

/**
 * 404 error handling
 */
router.use((req, res, next) => {
  const err = new NotFound('This route does not exist.');

  next(err);
});

module.exports = router;
