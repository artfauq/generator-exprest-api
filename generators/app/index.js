const Generator = require('yeoman-generator');
const { gray, red, yellow } = require('chalk').default;
const yosay = require('yosay');
const { join } = require('path');
const validate = require('validate-npm-package-name');

const LOCALE_ENUM = require('./utils/locale.enum');
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
      // ─── Locale ──────────────────────────────────────────
      {
        store: true,
        type: 'checkbox',
        name: 'supportedLocales',
        message: `Select ${yellow('supported locales')}:`,
        choices: Object.values(LOCALE_ENUM),
        validate: input => input.length >= 1,
      },
      {
        store: true,
        type: 'list',
        name: 'defaultLocale',
        message: `Pick a ${yellow('default locale')}:`,
        default: ({ supportedLocales }) =>
          supportedLocales.length > 1 ? undefined : supportedLocales[0],
        choices: ({ supportedLocales }) =>
          Object.values(LOCALE_ENUM).filter(locale => supportedLocales.includes(locale.value)),
        when: ({ supportedLocales }) => supportedLocales.length > 1,
      },
      // ─── Sequelize ───────────────────────────────────────
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
      // ─── Jest ────────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'jest',
        message: `Use ${yellow('Jest')} for testing ?`,
        default: true,
      },
      // ─── Winston ─────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'winston',
        message: `Use ${yellow('winston')} for logging ?`,
        default: true,
      },
      // ─── Morgan ──────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'morgan',
        message: `Use ${yellow('morgan')} for HTTP requests logging ?`,
        default: true,
      },
      // ─── Object validation ───────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'validation',
        message: `Use ${yellow('class-validator')} and ${yellow(
          'class-transformer'
        )} for object validation ?`,
        default: true,
      },
      // ─── JWT ─────────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'auth',
        message: `Use ${yellow('JWT')} for user authentication ?`,
        default: true,
        when: ({ sequelize }) => !!sequelize,
      },
      // ─── SocketIO ────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'socketIo',
        message: `Use ${yellow('Socket.IO')} for real-time events ?`,
        default: true,
      },
      // ─── Redis ───────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'redis',
        message: `Use ${yellow('Redis')} for caching ?`,
        default: true,
      },
      // ─── I18n ────────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'i18n',
        message: `Use ${yellow('i18next')} for internationalization ?`,
        default: true,
      },
      // ─── Nodemailer ──────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'smtp',
        message: `Use ${yellow('nodemailer')} to send emails ?`,
        default: true,
      },
      // ─── Sentry ──────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'sentry',
        message: `Use ${yellow('Sentry')} for error tracking ?`,
        default: true,
      },
      // ─── AdminJS ─────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'admin',
        message: `Use ${yellow('AdminJS')} to generate an admin panel ?`,
        default: true,
        when: ({ sequelize }) => !!sequelize,
      },
      // ─── ESlint ──────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'eslint',
        message: `Use ${yellow('ESLint')} for code linting ?`,
        default: true,
      },
      // ─── Prettier ────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'prettier',
        message: `Use ${yellow('Prettier')} for code formatting ?`,
        default: true,
      },
      // ─── Pre-commit hook ─────────────────────────────────

      {
        store: true,
        type: 'confirm',
        name: 'hook',
        message: `Configure a ${yellow('pre-commit linting hook')} ?`,
        default: true,
      },
      // ─── Docker ──────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'docker',
        message: `Generate ${yellow('Docker')} configuration ?`,
        default: true,
      },
      // ─── OpenAPI ─────────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'openapi',
        message: `Generate an ${yellow('OpenAPI')} documentation file ?`,
        default: true,
      },
      // ─── Monitoring ──────────────────────────────────────
      {
        store: true,
        type: 'confirm',
        name: 'monitoring',
        message: `Generate a ${yellow('status monitoring')} route ?`,
        default: true,
      },
      // ─── Git ─────────────────────────────────────────────
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
        'class-transformer@^0.5.1',
        'class-validator@^0.14.0',
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
        'multer@^1.4.2',
        'reflect-metadata@^0.1.13',
        'routing-controllers@^0.10.1',
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
        '@types/multer@^1.4.2',
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
    answers.auth = !!answers.auth;
    answers.defaultLocale = answers.defaultLocale || answers.supportedLocales[0];
    answers.dialect = dialect;

    copy('.editorconfig.ejs');
    copy('.gitattributes.ejs');
    copy('public/favicon.ico');
    copy('src/dto/index.ts.ejs');
    copy('src/config/app.config.ts.ejs');
    copy('src/config/index.ts.ejs');
    copy('src/decorators/index.ts.ejs');
    copy('src/decorators/trim.decorator.ts.ejs');
    copy('src/middlewares/error-handler.middleware.ts.ejs');
    copy('src/middlewares/not-found.middleware.ts.ejs');
    copy('src/middlewares/index.ts.ejs');
    copy('src/controllers/health.controller.ts.ejs');
    copy('src/controllers/index.ts.ejs');
    copy('src/services/index.ts.ejs');
    copy('src/types/enums/index.ts.ejs');
    copy('src/types/enums/time.enum.ts.ejs');
    copy('src/types/index.d.ts.ejs');
    copy('src/types/index.ts.ejs');
    copy('src/utils/index.ts.ejs');
    copy('src/utils/string.util.ts.ejs');
    copy('src/app.ts.ejs');
    copy('src/server.ts.ejs');
    copy('.env.example.ejs');
    copy('.gitignore.ejs');
    copy('ABOUT.md.ejs');
    copy('README.md.ejs');
    copy('package.json.ejs', { ...answers, description: answers.description.replace('"', '\\"') });
    copy('tsconfig.json.ejs');
    copy('tsconfig.build.json.ejs');

    // ─── Sequelize ───────────────────────────────────────────────

    if (answers.sequelize) {
      this.packages.dependencies.push(
        'bcryptjs@^2.4.3',
        'sequelize@^6.28.0',
        'sequelize-cli@^6.6.0',
        'sequelize-typescript@^2.1.5',
        ...dialect.packages
      );
      this.packages.devDependencies.push('@types/bcryptjs@^2.4.2');

      copy('db/migrations/1-init.js.ejs');
      copy('db/seeders/empty');
      copy('db/config.js.ejs');
      copy('src/config/sequelize.config.ts.ejs');
      copy('src/controllers/users.controller.ts.ejs');
      copy('src/dto/user/create-user.dto.ts.ejs');
      copy('src/dto/user/index.ts.ejs');
      copy('src/dto/user/user.dto.ts.ejs');
      copy('src/models/index.ts.ejs');
      copy('src/models/user.model.ts.ejs');
      copy('src/services/user.service.ts.ejs');
      copy('src/types/enums/user-role.enum.ts.ejs');
      copy('.sequelizerc.ejs');
    }

    // ─── Redis ───────────────────────────────────────────────────

    if (answers.redis) {
      this.packages.dependencies.push('ioredis@^5.3.1');

      copy('src/services/redis.service.ts.ejs');
    }

    // ─── SocketIO ────────────────────────────────────────────────

    if (answers.socketIo) {
      this.packages.dependencies.push('socket.io@^2.4.1', 'socket.io-client@^2.3.0');
      this.packages.devDependencies.push(
        '@types/socket.io@^2.1.13',
        '@types/socket.io-client@^1.4.36'
      );
    }

    // ─── I18n ────────────────────────────────────────────────────

    if (answers.i18n) {
      this.packages.dependencies.push('i18next@^19.9.2', 'i18next-http-middleware@^3.2.0');

      copy('src/config/i18n.config.ts.ejs');
      copy('src/locale/en.locale.json.ejs');
      copy('src/locale/fr.locale.json.ejs');
      copy('src/locale/index.ts.ejs');
    }

    // ─── Winston ─────────────────────────────────────────────────

    if (answers.winston) {
      copy('src/config/logger.config.ts.ejs');

      this.packages.dependencies.push('winston@^3.6.0');
    }

    // ─── Morgan ──────────────────────────────────────────────────

    if (answers.morgan) {
      this.packages.dependencies.push('morgan@^1.10.0');
      this.packages.devDependencies.push('@types/morgan@^1.9.3');

      copy('src/middlewares/http-request-logging.middleware.ts.ejs');
    }

    // ─── Auth ────────────────────────────────────────────────────

    if (answers.auth) {
      this.packages.dependencies.push('jsonwebtoken@^9.0.0', 'express-jwt@^6.1.0', 'uuid@^8.3.2');
      this.packages.devDependencies.push(
        '@types/express-jwt@^0.0.42',
        '@types/express-unless@^2.0.1',
        '@types/jsonwebtoken@^9.0.1',
        '@types/uuid@^8.3.4'
      );

      copy('src/decorators/protected.decorator.ts.ejs');
      copy('src/middlewares/auth.middleware.ts.ejs');
      copy('src/types/jwt.type.ts.ejs');
      copy('src/utils/jwt.util.ts.ejs');
    }

    // ─── Nodemailer ──────────────────────────────────────────────

    if (answers.smtp) {
      this.packages.dependencies.push('nodemailer@^6.7.2');
      this.packages.devDependencies.push('@types/nodemailer@^6.4.4');

      copy('src/services/email.service.ts.ejs');
    }

    // ─── ESlint ──────────────────────────────────────────────────

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

    // ─── Prettier ────────────────────────────────────────────────

    if (answers.prettier) {
      this.packages.devDependencies.push('prettier@^2.8.2');

      copy('.prettierrc.ejs');
      copy('.prettierignore.ejs');
    }

    // ─── Pre-commit hook ─────────────────────────────────────────

    if (answers.hook) {
      this.packages.devDependencies.push('husky@^8.0.0', 'lint-staged@^10.5.4');

      copy('.husky/_/.gitignore');
      copy('.husky/_/husky.sh');
      copy('.husky/pre-commit');
    }

    // ─── Jest ────────────────────────────────────────────────────

    if (answers.jest) {
      this.packages.devDependencies.push(
        '@types/jest@^29.2.6',
        '@types/supertest@^2.0.11',
        'jest@^29.3.1',
        'supertest@^4.0.2',
        'ts-jest@^29.0.5'
      );

      copy('jest.config.ts.ejs');
      copy('tsconfig.spec.json.ejs');
      copy('jest-e2e.config.ts.ejs');
      copy('test/mocks/index.ts.ejs');
      copy('test/utils/index.ts.ejs');
      copy('test/api/404/404.test.ts.ejs');
      copy('test/api/health/get.health.test.ts.ejs');
      copy('test/global.setup.ts.ejs');
      copy('test/jest.setup.ts.ejs');

      if (answers.sequelize) {
        copy('test/utils/database.util.ts.ejs');
        copy('test/api/users/get.user.test.ts.ejs');
      }

      if (answers.auth) {
        copy('src/utils/__tests__/jwt.util.spec.ts.ejs');
      }

      if (answers.smtp) {
        copy('src/services/__tests__/email.service.spec.ts.ejs');
        copy('test/mocks/mailer.mock.ts.ejs');
      }

      if (answers.docker) {
        copy('docker-compose.test.yml.ejs');
      }

      if (answers.auth) {
        copy('test/api/auth/post.login.test.ts.ejs');
      }
    }

    // ─── Sentry ──────────────────────────────────────────────────

    if (answers.sentry) {
      this.packages.dependencies.push('@sentry/node@^7.38.0', '@sentry/tracing@^7.38.0');

      copy('src/config/sentry.config.ts.ejs');
    }

    // ─── Admin ───────────────────────────────────────────────────

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
      copy('src/admin/components/index.ts.ejs');
      copy('src/admin/locale/en.ts.ejs');
      copy('src/admin/locale/fr.ts.ejs');
      copy('src/admin/locale/index.ts.ejs');
      copy('src/admin/index.ts.ejs');
      copy('src/admin/resources/index.ts.ejs');
      copy('src/admin/resources/user.resource.ts.ejs');
      copy('src/config/adminjs.config.ts.ejs');
      copy('src/dto/admin/admin.dto.ts.ejs');
      copy('src/dto/admin/index.ts.ejs');
      copy('src/services/admin.service.ts.ejs');
    }

    // ─── Docker ──────────────────────────────────────────────────

    if (answers.docker) {
      copy('Dockerfile.ejs');
      copy('docker-compose.yml.ejs');
      copy('docker-compose.dev.yml.ejs');
      copy('docker-compose.prod.yml.ejs');
      copy('.dockerignore.ejs');
    }

    // ─── OpenAPI ─────────────────────────────────────────────────

    if (answers.openapi) {
      copy('public/doc/index.html.ejs');
      copy('public/doc/openapi.yml.ejs');
    }

    // ─── Monitoring ──────────────────────────────────────────────

    if (answers.monitoring) {
      this.packages.dependencies.push('express-status-monitor@^1.3.3');
      this.packages.devDependencies.push('@types/express-status-monitor@^1.2.4');
    }

    // ─── Auth ────────────────────────────────────────────────────

    if (answers.auth) {
      copy('src/controllers/auth.controller.ts.ejs');
      copy('src/dto/auth/index.ts.ejs');
      copy('src/dto/auth/login.dto.ts.ejs');
      copy('src/services/auth.service.ts.ejs');
    }

    // ─── Git ─────────────────────────────────────────────────────

    if (answers.git) {
      copy('.github/workflows/ci.yml.ejs');
    }
  }

  install() {
    const appDir = join(process.cwd(), this.answers.shortname);

    process.chdir(appDir);

    this.spawnCommandSync('yarn', ['add', ...this.packages.dependencies]);
    this.spawnCommandSync('yarn', ['add', '-D', ...this.packages.devDependencies]);

    // if (this.answers.eslint || this.answers.prettier) {
    //   this.spawnCommandSync('yarn', ['lint:fix']);
    // }

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
