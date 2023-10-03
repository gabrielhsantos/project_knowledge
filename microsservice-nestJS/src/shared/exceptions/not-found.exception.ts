import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(errorMessage: string) {
    super(errorMessage, HttpStatus.NOT_FOUND);
  }
}
