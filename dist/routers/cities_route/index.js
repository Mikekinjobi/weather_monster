"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cities_1 = require("../../controllers/cities");
const router = (0, express_1.Router)();
router.get('/:id', cities_1.findCity);
router.post('/', cities_1.postCity);
router.patch('/:id', cities_1.updateCity);
router.delete('/:id', cities_1.deleteCity);
exports.default = router;
