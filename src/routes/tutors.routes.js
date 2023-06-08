import { Router } from 'express';
import {getTutors, tutorSignup, deleteTutor } from '../controllers/tutors.controller.js';

const router = Router();

router.post('/registro', tutorSignup);

router.get('/', getTutors);

router.delete('/:email', deleteTutor);


export default router;