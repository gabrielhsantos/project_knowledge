import { Controller, HttpStatus, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { InternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { IRequestHandler } from '@core/domain/interfaces/request-handler.interface';
import { BookResponseDto } from '@core/domain/dtos/book.dto';
import { bookListResponse } from '@app/presenters/book.mapper';
import { FindBooksListService } from '@services/book/find-books-list.service';

type handleResponse = BookResponseDto[] | InternalServerErrorException;

@ApiTags('books')
@Controller('books')
export class FindBooksListController
  implements IRequestHandler<Promise<handleResponse>>
{
  constructor(private readonly bookService: FindBooksListService) {}

  @Get()
  @ApiOperation({ summary: 'Listagem de livros.' })
  @ApiResponse({
    status: 201,
    description: 'Lista de livros.',
  })
  async handle(): Promise<handleResponse> {
    try {
      const books = await this.bookService.findAll();

      return bookListResponse(books);
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
