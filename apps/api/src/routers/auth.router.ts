import { authenticateUser } from '@/controllers/auth.controller';
import { validateUserAuth } from '@/middleware/validateUserAuth';
import { Router } from 'express';
const router = Router();

router.post('/', validateUserAuth, authenticateUser);

export default router;
