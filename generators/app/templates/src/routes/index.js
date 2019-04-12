const { Router } = require('express');
const { NotFound } = require('http-errors');

const router = Router();

//
// ─── API ROUTES ──────────────────────────────────────────────────────
//
router.get('/', (req, res) => res.status(200).send(<%= name %>));

//
// ─── 404 ERROR HANDLING ───────────────────────────────────────────────────────────────
//
router.use((req, res, next) => {
  const err = new NotFound('This route does not exist.');

  next(err);
});

module.exports = router;
