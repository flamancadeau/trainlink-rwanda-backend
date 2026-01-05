import { DataTypes, Model, Sequelize } from 'sequelize';

export class Internship extends Model {
  public internshipId!: string;
  public companyId!: string;
  public title!: string;
  public description!: string;
  public location!: string;
  public startDate!: Date;
  public endDate!: Date;
  public applicationDeadline!: Date;
  public skillsRequired!: string[];
  public companyWebsiteUrl!: string | null;
  public internshipImageUrl!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initInternshipModel = (sequelize: Sequelize) => {
  Internship.init(
    {
      internshipId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      companyId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'companies', 
          key: 'companyId',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      applicationDeadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      skillsRequired: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      companyWebsiteUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      internshipImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'internships',
      timestamps: true,
    }
  );

  return Internship;
};

export default Internship;
