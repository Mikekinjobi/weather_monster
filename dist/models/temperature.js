'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../dbConfig"));
class Temperature extends sequelize_1.Model {
}
Temperature.init({
    city_id: sequelize_1.DataTypes.INTEGER,
    max: sequelize_1.DataTypes.INTEGER,
    min: sequelize_1.DataTypes.INTEGER,
    timestamp: sequelize_1.DataTypes.BIGINT
}, {
    sequelize: dbConfig_1.default,
    modelName: 'Temperature',
});
exports.default = Temperature;
