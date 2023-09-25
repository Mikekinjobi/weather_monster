import { Router } from "express";
import { getForecast } from "../../controllers/forecasts";

const router = Router();

router.get('/:city_id', getForecast)

export default router;