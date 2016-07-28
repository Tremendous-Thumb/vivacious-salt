# New Challenger

New Challenger is a brand new web app for issuing challenges to the world and trying new challenges to get awesome rewards!

## Team

  - __Development Team Members__: June Won, Keith Wong, Frances Yang, Carl Chen
  - __Scrum Master__: Frances Yang
  - __Product Owner__: Carl Chen

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

After downloading or cloning, run npm install. There is a post-install npm script that will build and compile the client files using webpack.

Use psql (postgreSQL) for database, whether local or remote. Make sure to create the database and pass in user/pw, and connect to the database source as an environment variable.

Be sure to get Facebook Client Key & Secret for authorization.

For starting the app, run node server/server.js or deploy remotely.
## Requirements

- Node 6.2.x
- Postgresql 9.5.x
- BodyParser 1.15.x
- ES6-Promise 3.2.x
- Express 4.14.x
- Express-Session 1.14.x
- Passport 0.3.x
- Passport-Facebook 2.1.x
- lodash 4.13.1
- Sequelize 3.23.x
- pg 6.0.2
- pg-hstore 2.3.2
- React 15.2.1
- React-DOM 15.2.1
- React-Redux 4.4.5
- React-Router 2.5.2
- React-Router-Redux 4.0.5
- React-Tap-Event-Plugin 1.0.0
- Redux 3.5.2
- Whatwg-Fetch 1.0.x
- Materialize
- Material-UI 0.15.x

## Development
- Babel-core 6.10.x
- Babel-loader 6.2.x
- Babel-preset-es2016 6.9.x
- Babel-preset-react 6.11.x
- Webpack 1.13.x
- ESLint 2.9.x

### Installing Dependencies

From within the root directory:

```sh
npm install
```

To build splash dependencies `gulp copy`

### Roadmap

View the project roadmap [here](https://github.com/vivacioussalt/vivacious-salt/pulls?q=is%3Apr+is%3Aclosed)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
