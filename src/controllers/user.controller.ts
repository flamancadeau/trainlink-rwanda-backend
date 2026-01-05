import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { registerUserSchema, loginUserSchema, updateUserSchema } from '../validators/user.validation';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { error } = registerUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const result = await userService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { error } = loginUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const result = await userService.login(req.body.email, req.body.password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async getProfile(req: any, res: Response) {
    try {
      const user = await userService.getProfile(req.user.userId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProfile(req: any, res: Response) {
    try {
      const { error } = updateUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const user = await userService.updateProfile(req.user.userId, req.body);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: any, res: Response) {
    try {
      const result = await userService.deleteUser(req.user.userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}