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
exports.deleteCity = exports.updateCity = exports.findCity = exports.postCity = void 0;
const city_1 = __importDefault(require("../../models/city"));
const postCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, latitude, longitude } = req.body;
        const duplicate = yield city_1.default.findOne({ where: { name: name } });
        if (duplicate)
            return res.status(400).json('you cannot add a duplicate city');
        const { dataValues } = yield city_1.default.create({
            name,
            latitude,
            longitude
        });
        const id = dataValues.id;
        return res.status(200).json({ id, name, latitude, longitude });
    }
    catch (error) {
        console.error(error);
    }
});
exports.postCity = postCity;
const findCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = yield city_1.default.findOne({ where: { id: req.params.id }, attributes: ['id', 'name', 'longitude', 'latitude'] });
        res.status(200).json(city);
    }
    catch (error) {
        res.status(500).json({ error });
        console.error(error);
    }
});
exports.findCity = findCity;
const updateCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield city_1.default.update(req.body, { where: { id: req.params.id } });
        const city = yield city_1.default.findOne({ where: { id: req.params.id }, attributes: ['id', 'name', 'longitude', 'latitude'] });
        res.status(200).json(city);
    }
    catch (error) {
        res.status(500).json({ error });
        console.error(error);
    }
});
exports.updateCity = updateCity;
const deleteCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = yield city_1.default.findOne({ where: { id: req.params.id }, attributes: ['id', 'name', 'longitude', 'latitude'] });
        yield city_1.default.destroy({ where: { id: req.params.id } });
        res.status(200).json(city);
    }
    catch (error) {
        res.status(500).json({ error });
        console.error(error);
    }
});
exports.deleteCity = deleteCity;
