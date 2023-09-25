import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_HOST, DB_DIALECT} = process.env 


const sequelize = new Sequelize(DB_NAME!, DB_USER_NAME!, DB_PASSWORD , {
    host: DB_HOST,
    dialect: DB_DIALECT as Dialect  
});

export default sequelize;

