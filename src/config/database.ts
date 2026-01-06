import { Sequelize } from 'sequelize';
import { config } from './environment';
import { initModels } from '../database/models/index'; 

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect as any,
        logging: config.env === 'development' ? console.log : false,
    }
);


export const db = initModels(sequelize);

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Database connected successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        throw error;
    }
};

export default sequelize;