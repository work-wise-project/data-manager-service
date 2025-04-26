import { Router } from 'express';
import { uploadResume } from '../controllers/resumeController';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('resume'), uploadResume);

export default router;
