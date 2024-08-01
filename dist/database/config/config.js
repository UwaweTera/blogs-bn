"use strict";

require('dotenv').config();
var _process$env = process.env,
  PRODUCTION_DATABASE = _process$env.PRODUCTION_DATABASE,
  DEV_DATABASE = _process$env.DEV_DATABASE,
  DATABASE_USER = _process$env.DATABASE_USER,
  DATABASE_PASSWORD = _process$env.DATABASE_PASSWORD,
  DATABASE_HOST = _process$env.DATABASE_HOST,
  DATABASE_PORT = _process$env.DATABASE_PORT,
  TEST_DATABASE = _process$env.TEST_DATABASE;
console.log('db url: ', DEV_DATABASE);
module.exports = {
  development: {
    url: process.env.DEV_DATABASE,
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_DATABASE,
    dialect: 'postgres'
  },
  production: {
    url: process.env.PRODUCTION_DATABASE,
    dialect: 'postgres'
  }
};