import { DataTypes, Model, Sequelize } from 'sequelize';

export class Application extends Model {
  public applicationId!: string;
  public traineeId!: string;
  public internshipId!: string;
  public status!: string;
  public dateApplied!: Date;
  public resumeUrl!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initApplicationModel = (sequelize: Sequelize) => {
  Application.init(
    {
      applicationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      traineeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'trainees',
          key: 'traineeId',
        },
      },
      internshipId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'internships', 
          key: 'internshipId',
        },
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending',
      },
      dateApplied: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'applications',
      timestamps: true,
    }
  );

  return Application;
};

export default Application;
