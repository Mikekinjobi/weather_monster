"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhooks_1 = require("../../controllers/webhooks");
const router = (0, express_1.Router)();
router.post('/', webhooks_1.postWebhook);
router.delete('/:id', webhooks_1.deleteWebhook);
exports.default = router;
