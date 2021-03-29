# Express / Rest API generator

![](https://img.shields.io/badge/license-MIT-blue.svg)

> Yeoman generator for creating REST APIs with Express

## Included

- **TypeScript support**
- **RESTful API** - Using [Express](https://github.com/expressjs/express/)
- **Dependency injection** - Using [typedi](https://github.com/typestack/typedi)
- **Standard error responses** - Using [http-errors](https://www.npmjs.com/package/http-errors)
- **Pre-commit linting hook** - Using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)

## Features / options

- **API documentation** - Using [Swagger](https://swagger.io/) and [ReDoc](https://github.com/Redocly/redoc)
- **API status monitoring** - Using [express-status-monitor](https://www.npmjs.com/package/express-status-monitor)
- **Caching** - Using [Redis](https://github.com/NodeRedis/node-redis)
- **Code formatting** - Using [Prettier](https://prettier.io/)
- **Containerization** - Using [Docker Compose](https://docs.docker.com/compose/)
- **Cron jobs** - Using [node-schedule](https://github.com/node-schedule/node-schedule)
- **Database ORM** - Using [Sequelize](http://docs.sequelizejs.com/)
- **Email sending** - Using [Nodemailer](https://nodemailer.com/about/)
- **Error linting** - Using [ESLint](https://eslint.org/)
- **Error tracking** - Using [Sentry](https://docs.sentry.io/platforms/node/)
- **Internationalization** - Using [i18next](https://www.i18next.com/)
- **Logging** - Using [Winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan#readme)
- **Object validation** - Using [celebrate](https://www.npmjs.com/package/celebrate) and [Joi](https://github.com/sideway/joi)
- **Real-time events** - Using [Socket.IO](https://socket.io/)
- **Testing** - Using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [Sinon](https://sinonjs.org/), [Supertest](https://github.com/visionmedia/supertest) and coverage with [nyc](https://github.com/istanbuljs/nyc)

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
