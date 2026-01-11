import { AppError } from '../../src/utils/AppError';

describe('AppError', () => {
  describe('constructor', () => {
    test('should create error with custom message and status code', () => {
      const error = new AppError('Not found', 404);

      expect(error.message).toBe('Not found');
      expect(error.statusCode).toBe(404);
      expect(error.isOperational).toBe(true);
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
    });

    test('should create error with default status code 500', () => {
      const error = new AppError('Something went wrong');

      expect(error.message).toBe('Something went wrong');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
    });

    test('should create error with custom isOperational flag', () => {
      const error = new AppError('Database error', 500, false);

      expect(error.message).toBe('Database error');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(false);
    });

    test('should create error with default isOperational as true', () => {
      const error = new AppError('Validation error', 400);

      expect(error.isOperational).toBe(true);
    });

    test('should have stack trace', () => {
      const error = new AppError('Test error', 500);

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('AppError');
    });

    test('should be throwable', () => {
      expect(() => {
        throw new AppError('Unauthorized', 401);
      }).toThrow(AppError);

      expect(() => {
        throw new AppError('Unauthorized', 401);
      }).toThrow('Unauthorized');
    });

    test('should be catchable in try-catch', () => {
      try {
        throw new AppError('Bad request', 400);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.statusCode).toBe(400);
          expect(error.message).toBe('Bad request');
        }
      }
    });
  });

  describe('common HTTP error scenarios', () => {
    test('should create 400 Bad Request error', () => {
      const error = new AppError('Invalid input', 400);

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid input');
    });

    test('should create 401 Unauthorized error', () => {
      const error = new AppError('Please authenticate', 401);

      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Please authenticate');
    });

    test('should create 403 Forbidden error', () => {
      const error = new AppError('Access denied', 403);

      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Access denied');
    });

    test('should create 404 Not Found error', () => {
      const error = new AppError('Resource not found', 404);

      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Resource not found');
    });

    test('should create 500 Internal Server error', () => {
      const error = new AppError('Internal server error', 500);

      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Internal server error');
    });
  });

  describe('error properties', () => {
    test('should have readonly statusCode property', () => {
      const error = new AppError('Test', 404);

      expect(error.statusCode).toBe(404);
      // TypeScript will prevent this at compile time, but we can verify the property exists
      expect(Object.getOwnPropertyDescriptor(error, 'statusCode')).toBeDefined();
    });

    test('should have readonly isOperational property', () => {
      const error = new AppError('Test', 500, false);

      expect(error.isOperational).toBe(false);
      expect(Object.getOwnPropertyDescriptor(error, 'isOperational')).toBeDefined();
    });

    test('should inherit from Error class', () => {
      const error = new AppError('Test error', 500);

      expect(error instanceof Error).toBe(true);
      expect(error.name).toBe('Error');
    });
  });
});