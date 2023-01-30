# Express / Rest API generator

![](https://img.shields.io/badge/license-MIT-blue.svg)

> Yeoman generator for creating REST APIs with Express

## Included

- **TypeScript support**
- **RESTful API** - Using [Express](https://github.com/expressjs/express/)
- **Dependency injection** - Using [typedi](https://github.com/typestack/typedi)
- **Standard error responses** - Using [http-errors](https://www.npmjs.com/package/http-errors)

## Features / options

- **Database ORM** - Using [Sequelize](http://docs.sequelizejs.com/) (MySQL and PostgreSQL support)
- **Docker containerization** - Using [Docker Compose](https://docs.docker.com/compose/)
- **Testing** - Using [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest)
- **Logging** - Using [Winston](https://github.com/winstonjs/winston)
- **HTTP requests logging** - Using [morgan](https://github.com/expressjs/morgan#readme)
- **Internationalization** - Using [i18next](https://www.i18next.com/)
- **Error tracking** - Using [Sentry](https://docs.sentry.io/platforms/node/)
- **Caching** - Using [Redis](https://github.com/NodeRedis/node-redis)
- **API documentation** - Using [OpenAPI](https://swagger.io/specification/) and [ReDoc](https://github.com/Redocly/redoc)
- **Object validation** - Using [celebrate](https://www.npmjs.com/package/celebrate) and [Joi](https://github.com/sideway/joi)
- **Email sending** - Using [Nodemailer](https://nodemailer.com/about/)
- **Real-time events** - Using [Socket.IO](https://socket.io/)
- **Admin panel** - Using [AdminJS](https://adminjs.co/)
- **API status monitoring** - Using [express-status-monitor](https://www.npmjs.com/package/express-status-monitor)
- **Cron jobs** - Using [node-schedule](https://github.com/node-schedule/node-schedule)
- **Code formatting** - Using [Prettier](https://prettier.io/)
- **Code linting** - Using [ESLint](https://eslint.org/)
- **Pre-push linting hook** - Using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-exprest-api using [npm](https://www.npmjs.com/).

```bash
yarn global add yo generator-exprest-api
```

## Usage

Then generate your new project with:

```bash
yo exprest-api
```

**NOTE:** No need to create a new folder before running the command, the generator will do it for you.

## TODO

- [ ] Add unit tests
- [ ] Add internationalized validation errors
- [ ] Add supported locales / default locale option
- [ ] Migrate ORM to `MikroORM` ?
- [ ] Add `user.verifiedAt` property

## License

MIT © [Arthur Fauquenot](https://github.com/arthurfauq)
