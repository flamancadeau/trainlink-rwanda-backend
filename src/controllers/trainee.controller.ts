import { Request, Response } from 'express';
import { TraineeService } from '../services/trainee.service';
import { createTraineeSchema, updateTraineeSchema } from '../validators/trainee.validation';

const traineeService = new TraineeService();

export class TraineeController {
  async createTrainee(req: Request, res: Response) {
    try {
      const { error } = createTraineeSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const trainee = await traineeService.createTrainee(req.body);
      res.status(201).json(trainee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTraineeById(req: Request, res: Response) {
    try {
      const trainee = await traineeService.getTraineeById(req.params.id);
      res.status(200).json(trainee);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllTrainees(req: Request, res: Response) {
    try {
      const trainees = await traineeService.getAllTrainees();
      res.status(200).json(trainees);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTrainee(req: Request, res: Response) {
    try {
      const { error } = updateTraineeSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const trainee = await traineeService.updateTrainee(req.params.id, req.body);
      res.status(200).json(trainee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async uploadResume(req: any, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const trainee = await traineeService.uploadResume(req.params.id, req.file.path);
      res.status(200).json(trainee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTrainee(req: Request, res: Response) {
    try {
      const result = await traineeService.deleteTrainee(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}