import { Internship } from "../database/models/internship";
import { Company } from "../database/models/company";
import { Op } from "sequelize";

export class InternshipService {
  async createInternship(internshipData: any) {
    try {
      const company = await Company.findByPk(internshipData.companyId);
      if (!company) {
        throw new Error("Company not found");
      }
      const internship = await Internship.create(internshipData);
      return {
        message: "Internship successfully created!",
        internship: internship,
      };
    } catch (error: any) {
      throw new Error(`Error creating internship: ${error.message}`);
    }
  }

  async getInternshipById(internshipId: string) {
    const internship = await Internship.findByPk(internshipId, {
      include: [{ model: Company, as: "company" }],
    });
    if (!internship) {
      throw new Error("Internship not found");
    }
    return internship;
  }

  async getAllInternships(filters?: any) {
    const where: any = {};

    if (filters?.location) {
      where.location = { [Op.iLike]: `%${filters.location}%` };
    }
    if (filters?.skills) {
      where.skillsRequired = { [Op.overlap]: filters.skills };
    }

    return await Internship.findAll({
      where,
      include: [{ model: Company, as: "company" }],
      order: [["createdAt", "DESC"]],
    });
  }

  async getInternshipsByCompany(companyId: string) {
    return await Internship.findAll({
      where: { companyId },
      order: [["createdAt", "DESC"]],
    });
  }

  async updateInternship(internshipId: string, updateData: any) {
    const internship = await Internship.findByPk(internshipId);
    if (!internship) {
      throw new Error("Internship not found");
    }
    await internship.update(updateData);
    return internship;
  }

  async uploadInternshipImage(internshipId: string, imageUrl: string) {
    const internship = await Internship.findByPk(internshipId);
    if (!internship) {
      throw new Error("Internship not found");
    }
    await internship.update({ internshipImageUrl: imageUrl });
    return internship;
  }

  async deleteInternship(internshipId: string) {
    const internship = await Internship.findByPk(internshipId);
    if (!internship) {
      throw new Error("Internship not found");
    }
    await internship.destroy();
    return { message: "Internship deleted successfully" };
  }
}
