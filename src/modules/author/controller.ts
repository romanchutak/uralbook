import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { AUTHOR_API_TAG, AUTHOR_CONTROLLER_PATH } from './constants';
import { AuthGuard } from '../auth/auth.guard';

import { CreateAuthorDto } from './dto/create.author.dto';
import { AuthorService } from './service';
import { AuthorModel } from './model';
import { AuthorQueryDto } from './dto/author.query.dto';


@ApiTags(AUTHOR_API_TAG)
@Controller(AUTHOR_CONTROLLER_PATH)
export class AuthorController {
    constructor(private service: AuthorService) {}

    @ApiOperation({ summary: 'Добавление автора' })
    @ApiResponse({ status: 200, type: AuthorModel })
    @ApiBody({ type: CreateAuthorDto })
    @UseGuards(AuthGuard)
    @Post()
    create(
        @Body() dto: CreateAuthorDto,
    ): Promise<AuthorModel> {
        return this.service.create(dto);
    }

    @ApiOperation({ summary: 'Список авторов' })
    @ApiResponse({ status: 200, type: AuthorModel, isArray: true })
    @Get()
    all(
        @Query() query: AuthorQueryDto,
    ): Promise<AuthorModel[]> {
        return this.service.all(query);
    }
}
