require('dotenv').config();

const prefixConf = () => {
  const prefixEnv = process.env.NODE_ENV || 'development';
  let prefix;
  switch (prefixEnv) {
    case 'development':
      prefix = 'DEV';
      break;
    case 'testing':
      prefix = 'TEST';
      break;
    case 'production':
      prefix = 'PROD';
      break;
    default:
      prefix = 'DEV';
      break;
  }
  return prefix;
};

const prefix = prefixConf();

module.exports = {
  development: {
    username: process.env[`DB_${prefix}_USERNAME`] || 'postgres',
    password: process.env[`DB_${prefix}_PASSWORD`] || 'mysecretpassword',
    database: process.env[`DB_${prefix}_NAME`] || 'trainlink_rwanda',
    host: process.env[`DB_${prefix}_HOST`] || 'localhost',
    port: parseInt(process.env[`DB_${prefix}_PORT`] || '5432', 10),
    dialect: 'postgres',
  },
  testing: {
    username: process.env[`DB_${prefix}_USERNAME`] || 'postgres',
    password: process.env[`DB_${prefix}_PASSWORD`] || 'mysecretpassword',
    database: process.env[`DB_${prefix}_NAME`] || 'trainlink_rwanda_test',
    host: process.env[`DB_${prefix}_HOST`] || 'localhost',
    port: parseInt(process.env[`DB_${prefix}_PORT`] || '5432', 10),
    dialect: 'postgres',
  },
  production: {
    username: process.env[`DB_${prefix}_USERNAME`] || 'postgres',
    password: process.env[`DB_${prefix}_PASSWORD`] || 'mysecretpassword',
    database: process.env[`DB_${prefix}_NAME`] || 'trainlink_rwanda_prod',
    host: process.env[`DB_${prefix}_HOST`] || 'localhost',
    port: parseInt(process.env[`DB_${prefix}_PORT`] || '5432', 10),
    dialect: 'postgres',
  }
};
