// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// // import { validateRequest } from 'src/config/csrfConfig';

// @Injectable()
// export class ValidateCSRF implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     if (req.method === 'GET') {
//       return next(); // Skip CSRF check for GET requests
//     }
//     try {
//       validateRequest(req); // This validates the token from `req.cookies`.
//       next();
//     } catch (err) {
//       console.error('CSRF Validation Failed:', err.message);
//       res.status(403).json({ message: 'Invalid CSRF token' });
//     }
//   }
// }
