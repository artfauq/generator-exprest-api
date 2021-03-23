const Generator = require('yeoman-generator');
const { gray, red, yellow } = require('chalk').default;
const yosay = require('yosay');
const path = require('path');
const validate = require('validate-npm-package-name');

const SEQUELIZE_DIALECT = require('./utils/sequelize-dialect-enum');

module.exports = class extends Generator {
  async prompting() {
    this.log(yosay(`Welcome to the ${red('REST API')} generator!`));

    this.answers = await this.prompt([
      {
        store: true,
        type: 'input',
        name: 'shortname',
        message: `Package ${yellow('shortname')} [ex: ${gray('rest-api')}]`,
        validate: input =>
          (validate(input).validForNewPackages && new RegExp(/^[a-zA-Z0-9_-]*$/).test(input)) ||
          'Must be a valid package name',
      },
      {
        store: true,
        type: 'input',
        name: 'name',
        message: `App ${yellow('(pretty) name')} [ex: ${gray('My REST API')}]`,
        validate: input => input.trim() !== '',
      },
      {
        store: true,
        type: 'input',
        name: 'description',
        message: `App ${yellow('description')} [ex: ${gray('A REST API for cats and dogs')}]`,
        validate: input => input.trim() !== '',
      },
      //
      // ─── SEQUELIZE ───────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'sequelize',
        message: `Use ${yellow.bold('Sequelize')} as ORM ?`,
        default: true,
      },
      {
        store: true,
        type: 'list',
        name: 'sequelizeDialect',
        message: `What is your ${yellow.bold('database dialect')} ?`,
        choices: Object.values(SEQUELIZE_DIALECT),
        when: ({ sequelize }) => !!sequelize,
      },
      //
      // ─── REDIS ───────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'redis',
        message: `Use ${yellow.bold('Redis')} for caching ?`,
        default: true,
      },
      //
      // ─── SOCKETIO ────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'socketIo',
        message: `Use ${yellow.bold('Socket.IO')} for real-time events ?`,
        default: true,
      },
      //
      // ─── I18N ────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'i18n',
        message: `Use ${yellow.bold('i18next')} for internationalization ?`,
        default: true,
      },
      //
      // ─── WINSTON ─────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'winston',
        message: `Use ${yellow.bold('Winston')} for logging ?`,
        default: true,
      },
      //
      // ─── CELEBRATE ───────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'celebrate',
        message: `Use ${yellow.bold('celebrate')} and ${yellow.bold(
          'Joi'
        )} for object validation ?`,
        default: true,
      },
      //
      // ─── JWT ─────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'jwt',
        message: `Use ${yellow.bold('JWT')} for user authentication ?`,
        default: true,
      },
      //
      // ─── NODEMAILER ──────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'nodemailer',
        message: `Use ${yellow.bold('Nodemailer')} to send emails ?`,
        default: true,
      },
      //
      // ─── CRON ────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'cron',
        message: `Use ${yellow.bold('node-schedule')} to handle cron jobs ?`,
        default: true,
      },
      //
      // ─── ESLINT ──────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'eslint',
        message: `Use ${yellow.bold('ESLint')} for code linting ?`,
        default: true,
      },
      //
      // ─── PRETTIER ────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'prettier',
        message: `Use ${yellow.bold('Prettier')} for code formatting ?`,
        default: true,
      },
      //
      // ─── MOCHA ───────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'mocha',
        message: `Use ${yellow.bold('Mocha')} and ${yellow.bold('Chai')} for testing ?`,
        default: true,
      },
      //
      // ─── SENTRY ──────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'sentry',
        message: `Use ${yellow.bold('Sentry')} for error tracking ?`,
        default: true,
      },
      //
      // ─── DOCKER ──────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'docker',
        message: `Generate ${yellow('Docker')} related files ?`,
        default: true,
      },
      //
      // ─── OPENAPI ─────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'openapi',
        message: `Generate an ${yellow.bold('OpenAPI')} documentation file ?`,
        default: true,
      },
    ]);
  }

  writing() {
    const { answers } = this;
    const { shortname } = answers;
    const src = this.templatePath.bind(this);
    const dest = to => this.destinationPath.bind(this)(`${shortname}/${to}`);
    const copy = (from, data) =>
      this.fs.copyTpl.bind(this.fs)(src(from), dest(from.replace('.ejs', '')), data || answers);

    this.packages = {
      dependencies: [
        '@kazaar/express-error-handler@3',
        'body-parser@1',
        'compression@1',
        'convict@5',
        'cors@2',
        'dotenv@8',
        'express@4',
        'express-promise-router@3',
        'express-rate-limit@5',
        'express-status-monitor@1',
        'helmet@4',
        'http-errors@1',
        'moment@2',
        'moment-timezone@0.5',
        'morgan@1',
        'reflect-metadata@0',
        'serve-favicon@2',
        'typedi@0',
      ],
      devDependencies: [
        '@types/compression@1',
        '@types/convict@4',
        '@types/cors@2',
        '@types/express@4',
        '@types/express-rate-limit@5',
        '@types/express-status-monitor@1',
        '@types/http-errors@1',
        '@types/morgan@1',
        '@types/node@12',
        '@types/serve-favicon@2',
        'cpx@1',
        'cross-env@7',
        'husky@4',
        'lint-staged@10',
        'npm-run-all@4',
        'rimraf@3',
        'ts-node@8',
        'tsc-watch@4',
        'typescript@4',
      ],
    };

    const dialect = Object.values(SEQUELIZE_DIALECT).find(
      d => d.value === answers.sequelizeDialect
    );

    answers.auth = !!answers.sequelize && !!answers.jwt;
    answers.description = JSON.stringify(answers.description);
    answers.dialect = dialect;

    copy('.editorconfig.ejs');
    copy('.gitattributes.ejs');
    copy('src/dto/index.ts.ejs');
    copy('src/config/index.ts.ejs');
    copy('src/config/logger.ts.ejs');
    copy('src/loaders/index.ts.ejs');
    copy('src/middlewares/error-logger.ts.ejs');
    copy('src/middlewares/index.ts.ejs');
    copy('src/public/favicon.ico');
    copy('src/routes/index.ts.ejs');
    copy('src/services/index.ts.ejs');
    copy('src/types/enums/index.ts.ejs');
    copy('src/types/index.d.ts.ejs');
    copy('src/types/index.ts.ejs');
    copy('src/index.ts.ejs');
    copy('src/server.ts.ejs');
    copy('.env.ejs');
    copy('.env.example.ejs');
    copy('.gitignore.ejs');
    copy('.huskyrc.json.ejs');
    copy('ABOUT.md.ejs');
    copy('README.md.ejs');
    copy('package.json.ejs');
    copy('tsconfig.json.ejs');
    copy('tsconfig.build.json.ejs');

    //
    // ─── SEQUELIZE ───────────────────────────────────────────────────
    //

    if (answers.sequelize) {
      this.packages.dependencies.push(
        'bcryptjs@2',
        'sequelize@5',
        'sequelize-cli@5',
        'sequelize-typescript@1',
        ...dialect.packages
      );
      this.packages.devDependencies.push('@types/bcryptjs@2', '@types/bluebird@3');

      copy('db/migrations/1-init.js.ejs');
      copy('db/seeders/empty');
      copy('db/database.js.ejs');
      copy('src/models/index.ts.ejs');
      copy('src/models/user.ts.ejs');
      copy('src/loaders/sequelize.ts.ejs');
      copy('.sequelizerc.ejs');
    }

    //
    // ─── REDIS ───────────────────────────────────────────────────────
    //

    if (answers.redis) {
      this.packages.dependencies.push('redis@3');
      this.packages.devDependencies.push('@types/redis@2');

      copy('src/loaders/redis.ts.ejs');
    }

    //
    // ─── SOCKETIO ────────────────────────────────────────────────────
    //

    if (answers.socketIo) {
      this.packages.dependencies.push(
        '@ssnxd/socketio-jwt@4',
        'socket.io@2',
        'socket.io-client@2.3'
      );
      this.packages.devDependencies.push('@types/socket.io@2', '@types/socket.io-client@1');

      copy('src/loaders/socket-io.ts.ejs');
    }

    //
    // ─── I18N ────────────────────────────────────────────────────────
    //

    if (answers.i18n) {
      this.packages.dependencies.push('i18next@19', 'i18next-http-middleware@3');

      copy('src/locale/en.json.ejs');
      copy('src/locale/fr.json.ejs');
      copy('src/locale/index.ts.ejs');
      copy('src/loaders/i18n.ts.ejs');
    }

    //
    // ─── WINSTON ─────────────────────────────────────────────────────
    //

    if (answers.winston) {
      this.packages.dependencies.push('winston@3');

      copy('src/config/logger.ts.ejs');
    }

    //
    // ─── CELEBRATE ───────────────────────────────────────────────────
    //

    if (answers.celebrate) {
      this.packages.dependencies.push('@hapi/joi@15', 'celebrate@10');
      this.packages.devDependencies.push('@types/hapi__joi@15');

      copy('src/middlewares/validation.ts.ejs');
    }

    //
    // ─── JWT ─────────────────────────────────────────────────────────
    //

    if (answers.jwt) {
      this.packages.dependencies.push('jsonwebtoken@8', 'express-jwt@6', 'uuid@8');
      this.packages.devDependencies.push(
        '@types/express-jwt@0',
        '@types/jsonwebtoken@8',
        '@types/uuid@8'
      );

      copy('src/utils/jwt.ts.ejs');
      copy('src/middlewares/jwt.ts.ejs');
      copy('src/types/jwt.ts.ejs');
    }

    //
    // ─── NODEMAILER ──────────────────────────────────────────────────
    //

    if (answers.nodemailer) {
      this.packages.dependencies.push('nodemailer@6');
      this.packages.devDependencies.push('@types/nodemailer@6');

      copy('src/loaders/mailer.ts.ejs');
      copy('src/services/email.ts.ejs');
    }

    //
    // ─── CRON ────────────────────────────────────────────────────────
    //

    if (answers.cron) {
      this.packages.dependencies.push('node-schedule@1', '@types/node-schedule@1');

      copy('src/jobs/index.ts.ejs');
      copy('src/loaders/job-scheduler.ts.ejs');
    }

    //
    // ─── ESLINT ──────────────────────────────────────────────────────
    //

    if (answers.eslint) {
      this.packages.devDependencies.push(
        '@typescript-eslint/eslint-plugin@4',
        '@typescript-eslint/parser@4',
        'eslint@7',
        'eslint-config-airbnb-typescript@11',
        'eslint-import-resolver-typescript@2',
        'eslint-plugin-import@2',
        'eslint-plugin-node@8',
        'eslint-plugin-promise@4'
      );

      copy('.eslintrc.json.ejs');
      copy('.eslintignore.ejs');
    }

    //
    // ─── PRETTIER ────────────────────────────────────────────────────
    //

    if (answers.prettier) {
      this.packages.devDependencies.push(
        'eslint-config-prettier@6',
        'eslint-plugin-prettier@3',
        'prettier@2'
      );

      copy('.prettierrc.ejs');
      copy('.prettierignore.ejs');
    }

    //
    // ─── MOCHA ───────────────────────────────────────────────────────
    //

    if (answers.mocha) {
      this.packages.devDependencies.push(
        '@types/sinon@9',
        '@types/chai@4',
        '@types/mocha@8',
        '@types/supertest@2',
        'chai@4',
        'mocha@7',
        'nyc@15',
        'sinon@9',
        'supertest@4',
        'eslint-plugin-chai-expect@2'
      );

      copy('.mocharc.json.ejs');
      copy('.nycrc.ejs');
      copy('.env.test.ejs');
      copy('test/helpers/stubs/index.ts.ejs');
      copy('test/helpers/http-responses.ts.ejs');
      copy('test/helpers/index.ts.ejs');
      copy('test/integration/404.test.ts.ejs');
      copy('test/integration/health.test.ts.ejs');
      copy('test/setup.ts.ejs');

      if (answers.sequelize) {
        copy('test/helpers/truncate.ts.ejs');
      }

      if (answers.redis) {
        this.packages.devDependencies.push('redis-mock@0', '@types/redis-mock@0');

        copy('test/helpers/stubs/redis.ts.ejs');
      }

      if (answers.nodemailer) {
        copy('test/helpers/stubs/mailer.ts.ejs');
        copy('test/unit/mailer.test.ts.ejs');
      }

      if (answers.sentry) {
        copy('test/integration/sentry.test.ts.ejs');
      }

      if (answers.docker) {
        copy('docker-compose.test.yml.ejs');
      }

      if (answers.auth) {
        copy('test/integration/api/auth/post.login.test.ts.ejs');
      }
    }

    //
    // ─── SENTRY ──────────────────────────────────────────────────────
    //

    if (answers.sentry) {
      this.packages.dependencies.push('@sentry/node@5', '@sentry/tracing@5');

      copy('src/config/sentry.ts.ejs');

      if (answers.winston) {
        this.packages.dependencies.push('winston-transport-sentry-node@0.7');
      }
    }

    //
    // ─── DOCKER ──────────────────────────────────────────────────────
    //

    if (answers.docker) {
      copy('docker/nginx/nginx.tmpl.ejs');
      copy('docker/node/Dockerfile.ejs');
      copy('docker/start.sh.ejs');
      copy('docker-compose.yml.ejs');
      copy('docker-compose.dev.yml.ejs');
      copy('docker-compose.prod.yml.ejs');
      copy('.dockerignore.ejs');

      if (answers.sequelize) {
        copy('docker/db/Dockerfile.ejs');
        copy('docker/db/my.cnf.ejs');
      }
    }

    //
    // ─── OPENAPI ─────────────────────────────────────────────────────
    //

    if (answers.openapi) {
      copy('src/public/doc/index.html.ejs');
      copy('src/public/doc/openapi.yml.ejs');
    }

    //
    // ─── AUTH ────────────────────────────────────────────────────────
    //

    if (answers.auth) {
      copy('src/routes/auth.ts.ejs');
      copy('src/services/auth.ts.ejs');
      copy('src/types/auth.ts.ejs');
    }

    //
    // ─── CHECK FOR EMPTY DIRECTORIES NOT COPIED ──────────────────────
    //

    if (!answers.jwt) {
      copy('src/utils/empty');
    }

    if (answers.mocha && !answers.nodemailer) {
      copy('test/unit/empty');
    }

    if (answers.mocha && !answers.auth) {
      copy('test/integration/api/empty');
    }
  }

  install() {
    const appDir = path.join(process.cwd(), this.answers.shortname);

    process.chdir(appDir);

    this.installDependencies({ bower: false, npm: true }).then(() => {
      this.spawnCommandSync('npm', ['i', '--save', ...this.packages.dependencies]);
      this.spawnCommandSync('npm', ['i', '--save-dev', ...this.packages.devDependencies]);
      this.spawnCommandSync('npm', [
        'run',
        this.answers.eslint || this.answers.prettier ? 'lint:fix' : 'lint',
      ]);
    });
  }

  end() {
    this.log(yosay('All done !'));
  }
};
