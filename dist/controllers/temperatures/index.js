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
exports.postTemp = void 0;
const temperature_1 = __importDefault(require("../../models/temperature"));
const webhooks_1 = require("../webhooks");
const postTemp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city_id, max, min } = req.body;
        const timestamp = Date.now();
        const { dataValues } = yield temperature_1.default.create({
            city_id,
            max,
            min,
            timestamp
        });
        const id = dataValues.id;
        (0, webhooks_1.webhookCallback)(city_id, max, min, timestamp);
        res.status(200).json({ id, city_id, max, min, timestamp });
        ;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
exports.postTemp = postTemp;
