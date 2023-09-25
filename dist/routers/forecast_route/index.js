"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forecasts_1 = require("../../controllers/forecasts");
const router = (0, express_1.Router)();
router.get('/:city_id', forecasts_1.getForecast);
exports.default = router;
