require("dotenv").config();

const {
  POSTGRES_URL,
  POSTGRES_PRISMA_URL,
  POSTGRES_URL_NO_SSL,
  POSTGRES_URL_NON_POOLING,
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  NODE_ENV,
} = process.env;
// console.log("NODE_ENV", NODE_ENV);
module.exports = {
  development: {
    username: DATABASE_USER || POSTGRES_USER,
    password: DATABASE_PASSWORD || POSTGRES_PASSWORD,
    database: DATABASE_NAME || POSTGRES_DATABASE,
    host: DATABASE_HOST || POSTGRES_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    url: POSTGRES_URL, // Use the appropriate test database URL
    dialect: "postgres",
  },
  production: {
    url: POSTGRES_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
