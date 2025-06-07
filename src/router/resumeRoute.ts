import { Router } from 'express';
import {
    uploadResume,
    getResume,
    createResumeAnalysis,
    createResumeSpellCheck,
    getResumeAnalysis,
    getResumeSpellCheck,
} from '../controllers/resumeController';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('resume'), uploadResume);
router.get('/:userId', getResume);
router.post('/analysis', createResumeAnalysis);
router.post('/spellcheck', createResumeSpellCheck);
router.get('/analysis/:userId', getResumeAnalysis);
router.get('/spellcheck/:userId', getResumeSpellCheck);

export default router;
