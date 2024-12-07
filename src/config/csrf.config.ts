import { doubleCsrf, DoubleCsrfConfig } from 'csrf-csrf';
import { Request } from 'express';

export const doubleCsrfUtilities: DoubleCsrfConfig = {
  getSessionIdentifier: () => '', // Ensure you provide a session identifier.
  cookieName: 'x-csrf-token',
  getSecret: () => process.env.CSRF_SECRET, // Ensure `CSRF_SECRET` is set in `.env`.
  cookieOptions: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Set to 1 week for example.
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
  size: 64,
  delimiter: '-',
  ignoredMethods: ['GET', 'OPTIONS'],
  getTokenFromRequest: (req: Request) => req.headers['x-csrf-token'], // Reads token from cookie.
  errorConfig: {
    statusCode: 403,
    message: 'Invalid CSRF token',
    code: 'CSRF_ERROR',
  },
};

export const {
  generateToken,

  doubleCsrfProtection,
} = doubleCsrf(doubleCsrfUtilities);
