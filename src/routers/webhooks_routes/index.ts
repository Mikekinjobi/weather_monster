import { Router } from "express";
import { postWebhook, deleteWebhook } from "../../controllers/webhooks";

const router = Router();

router.post('/', postWebhook);
router.delete('/:id', deleteWebhook);

export default router;