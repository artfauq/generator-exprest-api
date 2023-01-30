const Generator = require('yeoman-generator');
const { gray, red, yellow } = require('chalk').default;
const yosay = require('yosay');
const { join } = require('path');
const validate = require('validate-npm-package-name');

const SEQUELIZE_DIALECT_ENUM = require('./utils/sequelize-dialect.enum');

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
        message: `Use ${yellow('Sequelize')} as ORM ?`,
        default: true,
      },
      {
        store: true,
        type: 'list',
        name: 'sequelizeDialect',
        message: `Pick a ${yellow('database dialect')}:`,
        choices: Object.values(SEQUELIZE_DIALECT_ENUM),
        when: ({ sequelize }) => !!sequelize,
      },
      //
      // ─── JEST ────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'jest',
        message: `Use ${yellow('Jest')} for testing ?`,
        default: true,
      },
      //
      // ─── WINSTON ─────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'winston',
        message: `Use ${yellow('winston')} for logging ?`,
        default: true,
      },
      //
      // ─── MORGAN ──────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'morgan',
        message: `Use ${yellow('morgan')} for HTTP requests logging ?`,
        default: true,
      },
      //
      // ─── CELEBRATE ───────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'celebrate',
        message: `Use ${yellow('celebrate')} and ${yellow('Joi')} for object validation ?`,
        default: true,
      },
      //
      // ─── JWT ─────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'jwt',
        message: `Use ${yellow('JWT')} for user authentication ?`,
        default: true,
      },
      //
      // ─── SOCKETIO ────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'socketIo',
        message: `Use ${yellow('socket.io')} for real-time events ?`,
        default: true,
      },
      //
      // ─── REDIS ───────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'redis',
        message: `Use ${yellow('redis')} for caching ?`,
        default: true,
      },
      //
      // ─── I18N ────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'i18n',
        message: `Use ${yellow('i18next')} for internationalization ?`,
        default: true,
      },
      //
      // ─── NODEMAILER ──────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'nodemailer',
        message: `Use ${yellow('nodemailer')} to send emails ?`,
        default: true,
      },
      //
      // ─── CRON ────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'cron',
        message: `Use ${yellow('node-schedule')} to handle cron jobs ?`,
        default: true,
      },
      //
      // ─── SENTRY ──────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'sentry',
        message: `Use ${yellow('Sentry')} for error tracking ?`,
        default: true,
      },
      //
      // ─── ADMINJS ─────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'admin',
        message: `Use ${yellow('AdminJS')} to generate an admin panel ?`,
        default: true,
        when: ({ sequelize }) => !!sequelize,
      },
      //
      // ─── ESLINT ──────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'eslint',
        message: `Use ${yellow('ESLint')} for code linting ?`,
        default: true,
      },
      //
      // ─── PRETTIER ────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'prettier',
        message: `Use ${yellow('Prettier')} for code formatting ?`,
        default: true,
      },
      //
      // ─── PRE-PUSH HOOK ───────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'hook',
        message: `Configure a ${yellow('pre-push linting hook')} ?`,
        default: true,
      },
      //
      // ─── DOCKER ──────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'docker',
        message: `Generate ${yellow('Docker')} configuration ?`,
        default: true,
      },
      ///
      // ─── NGINX ───────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'nginx',
        message: `Configure ${yellow('Nginx')} reverse proxy with automatic ${yellow(
          "Let's Encrypt"
        )} SSL certificate renewal ?`,
        default: true,
        when: ({ docker }) => !!docker,
      },
      //
      // ─── OPENAPI ─────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'openapi',
        message: `Generate an ${yellow('OpenAPI')} documentation file ?`,
        default: true,
      },
      //
      // ─── MONITORING ──────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'monitoring',
        message: `Generate a ${yellow('status monitoring')} route ?`,
        default: true,
      },
      //
      // ─── GIT ─────────────────────────────────────────────────────────
      //
      {
        store: true,
        type: 'confirm',
        name: 'git',
        message: `Initialize ${yellow('Git')} repository ?`,
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

    const dialect = Object.values(SEQUELIZE_DIALECT_ENUM).find(
      d => d.value === answers.sequelizeDialect
    );

    answers.admin = !!answers.admin;
    answers.auth = !!answers.sequelize && !!answers.jwt;
    answers.dialect = dialect;
    answers.nginx = !!answers.nginx;
    answers.mocks = answers.nodemailer || answers.redis;

    copy('.editorconfig.ejs');
    copy('.gitattributes.ejs');
    copy('src/dto/index.ts.ejs');
    copy('src/config/app.config.ts.ejs');
    copy('src/config/index.ts.ejs');
    copy('src/config/logger.config.ts.ejs');
    copy('src/loaders/index.ts.ejs');
    copy('src/middlewares/error-handler.middleware.ts.ejs');
    copy('src/middlewares/index.ts.ejs');
    copy('public/favicon.ico');
    copy('src/controllers/health.controller.ts.ejs');
    copy('src/controllers/index.ts.ejs');
    copy('src/services/index.ts.ejs');
    copy('src/types/enums/index.ts.ejs');
    copy('src/types/index.d.ts.ejs');
    copy('src/types/index.ts.ejs');
    copy('src/utils/index.ts.ejs');
    copy('src/app.ts.ejs');
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
      copy('src/config/sequelize.config.ts.ejs');
      copy('src/controllers/users.controller.ts.ejs');
      copy('src/dto/user.dto.ts.ejs');
      copy('src/models/index.ts.ejs');
      copy('src/models/user.model.ts.ejs');
      copy('src/loaders/sequelize.loader.ts.ejs');
      copy('src/services/user.service.ts.ejs');
      copy('src/types/enums/user-role.enum.ts.ejs');
      copy('src/types/user.type.ts.ejs');
      copy('.sequelizerc.ejs');
    }

    //
    // ─── REDIS ───────────────────────────────────────────────────────
    //

    if (answers.redis) {
      this.packages.dependencies.push('redis@^3.1.2');
      this.packages.devDependencies.push('@types/redis@^2.8.32');

      copy('src/loaders/redis.loader.ts.ejs');
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

      copy('src/loaders/socket-io.loader.ts.ejs');
    }

    //
    // ─── I18N ────────────────────────────────────────────────────────
    //

    if (answers.i18n) {
      this.packages.dependencies.push('i18next@^19.9.2', 'i18next-http-middleware@^3.2.0');

      copy('src/locale/en.locale.json.ejs');
      copy('src/locale/index.ts.ejs');
      copy('src/loaders/i18n.loader.ts.ejs');
    }

    //
    // ─── WINSTON ─────────────────────────────────────────────────────
    //

    if (answers.winston) {
      this.packages.dependencies.push('winston@^3.6.0');
    }

    //
    // ─── MORGAN ──────────────────────────────────────────────────────
    //

    if (answers.morgan) {
      this.packages.dependencies.push('morgan@^1.10.0');
      this.packages.devDependencies.push('@types/morgan@^1.9.3');
    }

    //
    // ─── CELEBRATE ───────────────────────────────────────────────────
    //

    if (answers.celebrate) {
      this.packages.dependencies.push('@hapi/joi@^15.1.1', 'celebrate@^10.1.0');
      this.packages.devDependencies.push('@types/hapi__joi@^15.0.4');

      copy('src/middlewares/validation.middleware.ts.ejs');
    }

    //
    // ─── JWT ─────────────────────────────────────────────────────────
    //

    if (answers.jwt) {
      this.packages.dependencies.push('jsonwebtoken@^9.0.0', 'express-jwt@^6.1.0', 'uuid@^8.3.2');
      this.packages.devDependencies.push(
        '@types/express-jwt@^0.0.42',
        '@types/express-unless@^2.0.1',
        '@types/jsonwebtoken@^9.0.1',
        '@types/uuid@^8.3.4'
      );

      copy('src/utils/jwt.util.ts.ejs');
      copy('src/middlewares/jwt.middleware.ts.ejs');
      copy('src/types/jwt.type.ts.ejs');
    }

    //
    // ─── NODEMAILER ──────────────────────────────────────────────────
    //

    if (answers.nodemailer) {
      this.packages.dependencies.push('nodemailer@^6.7.2');
      this.packages.devDependencies.push('@types/nodemailer@^6.4.4');

      copy('src/loaders/mailer.loader.ts.ejs');
      copy('src/services/email.service.ts.ejs');
    }

    //
    // ─── CRON ────────────────────────────────────────────────────────
    //

    if (answers.cron) {
      this.packages.dependencies.push('node-schedule@^1.3.3');
      this.packages.devDependencies.push('@types/node-schedule@^1.3.2');

      copy('src/jobs/index.ts.ejs');
    }

    //
    // ─── ESLINT ──────────────────────────────────────────────────────
    //

    if (answers.eslint) {
      this.packages.devDependencies.push(
        '@typescript-eslint/eslint-plugin@^5.48.1',
        '@typescript-eslint/parser@^5.48.1',
        'eslint@^8.31.0',
        'eslint-config-airbnb-typescript@^17.0.0',
        'eslint-import-resolver-typescript@^3.5.2',
        'eslint-plugin-import@^2.26.0',
        'eslint-plugin-node@^11.1.0',
        'eslint-plugin-promise@^6.1.1',
        'eslint-plugin-unused-imports@^2.0.0'
      );

      copy('.eslintrc.json.ejs');
      copy('.eslintignore.ejs');

      if (answers.prettier) {
        this.packages.devDependencies.push(
          'eslint-config-prettier@^8.5.0',
          'eslint-plugin-prettier@^4.2.1'
        );
      }

      if (answers.admin) {
        this.packages.devDependencies.push('eslint-plugin-react@^7.32.0');
      }
    }

    //
    // ─── PRETTIER ────────────────────────────────────────────────────
    //

    if (answers.prettier) {
      this.packages.devDependencies.push('prettier@^2.8.2');

      copy('.prettierrc.ejs');
      copy('.prettierignore.ejs');
    }

    //
    // ─── PRE-PUSH HOOK ───────────────────────────────────────────────
    //

    if (answers.hook) {
      this.packages.devDependencies.push('husky@^4.3.8', 'lint-staged@^10.5.4');

      copy('.huskyrc.json.ejs');
    }

    //
    // ─── JEST ────────────────────────────────────────────────────────
    //

    if (answers.jest) {
      this.packages.devDependencies.push(
        '@types/jest@^29.2.6',
        '@types/supertest@^2.0.11',
        'jest@^29.3.1',
        'supertest@^4.0.2',
        'ts-jest@^29.0.5'
      );

      copy('.env.test.ejs');
      copy('jest.config.ts.ejs');
      copy('tsconfig.spec.json.ejs');
      copy('jest-e2e.config.ts.ejs');
      copy('test/mocks/index.ts.ejs');
      copy('test/utils/index.ts.ejs');
      copy('test/integration/empty');
      copy('test/api/404.test.ts.ejs');
      copy('test/api/get.health.test.ts.ejs');
      copy('test/global.setup.ts.ejs');
      copy('test/jest.setup.ts.ejs');

      if (answers.sequelize) {
        copy('test/utils/database.util.ts.ejs');
        copy('test/api/users/get.user.test.ts.ejs');
      }

      if (answers.redis) {
        this.packages.devDependencies.push('redis-mock@^0.56.3', '@types/redis-mock@^0.17.0');

        copy('test/mocks/redis.mock.ts.ejs');
      }

      if (answers.jwt) {
        copy('src/utils/__tests__/jwt.util.spec.ts.ejs');
      }

      if (answers.nodemailer) {
        copy('src/services/__tests__/email.service.spec.ts.ejs');
        copy('test/mocks/mailer.mock.ts.ejs');
      }

      if (answers.sentry) {
        copy('test/api/get.sentry-debug.test.ts.ejs');
      }

      if (answers.docker) {
        copy('docker-compose.test.yml.ejs');
      }

      if (answers.auth) {
        copy('test/api/auth/post.login.test.ts.ejs');
      }
    }

    //
    // ─── SENTRY ──────────────────────────────────────────────────────
    //

    if (answers.sentry) {
      this.packages.dependencies.push('@sentry/node@^5.30.0', '@sentry/tracing@^5.30.0');
    }

    //
    // ─── ADMIN-BRO ───────────────────────────────────────────────────
    //

    if (answers.admin) {
      this.packages.dependencies.push(
        '@adminjs/design-system@^3.1.5',
        '@adminjs/express@^5.0.1',
        '@adminjs/sequelize@^3.0.0',
        'adminjs@^6.7.4',
        'connect-session-sequelize@^7.1.5',
        'express-formidable@^1.2.0',
        'express-session@^1.17.3'
      );

      this.packages.devDependencies.push('@types/express-session@^1.17.3');

      copy('public/styles/admin.css.ejs');
      copy('src/admin/components/index.ts.ejs');
      copy('src/admin/locale/en.ts.ejs');
      copy('src/admin/locale/index.ts.ejs');
      copy('src/admin/index.ts.ejs');
      copy('src/admin/resources/index.ts.ejs');
      copy('src/admin/resources/user.resource.ts.ejs');
      copy('src/models/session.model.ts.ejs');
      copy('src/dto/admin.dto.ts.ejs');
    }

    //
    // ─── DOCKER ──────────────────────────────────────────────────────
    //

    if (answers.docker) {
      copy('docker/node/Dockerfile.ejs');
      copy('docker-compose.yml.ejs');
      copy('docker-compose.dev.yml.ejs');
      copy('docker-compose.prod.yml.ejs');
      copy('.dockerignore.ejs');

      if (answers.nginx) {
        copy('docker/nginx/nginx.tmpl.ejs');
      }
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
      copy('src/controllers/auth.controller.ts.ejs');
      copy('src/services/auth.service.ts.ejs');
      copy('src/types/auth.type.ts.ejs');
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

    if (this.answers.git) {
      this.spawnCommandSync('git', ['init', '-b', 'main']);
      this.spawnCommandSync('git', ['add', '.']);
      this.spawnCommandSync('git', ['commit', '-m', 'Initial commit']);
    }
  }

  end() {
    this.log(yosay('All done !'));
  }
};
