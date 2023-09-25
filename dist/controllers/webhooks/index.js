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
exports.webhookCallback = exports.deleteWebhook = exports.postWebhook = void 0;
const webhooks_1 = __importDefault(require("../../models/webhooks"));
const axios_1 = __importDefault(require("axios"));
const postWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city_id, callback_url } = req.body;
        const { dataValues } = yield webhooks_1.default.create({
            city_id,
            callback_url
        });
        const id = dataValues.id;
        res.status(200).json({ id, city_id, callback_url });
    }
    catch (error) {
        console.error(error);
    }
});
exports.postWebhook = postWebhook;
const deleteWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const webhook = yield webhooks_1.default.findOne({ where: { id: req.params.id }, attributes: ['id', 'city_id', 'callback_url'] });
        yield webhooks_1.default.destroy({ where: { id: req.params.id } });
        res.status(200).json(webhook);
    }
    catch (error) {
        res.status(500).json({ error });
        console.error(error);
    }
});
exports.deleteWebhook = deleteWebhook;
const webhookCallback = (city_id, max, min, timestamp) => __awaiter(void 0, void 0, void 0, function* () {
    webhooks_1.default.findAll({ where: { city_id: city_id } }).then((dataArray) => {
        dataArray.forEach((data) => {
            axios_1.default.post(data.getDataValue('callback_url'), {
                city_id,
                max,
                min,
                timestamp
            })
                .then(function (response) {
                console.log('process Complete');
            })
                .catch(function (error) {
                console.log(error);
            });
        });
    });
});
exports.webhookCallback = webhookCallback;
