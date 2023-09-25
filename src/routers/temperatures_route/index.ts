import { Router } from "express";
import { postTemp } from "../../controllers/temperatures";

const router = Router();

router.post('/', postTemp);

export default router;