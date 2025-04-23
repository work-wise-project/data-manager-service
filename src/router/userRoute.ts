import { Router } from 'express';
import { createUser, getUserByIdOrEmailController, updateUser } from '../controllers/userController';

export const router = Router();

router.get('/', getUserByIdOrEmailController);

router.post('/', createUser);

router.put('/:id', updateUser);
