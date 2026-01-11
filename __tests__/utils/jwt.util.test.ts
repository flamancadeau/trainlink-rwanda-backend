import * as jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../src/utils/jwt.util';


jest.mock('jsonwebtoken');

describe('JWT Utils', () => {
  const mockPayload = { userId: '123', email: 'test@example.com' };
  const mockToken = 'mock.jwt.token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    test('should generate a token with correct payload', () => {
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const token = generateToken(mockPayload);

      expect(jwt.sign).toHaveBeenCalledWith(
        mockPayload,
        expect.any(String), // secret key
        expect.objectContaining({ expiresIn: expect.any(String) })
      );
      expect(token).toBe(mockToken);
    });
  });

  describe('verifyToken', () => {
    test('should verify and decode token successfully', () => {
      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      const decoded = verifyToken(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
      expect(decoded).toEqual(mockPayload);
    });

    test('should throw error for invalid token', () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => verifyToken(mockToken)).toThrow('Invalid token');
    });
  });
});