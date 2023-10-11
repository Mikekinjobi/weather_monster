'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../dbConfig"));
class Cities extends sequelize_1.Model {
}
Cities.init({
    name: sequelize_1.DataTypes.STRING,
    latitude: sequelize_1.DataTypes.FLOAT,
    longitude: sequelize_1.DataTypes.FLOAT
}, {
    sequelize: dbConfig_1.default,
    tableName: 'Cities',
    modelName: 'Cities',
});
exports.default = Cities;
