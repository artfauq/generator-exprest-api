# Changelog

## 4.5.2 (January 22, 2023)

- Fixed various build issues

## 4.5.1 (January 22, 2023)

- Fixed `ejs` tag issue

## 4.5.0 (January 21, 2023)

- Removed `adminBro` from injected services

## 4.4.1 (January 20, 2023)

- Fixed error middlewares call order
- Fixed incorrect `this.logger` in `ABOUT.md`
- Fixed request logging not using injected `logger`

## 4.4.0 (January 19, 2023)

- Changed `morgan` as option
- Migrated from `mocha` to `jest`

## 4.3.0 (January 19, 2023)

- Added suffix to all filenames
- Added `POST /users` route (controller, service, DTO, type, test)
- Added `GET /users/:id` route (controller, service, DTO, type, test)
- Changed `Nginx` as option
- Moved `/public` folder to project root
- Renamed `/routes` folder to `/controllers`
- Updated outdated documentation
- Fixed various issues

## 4.2.0 (February 18, 2022)

- Replaced `npm` with `yarn`
- Added `db:reset` command
- Freezed all package versions
- Removed `.env.test`
- Renamed `docker-compose` service `app` to `node`
- Refactored various minor things
- Fixed PostgreSQL not supported with Docker

## 4.1.0 (May 25, 2021)

- Added `AdminBro` option
- Changed `API status monitoring` as option
- Changed `pre-commit hook` as option
- Improved `lint` config
- Removed `fr.json` translations
- Changed `moment` initialization
- Removed `@kazaar/express-error-handler`
- Fixed various issues

## 4.0.0 (March 26, 2021)

- Added `TypeScript` support
- Added `Docker Compose` support
- Added `dependency injection`
- Added `API status monitoring`
- Added `i18n` option
- Added `Socket.IO` option
- Added `cron jobs` option
- Added `Sentry` option
- Added `Redis` option
- Added `auth` service with `sequelize` and `jwt` options enabled
- Added `base tests`
- Added `test stubs` support
- Replaced `CONTRIBUTING.md` with `ABOUT.md`
- Refactored project structure

## 3.8.0 (October 2, 2020)

- Added `.huskyrc.json`
- Added `.mocharc.json`
- Added `migrate:undo` command
- Added `PUBLIC_HOST` env variable
- Added `DB_PORT` env variable
- Renamed `transporter.js` to `smtp.js`
- Fixed packages version issue
- Fixed `CONTRIBUTING.md` typo errors

## 3.7.2 (January 24, 2020)

- Fixed env test file issue

## 3.7.1 (January 23, 2020)

- Modified tests structure

## 3.7.0 (January 23, 2020)

- Added `.env.test` file

## 3.6.0 (January 15, 2020)

- Added nodemailer option
- Fixed openapi.yaml destination issue
- Modified config handling with convict
- Modified npm scripts
- Modified JWT variable names
- Modified default migrations table name
- Modified sequelize config handling
- Renamed env variables

## 3.5.1 (November 5, 2019)

- Fixed `/models/index.js` copy issue
- Updated `README.md`

## 3.5.0 (November 5, 2019)

- Added `validation` middleware
- Updated `Error.stackTraceLimit`
- Updated `models` import

## 3.4.2 (November 4, 2019)

- Moved `/doc` folder to `/src/api`
- Updated `morgan` config
- Updated `express-error-handler`

## 3.4.1 (October 25, 2019)

- Fixed npm commands issue

## 3.4.0 (October 24, 2019)

- Moved `index.js` and `/doc` folder to `/src`

## 3.3.1 (October 24, 2019)

- Added `eslint-plugin-chai-expect`
- Removed `/.vscode` folder
- Updated `express-error-handler`

## 3.3.0 (October 22, 2019)

- Moved `/routes` folder into `/api` folder
- Removed `axios` option

## 3.2.0 (October 22, 2019)

- Added `sequelize-cli` + config files
- Added `nodemon.json` config file
- Added `migrate` npm script
- Added `generate-secret` npm script
- Added `sequelizeErrorParser`
- Updated `express-error-handler`
- Renamed `winston.js` to `logger.js`
- Moved `/models` to `/db/models`
- Removed `jwtErrorParser`
- Removed `axiosErrorParser`

## 3.1.1 (October 10, 2019)

- Addded `.dockerignore` file
- Changed `node` Docker image

## 3.1.0 (September 27, 2019)

- Addded test option with `mocha`, `chai`, `supertest` and `nyc`
- Changed `morgan` declaration
- Changed API documentation endpoint from `/api/docs` to `/docs`
- Moved `dotenv` configuration import from `index.js` to `/config/index.js`
- Removed `chalk` library
- Removed Yeoman `store` declarations

## 3.0.7 (September 23, 2019)

- Removed model import example in `/src/models/index.js`

## 3.0.6 (September 23, 2019)

- Added post-install commands to order dependencies alphabetically
- Changed `@kazaar/express-error-handler` version

## 3.0.5 (September 17, 2019)

- Removed `react` option
- Fixed environment variables name issue
- Fixed minor CONTRIBUTING.md issues
- Fixed DockerFile COPY issue
- Added `/api` basepath variable to OpenAPI doc
- Changed `/src/models/index.js` models import
- Changed package name validation
- Changed generated Dockerfile name
- Removed `/src/utils/emtpy` file
