import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { BookBodyDto, BookResponseDto } from '@core/domain/dtos/book.dto';
import { bookResponse } from '@app/presenters/book.mapper';
import { CreateBookService } from '@services/book/create-book.service';

type handleResponse = BookResponseDto | InternalServerErrorException;

@ApiTags('books')
@Controller('books')
export class CreateBookController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly bookService: CreateBookService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de novos livros.' })
  @ApiResponse({
    status: 201,
    description: 'Livro criado com sucesso.',
  })
  async handle(@Body() bookBodyDto: BookBodyDto): Promise<handleResponse> {
    try {
      const newBook = await this.bookService.create(bookBodyDto);

      return bookResponse(newBook);
    } catch (error) {
      switch (error.status) {
        case HttpStatus.CONFLICT:
          throw new ConflictException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
