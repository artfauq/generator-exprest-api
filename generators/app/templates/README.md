# <%= name %>

> <%= description %>

## Getting started

### Prerequisites

**Node.js** is required to run the application.

Visit [this page](https://nodejs.org/en/download/) for download instructions.

### Installation

Install the required dependencies:

`$ npm install`

### Main commands

#### Development

Start a local development server with the following command:

`$ npm run dev`

This will:

- Fire up the server at [localhost:8080](http://localhost:8080)
- Set the `NODE_ENV` variable to `development`
- Watch for changes in the source files allowing the server to reload automatically

#### Deployment

For deployment use, start the server with:

`$ npm run start`

**NOTE:** the application makes use of the `NODE_ENV` environment variable do determine its running environment.

#### Lint

Check for linting errors with:

`$ npm run lint`

Automatically fix linting errors with:

`$ npm run lint:fix`

<%_ if (openapi) { _%>## Documentation

All the API is documented with [ReDoc](https://github.com/Rebilly/ReDoc) from an [OpenAPI](https://swagger.io/specification/) document.

To explore the documentation, run the server and navigate to `localhost:8080/docs`.
<%_ } _%>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
