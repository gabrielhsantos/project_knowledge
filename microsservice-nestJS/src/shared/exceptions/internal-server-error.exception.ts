import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor(errorMessage: string) {
    super(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
