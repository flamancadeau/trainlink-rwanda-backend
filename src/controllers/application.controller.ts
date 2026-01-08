import { Request, Response } from "express";
import { ApplicationService } from "../services/application.service";
import {
  createApplicationSchema,
  updateApplicationStatusSchema,
} from "../validators/application.validation";
import { successResponse, AppError } from "../utils";

const applicationService = new ApplicationService();

export class ApplicationController {
  async createApplication(req: Request, res: Response) {
    const { error } = createApplicationSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const application = await applicationService.createApplication(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: "Application successfully created!",
      data: application,
    });
  }

  async getApplicationById(req: Request, res: Response) {
    const application = await applicationService.getApplicationById(
      req.params.id
    );

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    return successResponse(res, {
      data: application,
      message: "Application retrieved successfully",
    });
  }

  async getApplicationsByTrainee(req: Request, res: Response) {
    const applications = await applicationService.getApplicationsByTrainee(
      req.params.traineeId
    );

    return successResponse(res, {
      data: applications,
      message: "Applications retrieved successfully",
    });
  }

  async getApplicationsByInternship(req: Request, res: Response) {
    const applications = await applicationService.getApplicationsByInternship(
      req.params.internshipId
    );

    return successResponse(res, {
      data: applications,
      message: "Applications retrieved successfully",
    });
  }

  async updateApplicationStatus(req: Request, res: Response) {
    const { error } = updateApplicationStatusSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      req.body.status
    );

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    return successResponse(res, {
      message: "Application status successfully updated!",
      data: application,
    });
  }

  async deleteApplication(req: Request, res: Response) {
    const result = await applicationService.deleteApplication(req.params.id);

    if (!result) {
      throw new AppError("Application not found", 404);
    }

    return successResponse(res, {
      message: "Application successfully deleted!",
    });
  }
}
