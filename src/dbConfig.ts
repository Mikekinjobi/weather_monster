import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_HOST, DB_DIALECT} = process.env 


const sequelize = new Sequelize(DB_NAME!, DB_USER_NAME!, DB_PASSWORD , {
    host: DB_HOST,
    port: 5432,
    dialect: DB_DIALECT as Dialect,
    logging: false,
    dialectOptions: {
      encrypt: true,
      ssl: {
        rejectUnauthorized: true,
      },
    },
  });

export default sequelize;

