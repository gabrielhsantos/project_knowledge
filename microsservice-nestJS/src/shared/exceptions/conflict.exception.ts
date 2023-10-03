import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(errorMessage: string) {
    super(errorMessage, HttpStatus.CONFLICT);
  }
}
