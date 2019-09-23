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
        store: true,
      },
      {
        type: 'input',
        name: 'name',
        message: `App ${yellow('(pretty) name')} [ex: ${gray('My REST API')}]`,
        validate: input => input.trim() !== '',
        store: true,
      },
      {
        type: 'input',
        name: 'description',
        message: `App ${yellow('description')} [ex: ${gray('A REST API for cats and dogs')}]`,
        validate: input => input.trim() !== '',
        store: true,
      },
      {
        type: 'confirm',
        name: 'sequelize',
        message: `Use ${yellow.bold('Sequelize')} as ORM ?`,
        default: true,
        store: true,
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
        store: true,
      },
      {
        type: 'confirm',
        name: 'winston',
        message: `Use ${yellow.bold('winston')} for logging ?`,
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'celebrate',
        message: `Use ${yellow.bold('celebrate/joi')} for object validation ?`,
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'axios',
        message: `Use ${yellow.bold('axios')} for HTTP requests ?`,
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'jwt',
        message: `Use ${yellow.bold('JWT')} for user authentication ?`,
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'prettier',
        message: `Use ${yellow.bold('Prettier')} for code formatting ?`,
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'docker',
        message: `Generate a ${yellow('DockerFile')} ?`,
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'openapi',
        message: `Generate an ${yellow.bold('OpenAPI')} documentation file ?`,
        default: true,
        store: true,
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
    copyTpl(src('index'), dest(`${shortname}/index.js`), answers);
    copyTpl(src('env'), dest(`${shortname}/.env`), { ...answers, name: envName });
    copyTpl(src('env.example'), dest(`${shortname}/.env.example`), { ...answers, name: envName });
    copyTpl(src('src/config/index'), dest(`${shortname}/src/config/index.js`), { ...answers, name: envName });
    copyTpl(src('src/routes/index'), dest(`${shortname}/src/routes/index.js`), answers);

    if (answers.sequelize) {
      copy(src('src/models/index.js'), dest(`${shortname}/src/models/index.js`));
      copyTpl(src('src/config/sequelize'), dest(`${shortname}/src/config/sequelize.js`), {
        sequelizeDialect: dialect.value,
      });

      this.packages.dependencies.push('sequelize');
      this.packages.dependencies.push(...dialect.packages);
    }

    if (answers.winston) {
      copy(src('src/config/winston.js'), dest(`${shortname}/src/config/winston.js`));

      this.packages.dependencies.push('winston');
    }

    if (answers.celebrate) {
      this.packages.dependencies.push('celebrate');
    }

    if (answers.axios) {
      this.packages.dependencies.push('axios');
    }

    if (answers.jwt) {
      this.packages.dependencies.push('jsonwebtoken');
      this.packages.dependencies.push('express-jwt');

      copy(src('src/utils/jwt'), dest(`${shortname}/src/utils/jwt.js`));
      copy(src('src/routes/middleware'), dest(`${shortname}/src/routes/middleware.js`));
    }

    if (answers.prettier) {
      copy(src('prettierrc'), dest(`${shortname}/.prettierrc`));

      this.packages.devDependencies.push('eslint-config-prettier');
      this.packages.devDependencies.push('eslint-plugin-prettier');
      this.packages.devDependencies.push('prettier');
    }

    if (answers.docker) {
      copyTpl(src('DockerFile'), dest(`${shortname}/DockerFile`), answers);
    }

    if (answers.openapi) {
      copyTpl(src('doc/index.html'), dest(`${shortname}/doc/index.html`), answers);
      copyTpl(src('doc/openapi'), dest(`${shortname}/doc/openapi.yaml`), answers);
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
