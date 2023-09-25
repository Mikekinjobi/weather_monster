"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});
exports.default = sequelize;
