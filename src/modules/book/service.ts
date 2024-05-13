import { FindOptions, Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Inject, Injectable } from '@nestjs/common';

import { BookModel } from './model';
import { AuthorModel } from '../author/model';

import { TBook } from './types';

import { CreateBookDto } from './dto/create.book.dto';
import { BookQueryDto } from './dto/book.query.dto';
import { BOOK_REPOSITORY } from './constants';

@Injectable()
export class BookService {
    constructor (
        @Inject(BOOK_REPOSITORY)
        @InjectModel(BookModel)
        private readonly repository: typeof BookModel,
    ) {}

    async create(dto: CreateBookDto): Promise<BookModel> {
        return await this.repository.create(dto);
    }

    async search(query: BookQueryDto): Promise<BookModel[]> {
        const authorInclude = { model: AuthorModel, where: {} };
        const opts: FindOptions<TBook> = { where: {}, include: [authorInclude] };

        if (query.title !== undefined) {
            opts.where = {
                ...opts.where,
                title: {
                    [Op.iLike]: `%${query.title.trim()}%`
                }
            };
        }

        if (query.author !== undefined) {
            authorInclude.where = {
                ...authorInclude.where,
                fullname: {
                    [Op.iLike]: `%${query.author.trim()}%`
                }
            };
        }

        return await this.repository.findAll(opts);
    }
}
