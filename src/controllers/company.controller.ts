import { Request, Response } from 'express';
import { CompanyService } from './../services/company.service';
import { createCompanySchema, updateCompanySchema } from '../validators/company.validation';

const companyService = new CompanyService();

export class CompanyController {
  async createCompany(req: Request, res: Response) {
    try {
      const { error } = createCompanySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const company = await companyService.createCompany(req.body);
      res.status(201).json(company);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCompanyById(req: Request, res: Response) {
    try {
      const company = await companyService.getCompanyById(req.params.id);
      res.status(200).json(company);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllCompanies(req: Request, res: Response) {
    try {
      const companies = await companyService.getAllCompanies();
      res.status(200).json(companies);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const { error } = updateCompanySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const company = await companyService.updateCompany(req.params.id, req.body);
      res.status(200).json(company);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async uploadLogo(req: any, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const company = await companyService.uploadLogo(req.params.id, req.file.path);
      res.status(200).json(company);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCompany(req: Request, res: Response) {
    try {
      const result = await companyService.deleteCompany(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}