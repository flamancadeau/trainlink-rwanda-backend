import { Request, Response } from 'express';
import { InternshipService } from '../services/internship.service';
import { createInternshipSchema, updateInternshipSchema } from '../validators/internship.validation';

const internshipService = new InternshipService();

export class InternshipController {
  async createInternship(req: Request, res: Response) {
    try {
      const { error } = createInternshipSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const internship = await internshipService.createInternship(req.body);
      res.status(201).json(internship);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getInternshipById(req: Request, res: Response) {
    try {
      const internship = await internshipService.getInternshipById(req.params.id);
      res.status(200).json(internship);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllInternships(req: Request, res: Response) {
    try {
      const filters = {
        location: req.query.location as string,
        skills: req.query.skills ? (req.query.skills as string).split(',') : undefined,
      };
      const internships = await internshipService.getAllInternships(filters);
      res.status(200).json(internships);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInternshipsByCompany(req: Request, res: Response) {
    try {
      const internships = await internshipService.getInternshipsByCompany(req.params.companyId);
      res.status(200).json(internships);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateInternship(req: Request, res: Response) {
    try {
      const { error } = updateInternshipSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const internship = await internshipService.updateInternship(req.params.id, req.body);
      res.status(200).json(internship);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async uploadInternshipImage(req: any, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const internship = await internshipService.uploadInternshipImage(req.params.id, req.file.path);
      res.status(200).json(internship);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteInternship(req: Request, res: Response) {
    try {
      const result = await internshipService.deleteInternship(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
