import { Router } from 'express';
import { getAllUserData } from '../controllers/userDataController';

const router = Router();

router.post('/allUserData', getAllUserData);

export default router;