import { userService } from '../services/userService';
import { Request, Response } from 'express';
import status from 'http-status';

// export const addSkillToUserController = async (req: Request, res: Response) => {
//   const { userId, skillName } = req.body;

//   try {
//     const updatedUser = await userService.addSkillToUser(userId, skillName);
//     res.status(status.OK).json(updatedUser);
//   } catch (error) {
//     res.status(status.BAD_REQUEST).send(error);
//   }
// };

export const getUserByIdOrEmailController = async (req: Request, res: Response) => {
    const { id, email } = req.query;
    try {
        if (id) {
            const user = await userService.getUserById(id.toString());
            res.status(status.OK).json(user);
        } else if (email) {
            const user = await userService.getUserByEmail(email.toString());
            res.status(status.OK).json(user);
        } else {
            throw new Error('Not supplied email or id');
        }
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(status.OK).json(user);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (id) {
            const user = await userService.updateUser(id, req.body);
            res.status(status.OK).json(user);
        } else {
            throw new Error('Not supplied id');
        }
    } catch (error) {
        console.log('error', error);

        res.status(status.BAD_REQUEST).send(error);
    }
};
