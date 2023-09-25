import { Router } from "express";
import { deleteCity, findCity, postCity, updateCity } from "../../controllers/cities";

const router = Router();

router.get('/:id', findCity);
router.post('/', postCity);
router.patch('/:id', updateCity);
router.delete('/:id', deleteCity)

export default router;