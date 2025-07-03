import { Router } from 'express';
import { getUserArmstrongNumbers, isItArmstrong } from '../controllers/armstrongController';

const router = Router();

router.post('/verify', isItArmstrong);
router.get('/number/:id', getUserArmstrongNumbers);

export default router;