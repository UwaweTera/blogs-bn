require('dotenv').config()

const {
  PRODUCTION_DATABASE,
  DEV_DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  TEST_DATABASE,
  DATABASE_NAME
} = process.env;

// console.log('db url: ', DEV_DATABASE)

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE,
    dialect: 'postgres',
  },
  production: {
    url: process.env.PRODUCTION_DATABASE,
    dialect: 'postgres',
  },
}