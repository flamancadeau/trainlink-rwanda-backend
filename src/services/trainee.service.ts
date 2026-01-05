import { Trainee } from '../database/models/trainee';

export class TraineeService {
  async createTrainee(traineeData: any) {
    const trainee = await Trainee.create(traineeData);
    return trainee;
  }

  async getTraineeById(traineeId: string) {
    const trainee = await Trainee.findByPk(traineeId);
    if (!trainee) {
      throw new Error('Trainee not found');
    }
    return trainee;
  }

  async getAllTrainees() {
    return await Trainee.findAll();
  }

  async updateTrainee(traineeId: string, updateData: any) {
    const trainee = await Trainee.findByPk(traineeId);
    if (!trainee) {
      throw new Error('Trainee not found');
    }
    await trainee.update(updateData);
    return trainee;
  }

  async uploadResume(traineeId: string, resumeUrl: string) {
    const trainee = await Trainee.findByPk(traineeId);
    if (!trainee) {
      throw new Error('Trainee not found');
    }
    await trainee.update({ resumeUrl });
    return trainee;
  }

  async deleteTrainee(traineeId: string) {
    const trainee = await Trainee.findByPk(traineeId);
    if (!trainee) {
      throw new Error('Trainee not found');
    }
    await trainee.destroy();
    return { message: 'Trainee deleted successfully' };
  }
}