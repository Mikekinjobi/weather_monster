'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../dbConfig"));
class Webhooks extends sequelize_1.Model {
}
Webhooks.init({
    city_id: sequelize_1.DataTypes.INTEGER,
    callback_url: sequelize_1.DataTypes.STRING
}, {
    sequelize: dbConfig_1.default,
    tableName: 'Webhooks',
    modelName: 'Webhooks',
});
exports.default = Webhooks;
