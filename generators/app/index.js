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
    const dest = this.destinationPath.bind(this);

    this.packages = {
      devDependencies: [],
      dependencies: [],
    };

    const dialect = Object.values(SEQUELIZE_DIALECT).find(d => d.value === answers.sequelizeDialect);

    const envName = shortname.toUpperCase().replace(/-/g, '_');

    copy(src('editorconfig'), dest(`${shortname}/.editorconfig`));
    copy(src('gitattributes'), dest(`${shortname}/.gitattributes`));
    copy(src('gitignore'), dest(`${shortname}/.gitignore`));
    copy(src('nodemon'), dest(`${shortname}/nodemon.json`));

    copy(src('src/api/controllers/empty'), dest(`${shortname}/src/api/controllers/empty`));
    copy(src('src/api/routes/empty'), dest(`${shortname}/src/api/routes/empty`));
    copy(src('src/services/empty'), dest(`${shortname}/src/services/empty`));
    copy(src('src/utils/env'), dest(`${shortname}/src/utils/env.js`));

    copyTpl(src('eslintrc'), dest(`${shortname}/.eslintrc.json`), answers);
    copyTpl(src('README'), dest(`${shortname}/README.md`), answers);
    copyTpl(src('CONTRIBUTING'), dest(`${shortname}/CONTRIBUTING.md`), {
      ...answers,
      sequelizeDialect: dialect ? dialect.name : '',
    });
    copyTpl(src('_package'), dest(`${shortname}/package.json`), {
      ...answers,
      description: JSON.stringify(answers.description),
    });
    copyTpl(src('env'), dest(`${shortname}/.env`), { ...answers, name: envName });
    copyTpl(src('env.example'), dest(`${shortname}/.env.example`), { ...answers, name: envName });
    copyTpl(src('src/index'), dest(`${shortname}/src/index.js`), answers);
    copyTpl(src('src/config/index'), dest(`${shortname}/src/config/index.js`), { ...answers, name: envName });
    copyTpl(src('src/api/index'), dest(`${shortname}/src/api/index.js`), answers);

    if (answers.sequelize) {
      copy(src('.sequelizerc'), dest(`${shortname}/.sequelizerc`));
      copy(src('src/db/models/index'), dest(`${shortname}/src/db/models/index.js`));
      copy(src('src/db/migrations'), dest(`${shortname}/src/db/migrations`));
      copy(src('src/db/seeders'), dest(`${shortname}/src/db/seeders`));
      copy(src('src/db/index'), dest(`${shortname}/src/db/index.js`));
      copy(src('src/config/sequelize'), dest(`${shortname}/src/config/sequelize.js`));
      copyTpl(src('src/config/database'), dest(`${shortname}/src/config/database.js`), {
        dialect: dialect.value,
      });

      this.packages.dependencies.push('sequelize');
      this.packages.dependencies.push('sequelize-cli');
      this.packages.dependencies.push(...dialect.packages);
    }

    if (answers.winston) {
      copy(src('src/config/logger'), dest(`${shortname}/src/config/logger.js`));

      this.packages.dependencies.push('winston');
    }

    if (answers.celebrate) {
      copy(src('src/api/middlewares/validation'), dest(`${shortname}/src/api/middlewares/validation.js`));

      this.packages.dependencies.push('celebrate');
    }

    if (answers.jwt) {
      this.packages.dependencies.push('jsonwebtoken');
      this.packages.dependencies.push('express-jwt');

      copy(src('src/utils/jwt'), dest(`${shortname}/src/utils/jwt.js`));
      copy(src('src/api/middlewares/auth'), dest(`${shortname}/src/api/middlewares/auth.js`));
    }

    if (answers.prettier) {
      copy(src('prettierrc'), dest(`${shortname}/.prettierrc`));

      this.packages.devDependencies.push('eslint-config-prettier');
      this.packages.devDependencies.push('eslint-plugin-prettier');
      this.packages.devDependencies.push('prettier');
    }

    if (answers.mocha) {
      copy(src('test/index'), dest(`${shortname}/test/index.js`));
      copy(src('nycrc'), dest(`${shortname}/.nycrc`));

      this.packages.devDependencies.push('chai');
      this.packages.devDependencies.push('mocha');
      this.packages.devDependencies.push('nyc');
      this.packages.devDependencies.push('supertest');
      this.packages.devDependencies.push('eslint-plugin-chai-expect');
    }

    if (answers.docker) {
      copy(src('.dockerignore'), dest(`${shortname}/.dockerignore`));
      copyTpl(src('DockerFile'), dest(`${shortname}/DockerFile`), answers);
    }

    if (answers.openapi) {
      copyTpl(src('src/api/doc/index.html'), dest(`${shortname}/src/api/doc/index.html`), answers);
      copyTpl(src('src/api/doc/openapi'), dest(`${shortname}/src/doc/openapi.yaml`), answers);
    }
  }

  install() {
    const appDir = join(process.cwd(), this.answers.shortname);
    const dependencies = this.packages.dependencies.map(dep => `${dep}@latest`);
    const devDependencies = this.packages.devDependencies.map(dep => `${dep}@latest`);

    process.chdir(appDir);

    this.installDependencies({ bower: false, npm: true }).then(() => {
      this.spawnCommandSync('npm', ['i', '--save', ...dependencies]);
      this.spawnCommandSync('npm', ['i', '--save-dev', ...devDependencies]);
      this.spawnCommandSync('npm', ['remove', '-S', 'example']);
      this.spawnCommandSync('npm', ['remove', '-D', 'example']);
      this.spawnCommandSync('npm', ['update']);
      this.spawnCommandSync('npm', ['run', 'lint:fix']);
    });
  }

  end() {
    this.log(yosay('All done !'));
  }
};
