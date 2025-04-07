import { Router } from 'express';

import { getAllSkillsController } from '../controllers/skillController';

const router = Router();

router.get('/', getAllSkillsController);

export default router;
