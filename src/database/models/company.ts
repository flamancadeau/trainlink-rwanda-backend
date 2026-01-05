import { DataTypes, Model, Sequelize } from 'sequelize';

export class Company extends Model {
  public companyId!: string;
  public companyName!: string;
  public companyDescription!: string | null;
  public industryType!: string | null;
  public companyLogoUrl!: string | null;
  public companyWebsiteUrl!: string | null;
  public companyLocation!: string | null;
  public contactEmail!: string | null;
  public contactPhone!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCompanyModel = (sequelize: Sequelize) => {
  Company.init(
    {
      companyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      industryType: {
        type: DataTypes.ENUM(
          'Tech',
          'Finance',
          'Health',
          'Marketing',
          'Education',
          'Other'
        ),
        allowNull: true,
      },
      companyLogoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyWebsiteUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'companies',
      timestamps: true,
    }
  );

  return Company;
};

export default Company;
