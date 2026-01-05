import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import { initTraineeModel, Trainee } from './trainee';
import { initCompanyModel, Company } from './company';
import { initInternshipModel, Internship } from './internship';
import { initApplicationModel, Application } from './application';

export const initModels = (sequelize: Sequelize) => {
  // Initialize models
  initUserModel(sequelize);
  initTraineeModel(sequelize);
  initCompanyModel(sequelize);
  initInternshipModel(sequelize);
  initApplicationModel(sequelize);

  // Define associations
  User.hasOne(Trainee, { foreignKey: 'traineeId', as: 'traineeProfile' });
  Trainee.belongsTo(User, { foreignKey: 'traineeId', as: 'user' });

  User.hasOne(Company, { foreignKey: 'companyId', as: 'companyProfile' });
  Company.belongsTo(User, { foreignKey: 'companyId', as: 'user' });

  Company.hasMany(Internship, { foreignKey: 'companyId', as: 'internships' });
  Internship.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

  Trainee.hasMany(Application, { foreignKey: 'traineeId', as: 'applications' });
  Application.belongsTo(Trainee, { foreignKey: 'traineeId', as: 'trainee' });

  Internship.hasMany(Application, { foreignKey: 'internshipId', as: 'applications' });
  Application.belongsTo(Internship, { foreignKey: 'internshipId', as: 'internship' });

  return {
    User,
    Trainee,
    Company,
    Internship,
    Application,
  };
};