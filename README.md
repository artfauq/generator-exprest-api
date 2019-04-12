# generator-exprest-api

![](https://img.shields.io/badge/license-MIT-blue.svg)

> Yeoman generator for creating REST APIs with Express

## Features

- **RESTful API** - Using [Express](https://github.com/expressjs/express/)
- **Request body validation** - Using [joi](https://github.com/hapijs/joi)
- **Standard error responses** - Using [http-errors](https://www.npmjs.com/package/http-errors)
- **Logging** - Using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan#readme)
- **Error linting** - Using [ESLint](https://eslint.org/)
- **Code formatting** - Using [Prettier](https://prettier.io/)
- **Pre-commit linting hook** - Using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **API documentation** - Using [Swagger](https://swagger.io/)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-exprest-api using [npm](https://www.npmjs.com/).

```bash
npm install -g yo generator-exprest-api
```

## Usage

Then generate your new project:

```bash
yo exprest-api
```

## License

MIT © [Arthur Fauquenot](https://github.com/arthurfauq)
