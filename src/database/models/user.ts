import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';


export class User extends Model {
  public userId!: string; 
  public email!: string;
  public password!: string;
  public role!: string;
  public phoneNumber!: number | null;
  public address!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: uuidv4, 
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("Trainee", "Company"),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.BIGINT, 
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true, 
    }
  );

  return User;
};

export default User;
