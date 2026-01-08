import { Request, Response } from "express";
import { TraineeService } from "../services/trainee.service";
import {
  createTraineeSchema,
  updateTraineeSchema,
} from "../validators/trainee.validation";
import { successResponse, AppError } from "../utils";

const traineeService = new TraineeService();

export class TraineeController {
  async createTrainee(req: Request, res: Response) {
    const { error } = createTraineeSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const trainee = await traineeService.createTrainee(req.body);

    return successResponse(res, {  
      statusCode: 201,
      message: "Trainee created successfully",
      data: trainee,
    });
  }

  async getTraineeById(req: Request, res: Response) {
    const trainee = await traineeService.getTraineeById(req.params.id);

    if (!trainee) {
      throw new AppError("Trainee not found", 404);
    }

    return successResponse(res, {
      data: trainee,
      message: "Trainee retrieved successfully",
    });
  }

  async getAllTrainees(req: Request, res: Response) {
    const trainees = await traineeService.getAllTrainees();

    return successResponse(res, {
      data: trainees,
      message: "Trainees retrieved successfully",
    });
  }

  async updateTrainee(req: Request, res: Response) {
    const { error } = updateTraineeSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const trainee = await traineeService.updateTrainee(req.params.id, req.body);

    if (!trainee) {
      throw new AppError("Trainee not found", 404);
    }

    return successResponse(res, {
      message: "Trainee updated successfully",
      data: trainee,
    });
  }

  async uploadResume(
    req: Request & { file?: Express.Multer.File },
    res: Response
  ) {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const trainee = await traineeService.uploadResume(
      req.params.id,
      req.file.path
    );

    if (!trainee) {
      throw new AppError("Trainee not found", 404);
    }

    return successResponse(res, {
      message: "Resume uploaded successfully",
      data: trainee,
    });
  }

  async deleteTrainee(req: Request, res: Response) {
    const result = await traineeService.deleteTrainee(req.params.id);

    if (!result) {
      throw new AppError("Trainee not found", 404);
    }

    return successResponse(res, {
      message: "Trainee deleted successfully",
    });
  }
}
