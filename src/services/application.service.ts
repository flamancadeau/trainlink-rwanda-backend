import { Application } from '../database/models/application';
import { Internship } from '../database/models/internship';
import { Trainee } from '../database/models/trainee';

export class ApplicationService {
  async createApplication(applicationData: any) {
    // Check if internship exists
    const internship = await Internship.findByPk(applicationData.internshipId);
    if (!internship) {
      throw new Error('Internship not found');
    }

    // Check if trainee exists
    const trainee = await Trainee.findByPk(applicationData.traineeId);
    if (!trainee) {
      throw new Error('Trainee not found');
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: {
        traineeId: applicationData.traineeId,
        internshipId: applicationData.internshipId,
      },
    });

    if (existingApplication) {
      throw new Error('Already applied to this internship');
    }

    const application = await Application.create({
      ...applicationData,
      resumeUrl: trainee.resumeUrl,
    });

    return application;
  }

  async getApplicationById(applicationId: string) {
    const application = await Application.findByPk(applicationId, {
      include: [
        { model: Trainee, as: 'trainee' },
        { model: Internship, as: 'internship' },
      ],
    });
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  async getApplicationsByTrainee(traineeId: string) {
    return await Application.findAll({
      where: { traineeId },
      include: [{ model: Internship, as: 'internship' }],
      order: [['dateApplied', 'DESC']],
    });
  }

  async getApplicationsByInternship(internshipId: string) {
    return await Application.findAll({
      where: { internshipId },
      include: [{ model: Trainee, as: 'trainee' }],
      order: [['dateApplied', 'DESC']],
    });
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    const application = await Application.findByPk(applicationId);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.update({ status });
    return application;
  }

  async deleteApplication(applicationId: string) {
    const application = await Application.findByPk(applicationId);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.destroy();
    return { message: 'Application deleted successfully' };
  }
}