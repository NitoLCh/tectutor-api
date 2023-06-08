import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
const router = Router();

router.post('/registro', signup);

router.post('/login', signin);



export default router;