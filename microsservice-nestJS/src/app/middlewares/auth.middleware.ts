import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@shared/utils/security';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
      try {
        const decodedToken = verifyToken(token);
        req.headers.userId = decodedToken.userId;
      } catch (error) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid token.' });
      }
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token not provided.' });
    }

    next();
  }
}
