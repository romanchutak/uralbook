import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Get, UseGuards, Query } from '@nestjs/common';

import { BookService } from './service';
import { BOOK_API_TAG, BOOK_CONTROLLER_PATH } from './constants';
import { AuthGuard } from '../auth/auth.guard';
import { BookModel } from './model';

import { CreateBookDto } from './dto/create.book.dto';
import { BookQueryDto } from './dto/book.query.dto';

@ApiTags(BOOK_API_TAG)
@Controller(BOOK_CONTROLLER_PATH)
export class BookController {
    constructor(private service: BookService) {}

    @ApiOperation({ summary: 'Создание книги' })
    @ApiResponse({ status: 200, type: BookModel })
    @ApiBody({ type: CreateBookDto })
    @UseGuards(AuthGuard)
    @Post()
    create(
        @Body() dto: CreateBookDto,
    ): Promise<BookModel> {
        return this.service.create(dto);
    }

    @ApiOperation({ summary: 'Поиск книг' })
    @ApiResponse({ status: 200, type: BookModel, isArray: true })
    @Get('search')
    search(@Query() query: BookQueryDto): Promise<BookModel[]> {
        return this.service.search(query);
    }
}
