# generator-exprest-api

![](https://img.shields.io/badge/license-MIT-blue.svg)

> Yeoman generator for creating REST APIs with Express

## Features / options

- **RESTful API** - Using [Express](https://github.com/expressjs/express/)
- **Standard error responses** - Using [http-errors](https://www.npmjs.com/package/http-errors)
- **Logging** - Using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan#readme)
- **Error linting** - Using [ESLint](https://eslint.org/)
- **Code formatting** - Using [Prettier](https://prettier.io/)
- **Pre-commit linting hook** - Using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **API documentation** - Using [Swagger](https://swagger.io/)
- **Object validation** - Using [celebrate/joi](https://www.npmjs.com/package/celebrate)
- **Database ORM** - Using [Sequelize](http://docs.sequelizejs.com/)
- **JWT** - Using [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) and [express-jwt](https://github.com/auth0/express-jwt)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-exprest-api using [npm](https://www.npmjs.com/).

```bash
npm install -g yo generator-exprest-api
```

## Usage

Then generate your new project with:

```bash
yo exprest-api
```

**NOTE:** No need to create a new folder before running the command, the generator will do it for you.

## License

MIT © [Arthur Fauquenot](https://github.com/arthurfauq)
