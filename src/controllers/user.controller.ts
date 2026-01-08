import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} from '../validators/user.validation';
import { successResponse, AppError } from '../utils';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  try {
    const result = await userService.register(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err: any) {
    if (err.message === 'Email already exists') {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exists',
      });
    }
    throw err; // rethrow other errors
  }
}


  async login(req: Request, res: Response) {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const result = await userService.login(
      req.body.email,
      req.body.password,
    );

    return successResponse(res, {
      message: 'Login successful',
       data: { token: result.token },
    });
  }

  async getProfile(req: Request & { user?: { userId: string } }, res: Response) {
    if (!req.user?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const user = await userService.getProfile(req.user.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return successResponse(res, {
      data: user,
      message: 'Profile retrieved successfully',
    });
  }

  async updateProfile(req: Request & { user?: { userId: string } }, res: Response) {
    if (!req.user?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const user = await userService.updateProfile(req.user.userId, req.body);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return successResponse(res, {
      message: 'Profile updated successfully',
      data: user,
    });
  }

  async deleteUser(req: Request & { user?: { userId: string } }, res: Response) {
    if (!req.user?.userId) {
      throw new AppError('Unauthorized', 401);
    }

    const result = await userService.deleteUser(req.user.userId);

    if (!result) {
      throw new AppError('User not found', 404);
    }

    return successResponse(res, {
      message: 'User deleted successfully',
    });
  }
}
