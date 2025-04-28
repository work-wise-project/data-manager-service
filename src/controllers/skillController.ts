import { userService } from '../services/userService';
import { Request, Response } from 'express';
import status from 'http-status';
import { skillService } from '../services/skillService';

// export const addSkillToUserController = async (req: Request, res: Response) => {
//   const { userId, skillName } = req.body;

//   try {
//     const updatedUser = await skillService.addSkillToUser(userId, skillName);
//     res.status(status.OK).json(updatedUser);
//   } catch (error) {
//     res.status(status.BAD_REQUEST).send(error);
//   }
// };

export const getAllSkillsController = async (req: Request, res: Response) => {
  try {
    const allSkills = await skillService.getAllSkills();
    res.status(status.OK).json(allSkills);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error);
  }
};
