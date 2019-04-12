const bodyParser = require('body-parser');
const chalk = require('chalk').default;
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('@kazaar/express-error-handler');

const logger = require('./config/winston');
const router = require('./routes');
const { onServerError } = require('./utils/error');

//
// ─── EXPRESS SERVER CREATION ────────────────────────────────────────────────────
//
const app = express();

//
// ─── EXPRESS CONFIGURATION ──────────────────────────────────────────────────────
//
app.use(
  morgan('dev', {
    stream: {
      write: message => logger.info(message),
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

//
// ─── API DOCUMENTATION ──────────────────────────────────────────────────────────
//
app.use('/api-docs', express.static(`${__dirname}/docs`));

//
// ─── SERVER ROUTES ──────────────────────────────────────────────────────────────
//
app.use(router);

//
// ─── GLOBAL ERROR HANDLING ──────────────────────────────────────────────────────
//
app.use(errorHandler(logger));

//
// ─── SERVER START ───────────────────────────────────────────────────────────────
//
const port = 8080;

app
  .listen(port, () =>
    logger.info(
      `${chalk.green('✓')} App is running on port ${chalk.yellow(`${port}`)} in ${chalk.yellow(app.get('env'))} mode`
    )
  )
  .on('error', onServerError);
