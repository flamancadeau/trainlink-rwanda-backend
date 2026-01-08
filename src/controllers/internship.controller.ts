import { Request, Response } from 'express';
import { InternshipService } from '../services/internship.service';
import {
  createInternshipSchema,
  updateInternshipSchema,
} from '../validators/internship.validation';
import { successResponse, AppError } from '../utils';

const internshipService = new InternshipService();

export class InternshipController {
  async createInternship(req: Request, res: Response) {
    const { error } = createInternshipSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const internship = await internshipService.createInternship(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: 'Internship created successfully',
      data: internship,
    });
  }

  async getInternshipById(req: Request, res: Response) {
    const internship = await internshipService.getInternshipById(
      req.params.id,
    );

    if (!internship) {
      throw new AppError('Internship not found', 404);
    }

    return successResponse(res, {
      data: internship,
      message: 'Internship retrieved successfully',
    });
  }

  async getAllInternships(req: Request, res: Response) {
    const filters = {
      location: req.query.location as string,
      skills: req.query.skills
        ? (req.query.skills as string).split(',')
        : undefined,
    };

    const internships = await internshipService.getAllInternships(filters);

    return successResponse(res, {
      data: internships,
      message: 'Internships retrieved successfully',
    });
  }

  async getInternshipsByCompany(req: Request, res: Response) {
    const internships = await internshipService.getInternshipsByCompany(
      req.params.companyId,
    );

    return successResponse(res, {
      data: internships,
      message: 'Internships retrieved successfully',
    });
  }

  async updateInternship(req: Request, res: Response) {
    const { error } = updateInternshipSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const internship = await internshipService.updateInternship(
      req.params.id,
      req.body,
    );

    if (!internship) {
      throw new AppError('Internship not found', 404);
    }

    return successResponse(res, {
      message: 'Internship updated successfully',
      data: internship,
    });
  }

  async uploadInternshipImage(
    req: Request & { file?: Express.Multer.File },
    res: Response,
  ) {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    const internship = await internshipService.uploadInternshipImage(
      req.params.id,
      req.file.path,
    );

    if (!internship) {
      throw new AppError('Internship not found', 404);
    }

    return successResponse(res, {
      message: 'Internship image uploaded successfully',
      data: internship,
    });
  }

  async deleteInternship(req: Request, res: Response) {
    const result = await internshipService.deleteInternship(req.params.id);

    if (!result) {
      throw new AppError('Internship not found', 404);
    }

    return successResponse(res, {
      message: 'Internship deleted successfully',
    });
  }
}
