'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../dbConfig"));
class Forecast extends sequelize_1.Model {
}
Forecast.init({
    city_id: sequelize_1.DataTypes.INTEGER,
    max: sequelize_1.DataTypes.INTEGER,
    min: sequelize_1.DataTypes.INTEGER,
    sample: sequelize_1.DataTypes.INTEGER
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Forecast',
});
exports.default = Forecast;
