const Generator = require('yeoman-generator');
const { gray, red, yellow } = require('chalk').default;
const yosay = require('yosay');
const { join } = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.winston = true;
    this.axios = true;
    this.celebrate = true;
    this.docker = true;
    this.prettier = true;
    this.openapi = true;
  }

  prompting() {
    this.log(yosay(`Welcome to the glorious ${red('generator-exprest-api')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'shortname',
        message: `App ${yellow('shortname')} [ex: ${gray('rest-api')}]`,
        validate: input => input.trim() !== '',
      },
      {
        type: 'input',
        name: 'name',
        message: `App ${yellow('full name')} [ex: ${gray('My REST API')}]`,
        validate: input => input.trim() !== '',
      },
      {
        type: 'input',
        name: 'description',
        message: `App ${yellow('description')} [ex: ${gray('A REST API for cats and dogs')}]`,
        validate: input => input.trim() !== '',
      },
      {
        type: 'input',
        name: 'version',
        message: `App ${yellow('version')} [ex: ${gray('0.0.0')}]`,
        validate: input => input.trim() !== '',
        default: '0.0.0',
      },
      {
        type: 'input',
        name: 'srcDir',
        message: `Source files ${yellow('directory name')} [ex: ${gray('src')}]`,
        validate: input => input.trim() !== '',
        default: 'src',
      },
      {
        type: 'confirm',
        name: 'winston',
        message: `Use ${yellow.bold('Winston')} for logging ?`,
        default: this.winston,
      },
      {
        type: 'confirm',
        name: 'celebrate',
        message: `Use ${yellow.bold('celebrate/joi')} for object validation ?`,
        default: this.celebrate,
      },
      {
        type: 'confirm',
        name: 'axios',
        message: `Use ${yellow.bold('axios')} for HTTP requests ?`,
        default: this.axios,
      },
      {
        type: 'confirm',
        name: 'prettier',
        message: `Use ${yellow.bold('Prettier')} for code formatting ?`,
        default: this.prettier,
      },
      {
        type: 'confirm',
        name: 'docker',
        message: `Generate a ${yellow('DockerFile')} ?`,
        default: this.docker,
      },
      {
        type: 'confirm',
        name: 'openapi',
        message: `Generate an ${yellow.bold('OpenAPI')} documentation file ?`,
        default: this.openapi,
      },
    ];

    return this.prompt(prompts).then(props => {
      this.shortname = props.shortname || this.shortname;
      this.name = props.name || this.name;
      this.description = props.description || this.description;
      this.version = props.version || this.version;
      this.srcDir = props.srcDir || this.srcDir;
      this.winston = props.winston;
      this.axios = props.axios;
      this.celebrate = props.celebrate;
      this.docker = props.docker;
      this.prettier = props.prettier;
      this.openapi = props.prettier;

      return null;
    });
  }

  writing() {
    const copy = this.fs.copy.bind(this.fs);
    const copyTpl = this.fs.copyTpl.bind(this.fs);
    const src = this.templatePath.bind(this);
    const dest = this.destinationPath.bind(this);

    const props = {
      shortname: this.shortname,
      name: this.name,
      description: this.description,
      version: this.version,
      srcDir: this.srcDir,
      docker: this.docker,
      prettier: this.prettier,
      winston: this.winston,
      celebrate: this.celebrate,
      axios: this.axios,
      openapi: this.openapi,
    };

    copy(src('editorconfig'), dest(`${this.shortname}/.editorconfig`));
    copy(src('gitattributes'), dest(`${this.shortname}/.gitattributes`));
    copy(src('gitignore'), dest(`${this.shortname}/.gitignore`));
    copy(src('src/config/index.js'), dest(`${this.shortname}/${props.srcDir}/config/index.js`));
    copy(src('src/config/winston.js'), dest(`${this.shortname}/${props.srcDir}/config/winston.js`));
    copy(src('src/controllers/empty'), dest(`${this.shortname}/${props.srcDir}/controllers/empty`));
    copy(src('src/utils/empty'), dest(`${this.shortname}/${props.srcDir}/utils/empty`));

    copyTpl(src('eslintrc'), dest(`${this.shortname}/.eslintrc.json`), props);
    copyTpl(src('README.md'), dest(`${this.shortname}/README.md`), props);
    copyTpl(src('CONTRIBUTING.md'), dest(`${this.shortname}/CONTRIBUTING.md`), props);
    copyTpl(src('_package'), dest(`${this.shortname}/package.json`), props);
    copyTpl(src('src/index'), dest(`${this.shortname}/${props.srcDir}/index.js`), props);
    copyTpl(src('src/routes/index.js'), dest(`${this.shortname}/${props.srcDir}/routes/index.js`), props);

    if (props.winston) {
      copy(src('src/config/winston.js'), dest(`${this.shortname}/${props.srcDir}/config/winston.js`));
    }

    if (props.celebrate) {
      copy(src('src/validation/empty'), dest(`${this.shortname}/${props.srcDir}/validation/empty`));
    }

    if (props.openapi) {
      copyTpl(src('src/docs/index.html'), dest(`${this.shortname}/${props.srcDir}/docs/index.html`), props);
      copyTpl(src('src/docs/openapi.yaml'), dest(`${this.shortname}/${props.srcDir}/docs/openapi.yaml`), props);
    }

    if (props.docker) {
      copyTpl(src('DockerFile'), dest(`${this.shortname}/DockerFile`), props);
    }

    if (props.prettier) {
      copy(src('prettierrc'), dest(`${this.shortname}/.prettierrc`));
    }
  }

  install() {
    const appDir = join(process.cwd(), this.shortname);

    process.chdir(appDir);

    this.installDependencies({ bower: false, npm: true })
      .then(() => {
        return this.spawnCommand('npm', ['run', 'lint:fix']);
      })
      .catch(err => {
        throw err;
      });
  }
};
