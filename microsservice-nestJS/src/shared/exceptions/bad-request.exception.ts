import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(errorMessage: string) {
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
