"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const temperatures_1 = require("../../controllers/temperatures");
const router = (0, express_1.Router)();
router.post('/', temperatures_1.postTemp);
exports.default = router;
