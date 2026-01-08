import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../validators/company.validation";
import { successResponse, AppError } from "../utils";

const companyService = new CompanyService();

export class CompanyController {
  async createCompany(req: Request, res: Response) {
    const { error } = createCompanySchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const company = await companyService.createCompany(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: "Company created successfully",
      data: company,
    });
  }

  async getCompanyById(req: Request, res: Response) {
    const company = await companyService.getCompanyById(req.params.id);

    if (!company) {
      throw new AppError("Company not found", 404);
    }

    return successResponse(res, {
      data: company,
      message: "Company retrieved successfully",
    });
  }

  async getAllCompanies(req: Request, res: Response) {
    const companies = await companyService.getAllCompanies();

    return successResponse(res, {
      data: companies,
      message: "Companies retrieved successfully",
    });
  }

  async updateCompany(req: Request, res: Response) {
    const { error } = updateCompanySchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const company = await companyService.updateCompany(req.params.id, req.body);

    if (!company) {
      throw new AppError("Company not found", 404);
    }

    return successResponse(res, {
      message: "Company updated successfully",
      data: company,
    });
  }

  async uploadLogo(
    req: Request & { file?: Express.Multer.File },
    res: Response
  ) {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const company = await companyService.uploadLogo(
      req.params.id,
      req.file.path
    );

    if (!company) {
      throw new AppError("Company not found", 404);
    }

    return successResponse(res, {
      message: "Company logo uploaded successfully",
      data: company,
    });
  }

  async deleteCompany(req: Request, res: Response) {
    const result = await companyService.deleteCompany(req.params.id);

    if (!result) {
      throw new AppError("Company not found", 404);
    }

    return successResponse(res, {
      message: "Company deleted successfully",
    });
  }
}
