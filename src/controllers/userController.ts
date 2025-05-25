import { Request, Response } from 'express';
import status from 'http-status';
import { userService } from '../services';

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
            const user = await userService.getUser({ id: id.toString() });
            res.status(status.OK).json(user);
        } else if (email) {
            const user = await userService.getUser({ email: email.toString() });
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
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const updateRefreshTokensUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (id) {
            const user = await userService.updateRefreshTokensUser(id, req.body);
            res.status(status.OK).json(user);
        } else {
            throw new Error('Not supplied id');
        }
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
};
