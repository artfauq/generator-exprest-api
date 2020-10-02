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
        type: 'input',
        name: 'shortname',
        message: `Package ${yellow('shortname')} [ex: ${gray('rest-api')}]`,
        validate: input =>
          (validate(input).validForNewPackages && new RegExp(/^[a-zA-Z0-9_-]*$/).test(input)) ||
          'Must be a valid package name',
      },
      {
        type: 'input',
        name: 'name',
        message: `App ${yellow('(pretty) name')} [ex: ${gray('My REST API')}]`,
        validate: input => input.trim() !== '',
      },
      {
        type: 'input',
        name: 'description',
        message: `App ${yellow('description')} [ex: ${gray('A REST API for cats and dogs')}]`,
        validate: input => input.trim() !== '',
      },
      {
        type: 'confirm',
        name: 'sequelize',
        message: `Use ${yellow.bold('Sequelize')} as ORM ?`,
        default: true,
      },
      {
        type: 'list',
        name: 'sequelizeDialect',
        message: `What is your database ${yellow.bold('dialect')} ?`,
        choices: Object.values(SEQUELIZE_DIALECT),
        when: ({ sequelize }) => {
          // Only run if user set Sequelize
          return !!sequelize;
        },
      },
      {
        type: 'confirm',
        name: 'winston',
        message: `Use ${yellow.bold('winston')} for logging ?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'celebrate',
        message: `Use ${yellow.bold('celebrate')} and ${yellow.bold('Joi')} for object validation ?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'jwt',
        message: `Use ${yellow.bold('JWT')} for user authentication ?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'nodemailer',
        message: `Use ${yellow.bold('nodemailer')} to send emails ?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'prettier',
        message: `Use ${yellow.bold('Prettier')} for code formatting ?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'mocha',
        message: `Use ${yellow.bold('Mocha')} and ${yellow.bold('Chai')} for testing ?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'docker',
        message: `Generate a ${yellow('DockerFile')} ?`,
        default: true,
      },
      {
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
    const copy = this.fs.copy.bind(this.fs);
    const copyTpl = this.fs.copyTpl.bind(this.fs);
    const src = this.templatePath.bind(this);
    const dest = path => this.destinationPath.bind(this)(`${shortname}/${path}`);

    this.packages = {
      dependencies: [
        '@kazaar/express-error-handler@2',
        'body-parser@1',
        'convict@5',
        'dotenv@8',
        'express@4',
        'express-promise-router@3',
        'helmet@3',
        'http-errors@1',
        'moment@2',
        'morgan@1',
      ],
      devDependencies: [
        'cross-env@5',
        'eslint@5',
        'eslint-config-airbnb-base@1',
        'eslint-plugin-import@2',
        'eslint-plugin-node@8',
        'eslint-plugin-promise@4',
        'husky@1',
        'lint-staged@8',
        'nodemon@1',
        'npm-run-all@4',
      ],
    };

    const dialect = Object.values(SEQUELIZE_DIALECT).find(d => d.value === answers.sequelizeDialect);

    const envName = shortname.toUpperCase().replace(/-/g, '_');

    copy(src('editorconfig'), dest('.editorconfig'));
    copy(src('gitattributes'), dest('.gitattributes'));
    copy(src('gitignore'), dest('.gitignore'));
    copy(src('nodemon'), dest('nodemon.json'));
    copy(src('huskyrc'), dest('.huskyrc.json'));

    copy(src('src/api/controllers/empty'), dest('src/api/controllers/empty'));
    copy(src('src/api/routes/empty'), dest('src/api/routes/empty'));
    copy(src('src/services/empty'), dest('src/services/empty'));

    copyTpl(src('eslintrc'), dest('.eslintrc.json'), answers);
    copyTpl(src('README'), dest('README.md'), answers);
    copyTpl(src('CONTRIBUTING'), dest('CONTRIBUTING.md'), {
      ...answers,
      sequelizeDialect: dialect ? dialect.name : '',
    });
    copyTpl(src('package'), dest('package.json'), {
      ...answers,
      description: JSON.stringify(answers.description),
    });
    copyTpl(src('env'), dest('.env'), { ...answers, name: envName });
    copyTpl(src('env.example'), dest('.env.example'), { ...answers, name: envName });
    copyTpl(src('src/index'), dest('src/index.js'), answers);
    copyTpl(src('src/config/index'), dest('src/config/index.js'), { ...answers, name: envName });
    copyTpl(src('src/api/index'), dest('src/api/index.js'), answers);

    if (answers.sequelize) {
      copy(src('.sequelizerc'), dest('.sequelizerc'));
      copy(src('src/db/models/index'), dest('src/db/models/index.js'));
      copy(src('src/db/migrations'), dest('src/db/migrations'));
      copy(src('src/db/seeders'), dest('src/db/seeders'));
      copy(src('src/config/sequelize'), dest('src/config/sequelize.js'));
      copyTpl(src('src/config/database'), dest('src/config/database.js'), {
        ...answers,
        dialect: dialect.value,
      });

      this.packages.dependencies.push('sequelize@5');
      this.packages.dependencies.push('sequelize-cli@5');
      this.packages.dependencies.push(...dialect.packages);
    }

    if (answers.winston) {
      copy(src('src/config/logger'), dest('src/config/logger.js'));

      this.packages.dependencies.push('winston@3');
    }

    if (answers.celebrate) {
      copy(src('src/api/middlewares/validation'), dest('src/api/middlewares/validation.js'));

      this.packages.dependencies.push('celebrate@10');
    }

    if (answers.jwt) {
      this.packages.dependencies.push('jsonwebtoken@8.5');
      this.packages.dependencies.push('express-jwt@5.3');
      this.packages.dependencies.push('uuid@7.0');

      copy(src('src/utils/jwt'), dest('src/utils/jwt.js'));
      copy(src('src/api/middlewares/auth'), dest('src/api/middlewares/auth.js'));
    }

    if (answers.nodemailer) {
      this.packages.dependencies.push('nodemailer@6');

      copy(src('src/config/smtp'), dest('src/config/smtp.js'));
      copyTpl(src('src/utils/mail'), dest('src/utils/mail.js'), answers);
    }

    if (answers.prettier) {
      copy(src('prettierrc'), dest('.prettierrc'));

      this.packages.devDependencies.push('eslint-config-prettier@latest');
      this.packages.devDependencies.push('eslint-plugin-prettier@latest');
      this.packages.devDependencies.push('prettier@latest');
    }

    if (answers.mocha) {
      copy(src('mocharc'), dest('.mocharc.json'));
      copy(src('nycrc'), dest('.nycrc'));
      copy(src('test/index'), dest('test/index.js'));
      copy(src('test/api/index'), dest('test/api/index.js'));
      copyTpl(src('env.test'), dest('.env.test'), { ...answers, name: envName });

      this.packages.devDependencies.push('chai@4');
      this.packages.devDependencies.push('mocha@7');
      this.packages.devDependencies.push('nyc@15');
      this.packages.devDependencies.push('supertest@4');
      this.packages.devDependencies.push('eslint-plugin-chai-expect@2');
    }

    if (answers.docker) {
      copy(src('.dockerignore'), dest('.dockerignore'));
      copyTpl(src('DockerFile'), dest('DockerFile'), answers);
    }

    if (answers.openapi) {
      copyTpl(src('src/api/doc/index.html'), dest('src/api/doc/index.html'), answers);
      copyTpl(src('src/api/doc/openapi'), dest('src/api/doc/openapi.yaml'), answers);
    }

    // Check for empty directories not copied
    if (!(answers.jwt || answers.celebrate)) {
      copy(src('src/api/middlewares/empty'), dest('src/api/middlewares/empty'));
    }

    if (!(answers.jwt || answers.nodemailer)) {
      copy(src('src/utils/empty'), dest('src/utils/empty'));
    }
  }

  install() {
    const appDir = join(process.cwd(), this.answers.shortname);

    process.chdir(appDir);

    this.installDependencies({ bower: false, npm: true }).then(() => {
      this.spawnCommandSync('npm', ['i', '--save', ...this.packages.dependencies]);
      this.spawnCommandSync('npm', ['i', '--save-dev', ...this.packages.devDependencies]);
      this.spawnCommandSync('npm', ['run', 'lint:fix']);
    });
  }

  end() {
    this.log(yosay('All done !'));
  }
};
