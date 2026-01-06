import { Company } from '../database/models/company';

export class CompanyService {
async createCompany(companyData: any) {
  try {
    const company = await Company.create(companyData);
    return {
      message: 'Company successfully created!',
      company: company, 
    };
  } catch (error: any) {

    throw new Error(`Error creating company: ${error.message}`);
  }
}


  async getCompanyById(companyId: string) {
    const company = await Company.findByPk(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  async getAllCompanies() {
    return await Company.findAll();
  }

  async updateCompany(companyId: string, updateData: any) {
    const company = await Company.findByPk(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    await company.update(updateData);
    return company;
  }

  async uploadLogo(companyId: string, logoUrl: string) {
    const company = await Company.findByPk(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    await company.update({ companyLogoUrl: logoUrl });
    return company;
  }

  async deleteCompany(companyId: string) {
    const company = await Company.findByPk(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    await company.destroy();
    return { message: 'Company deleted successfully' };
  }
}