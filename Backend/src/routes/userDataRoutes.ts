import { Router } from 'express';
import { getAllUserData } from '../controllers/userDataController';

const router = Router();

router.get('/allUserData', getAllUserData);

export default router;