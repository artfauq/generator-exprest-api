const Generator = require('yeoman-generator');
const { gray, red, yellow } = require('chalk').default;
const yosay = require('yosay');
const { join } = require('path');
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
          (validate(input).validForNewPackages && /^[a-zA-Z0-9_-]*$/.test(input)) ||
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
      // ─── PRE-COMMIT HOOK ─────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'hook',
        message: `Configure a ${yellow.bold('pre-commit linting hook')} ?`,
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
      // ─── ADMIN-BRO ───────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'admin',
        message: `Use ${yellow.bold('AdminBro')} to generate an admin panel ?`,
        default: true,
        when: ({ sequelize }) => !!sequelize,
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
      //
      // ─── MONITORING ──────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'monitoring',
        message: `Generate a ${yellow.bold('status monitoring')} route ?`,
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
        'body-parser@^1.19.1',
        'compression@^1.7.4',
        'convict@^5.2.1',
        'cors@^2.8.5',
        'dotenv@^8.6.0',
        'express@^4.17.1',
        'express-promise-router@^3.0.3',
        'express-rate-limit@^5.5.1',
        'helmet@^4.6.0',
        'http-errors@^1.8.1',
        'moment@^2.29.1',
        'morgan@^1.10.0',
        'reflect-metadata@^0.1.13',
        'serve-favicon@^2.5.0',
        'typedi@^0.10.0',
      ],
      devDependencies: [
        '@types/compression@^1.7.2',
        '@types/convict@^5.2.1',
        '@types/cors@^2.8.12',
        '@types/express@^4.17.13',
        '@types/express-rate-limit@^5.1.3',
        '@types/http-errors@^1',
        '@types/morgan@^1.9.3',
        '@types/node@^12.12.9',
        '@types/serve-favicon@^2.5.0',
        'cpx@^1.5.0',
        'cross-env@^7.0.3',
        'npm-run-all@^4.1.5',
        'rimraf@^3.0.2',
        'ts-node@^8.10.2',
        'tsc-watch@^4.6.0',
        'typescript@^4.4.4',
      ],
    };

    const dialect = Object.values(SEQUELIZE_DIALECT).find(
      d => d.value === answers.sequelizeDialect
    );

    answers.admin = !!answers.admin;
    answers.auth = !!answers.sequelize && !!answers.jwt;
    answers.dialect = dialect;
    answers.stubs = answers.nodemailer || answers.redis;

    copy('.editorconfig.ejs');
    copy('.gitattributes.ejs');
    copy('src/dto/index.ts.ejs');
    copy('src/config/index.ts.ejs');
    copy('src/config/logger.ts.ejs');
    copy('src/loaders/index.ts.ejs');
    copy('src/middlewares/error-handler.ts.ejs');
    copy('src/middlewares/index.ts.ejs');
    copy('public/favicon.ico');
    copy('src/controllers/index.ts.ejs');
    copy('src/services/index.ts.ejs');
    copy('src/types/enums/index.ts.ejs');
    copy('src/types/index.d.ts.ejs');
    copy('src/types/index.ts.ejs');
    copy('src/index.ts.ejs');
    copy('src/server.ts.ejs');
    copy('.env.example.ejs');
    copy('.gitignore.ejs');
    copy('ABOUT.md.ejs');
    copy('README.md.ejs');
    copy('package.json.ejs', { ...answers, description: answers.description.replace('"', '\\"') });
    copy('tsconfig.json.ejs');
    copy('tsconfig.build.json.ejs');

    //
    // ─── SEQUELIZE ───────────────────────────────────────────────────
    //

    if (answers.sequelize) {
      this.packages.dependencies.push(
        'bcryptjs@^2.4.3',
        'sequelize@^5.22.5',
        'sequelize-cli@^5.5.1',
        'sequelize-typescript@^1.1.0',
        ...dialect.packages
      );
      this.packages.devDependencies.push('@types/bcryptjs@^2.4.2', '@types/bluebird@^3.5.36');

      copy('db/migrations/1-init.js.ejs');
      copy('db/seeders/empty');
      copy('db/config.js.ejs');
      copy('src/models/index.ts.ejs');
      copy('src/models/user.ts.ejs');
      copy('src/loaders/sequelize.ts.ejs');
      copy('.sequelizerc.ejs');
    }

    //
    // ─── REDIS ───────────────────────────────────────────────────────
    //

    if (answers.redis) {
      this.packages.dependencies.push('redis@^3.1.2');
      this.packages.devDependencies.push('@types/redis@^2.8.32');

      copy('src/loaders/redis.ts.ejs');
    }

    //
    // ─── SOCKETIO ────────────────────────────────────────────────────
    //

    if (answers.socketIo) {
      this.packages.dependencies.push(
        '@ssnxd/socketio-jwt@^4.5.3',
        'socket.io@^2.4.1',
        'socket.io-client@^2.3.0'
      );
      this.packages.devDependencies.push(
        '@types/socket.io@^2.1.13',
        '@types/socket.io-client@^1.4.36'
      );

      copy('src/loaders/socket-io.ts.ejs');
    }

    //
    // ─── I18N ────────────────────────────────────────────────────────
    //

    if (answers.i18n) {
      this.packages.dependencies.push('i18next@^19.9.2', 'i18next-http-middleware@^3.2.0');

      copy('src/locale/en.json.ejs');
      copy('src/locale/index.ts.ejs');
      copy('src/loaders/i18n.ts.ejs');
    }

    //
    // ─── WINSTON ─────────────────────────────────────────────────────
    //

    if (answers.winston) {
      this.packages.dependencies.push('winston@^3.6.0');

      copy('src/config/logger.ts.ejs');
    }

    //
    // ─── CELEBRATE ───────────────────────────────────────────────────
    //

    if (answers.celebrate) {
      this.packages.dependencies.push('@hapi/joi@^15.1.1', 'celebrate@^10.1.0');
      this.packages.devDependencies.push('@types/hapi__joi@^15.0.4');

      copy('src/middlewares/validation.ts.ejs');
    }

    //
    // ─── JWT ─────────────────────────────────────────────────────────
    //

    if (answers.jwt) {
      this.packages.dependencies.push('jsonwebtoken@^8.5.1', 'express-jwt@^6.1.0', 'uuid@^8.3.2');
      this.packages.devDependencies.push(
        '@types/express-jwt@^0.0.42',
        '@types/jsonwebtoken@^8.5.8',
        '@types/uuid@^8.3.4'
      );

      copy('src/utils/jwt.ts.ejs');
      copy('src/middlewares/jwt.ts.ejs');
      copy('src/types/jwt.ts.ejs');
    }

    //
    // ─── NODEMAILER ──────────────────────────────────────────────────
    //

    if (answers.nodemailer) {
      this.packages.dependencies.push('nodemailer@^6.7.2');
      this.packages.devDependencies.push('@types/nodemailer@^6.4.4');

      copy('src/loaders/mailer.ts.ejs');
      copy('src/services/email.ts.ejs');
    }

    //
    // ─── CRON ────────────────────────────────────────────────────────
    //

    if (answers.cron) {
      this.packages.dependencies.push('node-schedule@^1.3.3');
      this.packages.devDependencies.push('@types/node-schedule@^1.3.2');

      copy('src/jobs/index.ts.ejs');
      copy('src/loaders/job-scheduler.ts.ejs');
    }

    //
    // ─── ESLINT ──────────────────────────────────────────────────────
    //

    if (answers.eslint) {
      this.packages.devDependencies.push(
        '@typescript-eslint/eslint-plugin@^4.33.0',
        '@typescript-eslint/parser@^4.33.0',
        'eslint@^7.32.0',
        'eslint-config-airbnb-typescript@^12.3.1',
        'eslint-import-resolver-typescript@^2.5.0',
        'eslint-plugin-import@^2.22.1',
        'eslint-plugin-node@^11.1.0',
        'eslint-plugin-promise@^4.3.1',
        'eslint-plugin-unused-imports@^1.1.5'
      );

      copy('.eslintrc.json.ejs');
      copy('.eslintignore.ejs');

      if (answers.prettier) {
        this.packages.devDependencies.push(
          'eslint-config-prettier@^8',
          'eslint-plugin-prettier@^3'
        );
      }

      if (answers.admin) {
        this.packages.devDependencies.push('eslint-plugin-react@^7');
      }

      if (answers.mocha) {
        this.packages.devDependencies.push('eslint-plugin-chai-expect@^2');
      }
    }

    //
    // ─── PRETTIER ────────────────────────────────────────────────────
    //

    if (answers.prettier) {
      this.packages.devDependencies.push('prettier@^2.5.1');

      copy('.prettierrc.ejs');
      copy('.prettierignore.ejs');
    }

    //
    // ─── PRE-COMMIT HOOK ─────────────────────────────────────────────
    //

    if (answers.hook) {
      this.packages.devDependencies.push('husky@^4.3.8', 'lint-staged@^10.5.4');

      copy('.huskyrc.json.ejs');
    }

    //
    // ─── MOCHA ───────────────────────────────────────────────────────
    //

    if (answers.mocha) {
      this.packages.devDependencies.push(
        '@types/sinon@^9.0.10',
        '@types/chai@^4.3.0',
        '@types/mocha@^8.2.3',
        '@types/supertest@^2.0.11',
        'chai@^4.3.6',
        'mocha@^8.4.0',
        'nyc@^15',
        'sinon@^9.2.4',
        'supertest@^4.0.2'
      );

      copy('.mocharc.js.ejs');
      copy('.nycrc.json.ejs');
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
        this.packages.devDependencies.push('redis-mock@^0.56.3', '@types/redis-mock@^0.17.0');

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
      this.packages.dependencies.push('@sentry/node@^5.30.0', '@sentry/tracing@^5.30.0');

      if (answers.winston) {
        this.packages.dependencies.push('winston-transport-sentry-node@^2.3.0');
      }
    }

    //
    // ─── ADMIN-BRO ───────────────────────────────────────────────────
    //

    if (answers.admin) {
      this.packages.dependencies.push(
        '@admin-bro/design-system@^1.7.3',
        '@admin-bro/express@^3.1.0',
        '@admin-bro/sequelize@^1.2.1',
        'admin-bro@^3.4.0',
        'express-formidable@^1.2.0',
        'express-session@^1.17.2',
        'tslib@^2.3.1'
      );

      this.packages.devDependencies.push('@types/express-session@^1.17.4');

      copy('src/admin/components/empty');
      copy('src/admin/locale/en.ts.ejs');
      copy('src/admin/locale/index.ts.ejs');
      copy('src/admin/resources/index.ts.ejs');
      copy('src/admin/resources/user.ts.ejs');
      copy('src/admin/index.ts.ejs');
      copy('src/loaders/admin-bro.ts.ejs');
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
    }

    //
    // ─── OPENAPI ─────────────────────────────────────────────────────
    //

    if (answers.openapi) {
      copy('public/doc/index.html.ejs');
      copy('public/doc/openapi.yml.ejs');
    }

    //
    // ─── MONITORING ──────────────────────────────────────────────────
    //

    if (answers.monitoring) {
      this.packages.dependencies.push('express-status-monitor@^1.3.3');
      this.packages.devDependencies.push('@types/express-status-monitor@^1.2.4');
    }

    //
    // ─── AUTH ────────────────────────────────────────────────────────
    //

    if (answers.auth) {
      copy('src/controllers/auth.ts.ejs');
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
    const appDir = join(process.cwd(), this.answers.shortname);

    process.chdir(appDir);

    this.spawnCommandSync('yarn', ['add', ...this.packages.dependencies]);
    this.spawnCommandSync('yarn', ['add', '-D', ...this.packages.devDependencies]);

    if (this.answers.eslint || this.answers.prettier) {
      this.spawnCommandSync('yarn', ['lint:fix']);
    }
  }

  end() {
    this.log(yosay('All done !'));
  }
};
