"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForecast = void 0;
const sequelize_1 = require("sequelize");
const temperature_1 = __importDefault(require("../../models/temperature"));
const moment_1 = __importDefault(require("moment"));
const getForecast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let max = 0;
    let min = 0;
    try {
        const TODAY_START = (0, moment_1.default)().format('YYYY-MM-DD 00:00');
        const NOW = (0, moment_1.default)().format('YYYY-MM-DD 23:59');
        const forecastSample = yield temperature_1.default.findAll({ where: { city_id: req.params.city_id, createdAt: {
                    [sequelize_1.Op.between]: [
                        TODAY_START,
                        NOW,
                    ]
                } } });
        forecastSample.forEach((temperature) => {
            min += temperature.min;
            max += temperature.max;
        });
        const city_id = req.params.city_id;
        const sample = forecastSample.length;
        min = min / sample;
        max = max / sample;
        return res.status(200).json({ city_id, max, min, sample });
    }
    catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
exports.getForecast = getForecast;
