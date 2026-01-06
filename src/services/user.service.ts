import bcrypt from 'bcrypt';
import { db } from '../config/database'; 
import { generateToken } from '../utils/jwt.util';

export class UserService {
  private get models() {
    return db;
  }

  async register(userData: any) {
    const { User, Trainee, Company } = this.models;

    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    if (user.role === 'Trainee') {
      await Trainee.create({ traineeId: user.userId, firstName: '', lastName: '' });
    } else if (user.role === 'Company') {
      await Company.create({ companyId: user.userId, companyName: userData.username });
    }

    const token = generateToken({ userId: user.userId, email: user.email, role: user.role });
    return { user: this.sanitizeUser(user), token };
  }

async login(email: string, password: string) {
    const { User } = this.models;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = generateToken({ userId: user.userId, email: user.email, role: user.role });
    
    return { 
        message: 'Login successful', 
        user: this.sanitizeUser(user), 
        token 
    };
}

  async getProfile(userId: string) {
    const { User } = this.models;
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    return this.sanitizeUser(user);
  }

  async updateProfile(userId: string, updateData: any) {
    const { User } = this.models;
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.update(updateData);
    return this.sanitizeUser(user);
  }

  async deleteUser(userId: string) {
    const { User } = this.models;
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.destroy();
    return { message: 'User deleted successfully' };
  }

  private sanitizeUser(user: any) {
    if (!user) return null;
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }
}