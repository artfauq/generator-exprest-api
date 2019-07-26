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
  next(new NotFound(`The requested route '${req.method} ${req.url}' does not exist.`));
});

module.exports = router;
