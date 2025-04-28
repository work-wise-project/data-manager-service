import { Router } from 'express';
import { uploadResume, getResume } from '../controllers/resumeController';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('resume'), uploadResume);
router.get('/:userId', getResume);

export default router;
