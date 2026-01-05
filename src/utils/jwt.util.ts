import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object): string => {
    const options: SignOptions = {

        expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any
    };

    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};