import { Request, Response } from 'express';
import { ApplicationService } from '../services/application.service';
import { createApplicationSchema, updateApplicationStatusSchema } from '../validators/application.validation';

const applicationService = new ApplicationService();

export class ApplicationController {
  async createApplication(req: Request, res: Response) {
    try {
      const { error } = createApplicationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const application = await applicationService.createApplication(req.body);
      res.status(201).json(application);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getApplicationById(req: Request, res: Response) {
    try {
      const application = await applicationService.getApplicationById(req.params.id);
      res.status(200).json(application);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getApplicationsByTrainee(req: Request, res: Response) {
    try {
      const applications = await applicationService.getApplicationsByTrainee(req.params.traineeId);
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getApplicationsByInternship(req: Request, res: Response) {
    try {
      const applications = await applicationService.getApplicationsByInternship(req.params.internshipId);
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateApplicationStatus(req: Request, res: Response) {
    try {
      const { error } = updateApplicationStatusSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const application = await applicationService.updateApplicationStatus(req.params.id, req.body.status);
      res.status(200).json(application);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteApplication(req: Request, res: Response) {
    try {
      const result = await applicationService.deleteApplication(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}