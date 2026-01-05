import bcrypt from 'bcrypt';
import { User } from '../database/models/user';
import { Trainee } from '../database/models/trainee';
import { Company } from '../database/models/company';
import { generateToken } from '../utils/jwt.util';

export class UserService {
  async register(userData: any) {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    // Create associated profile
    if (user.role === 'Trainee') {
      await Trainee.create({ traineeId: user.userId, firstName: '', lastName: '' });
    } else if (user.role === 'Company') {
      await Company.create({ companyId: user.userId, companyName: userData.username });
    }

    const token = generateToken({ userId: user.userId, email: user.email, role: user.role });
    
    return { user: this.sanitizeUser(user), token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ userId: user.userId, email: user.email, role: user.role });
    
    return { user: this.sanitizeUser(user), token };
  }

  async getProfile(userId: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.sanitizeUser(user);
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update(updateData);
    return this.sanitizeUser(user);
  }

  async deleteUser(userId: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return { message: 'User deleted successfully' };
  }

  private sanitizeUser(user: any) {
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }
}