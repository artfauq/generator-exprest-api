const Generator = require('yeoman-generator');
const chalk = require('chalk').default;
const yosay = require('yosay');
const { join } = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.shortname = 'rest-api';
    this.name = 'REST API';
    this.description = 'REST API for cats and dogs';
    this.version = '1.0.0';
    this.srcDir = 'src';
    this.docker = true;
    this.prettier = true;
  }

  prompting() {
    this.log(yosay(`Welcome to the glorious ${chalk.red('generator-express-api')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'shortname',
        message: `Project shortname [${this.shortname}]`,
      },
      {
        type: 'input',
        name: 'name',
        message: `App name [${this.name}]`,
      },
      {
        type: 'input',
        name: 'description',
        message: `App description [${this.description}]`,
      },
      {
        type: 'input',
        name: 'version',
        message: `App version [${this.version}]`,
      },
      {
        type: 'input',
        name: 'srcDir',
        message: `Source files directory name [${this.srcDir}]`,
      },
      {
        type: 'confirm',
        name: 'docker',
        message: 'Generate a DockerFile ?',
        default: this.docker,
      },
      {
        type: 'confirm',
        name: 'prettier',
        message: 'Use Prettier ?',
        default: this.prettier,
      },
    ];

    return this.prompt(prompts).then(props => {
      this.shortname = props.shortname || this.shortname;
      this.name = props.name || this.name;
      this.description = props.description || this.description;
      this.version = props.version || this.version;
      this.srcDir = props.srcDir || this.srcDir;
      this.docker = props.docker;
      this.prettier = props.prettier;

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
    };

    copy(src('.editorconfig'), dest(`${this.shortname}/.editorconfig`));
    copy(src('.gitattributes'), dest(`${this.shortname}/.gitattributes`));
    copy(src('.gitignore'), dest(`${this.shortname}/.gitignore`));
    copy(src('src/index.js'), dest(`${this.shortname}/${props.srcDir}/index.js`));
    copy(src('src/config/index.js'), dest(`${this.shortname}/${props.srcDir}/config/index.js`));
    copy(src('src/config/winston.js'), dest(`${this.shortname}/${props.srcDir}/config/winston.js`));
    copy(src('src/controllers/index.js'), dest(`${this.shortname}/${props.srcDir}/controllers/index.js`));
    copy(src('src/utils/error.js'), dest(`${this.shortname}/${props.srcDir}/utils/error.js`));

    copyTpl(src('.eslintrc.json'), dest(`${this.shortname}/.eslintrc.json`), props);
    copyTpl(src('README.md'), dest(`${this.shortname}/README.md`), props);
    copyTpl(src('package.json'), dest(`${this.shortname}/package.json`), props);
    copyTpl(src('src/docs/index.html'), dest(`${this.shortname}/${props.srcDir}/docs/index.html`), props);
    copyTpl(src('src/docs/openapi.yaml'), dest(`${this.shortname}/${props.srcDir}/docs/openapi.yaml`), props);
    copyTpl(src('src/routes/index.js'), dest(`${this.shortname}/${props.srcDir}/routes/index.js`), props);

    if (props.docker) {
      copyTpl(src('DockerFile'), dest(`${this.shortname}/DockerFile`), props);
    }

    if (props.prettier) {
      copy(src('.prettierrc'), dest(`${this.shortname}/.prettierrc`));
    }
  }

  install() {
    const appDir = join(process.cwd(), this.shortname);

    process.chdir(appDir);

    this.installDependencies({ bower: false, npm: true });
  }
};
