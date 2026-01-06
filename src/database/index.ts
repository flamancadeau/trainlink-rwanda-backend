// import { Sequelize } from 'sequelize';
// import { config } from '../config/environment';

// const sequelize = new Sequelize(
//   config.database.name,
//   config.database.user,
//   config.database.password,
//   {
//     host: config.database.host,
//     port: config.database.port,
//     dialect: config.database.dialect,
//     logging: config.env === 'development' ? console.log : false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

// export const connectDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ PostgreSQL Database connected successfully.');
//   } catch (error) {
//     console.error('❌ Unable to connect to the database:', error);
//     throw error;
//   }
// };

// export default sequelize;
