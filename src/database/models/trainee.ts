import { DataTypes, Model, Sequelize } from 'sequelize';

export class Trainee extends Model {
  public traineeId!: string;
  public firstName!: string;
  public lastName!: string;
  public dateOfBirth!: Date | null;
  public gender!: string | null;
  public location!: string | null;
  public educationLevel!: string | null;
  public skills!: string[];
  public resumeUrl!: string | null;
  public interests!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initTraineeModel = (sequelize: Sequelize) => {
  Trainee.init(
    {
      traineeId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      educationLevel: {
        type: DataTypes.ENUM('High School', 'Bachelor', 'Master', 'PhD', 'Other'),
        allowNull: true,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      sequelize,
      tableName: 'trainees',
      timestamps: true,
    }
  );

  return Trainee;
};

export default Trainee;
