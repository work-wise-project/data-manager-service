import { userService } from '../services/userService';
import { Request, Response } from 'express';
import status from 'http-status';

export const addSkillToUserController = async (req: Request, res: Response) => {
  const { userId, skillName } = req.body;

  try {
    const updatedUser = await userService.addSkillToUser(userId, skillName);
    res.status(status.OK).json(updatedUser);
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error);
  }
};
