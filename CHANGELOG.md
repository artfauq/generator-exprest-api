# Changelog

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
