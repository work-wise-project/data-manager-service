import { Router } from 'express';
import { createUser, getUserByIdOrEmailController, updateUser } from '../controllers/userController';

export const userRouter = Router();

userRouter.get('/', getUserByIdOrEmailController);

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser);
