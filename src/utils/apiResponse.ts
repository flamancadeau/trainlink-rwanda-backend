import { Response } from 'express';

interface SuccessResponseOptions<T> {
  data?: T;
  message?: string;
  statusCode?: number;
}

export const successResponse = <T>(
  res: Response,
  options: SuccessResponseOptions<T>,
) => {
  const { data, message, statusCode = 200 } = options;

  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
