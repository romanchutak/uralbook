import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorModel } from './model';
import { CurrentUserProvider } from '../common/current.user.provider';
import { AUTHOR_REPOSITORY } from './constants';
import { CreateAuthorDto } from './dto/create.author.dto';
import { AuthorQueryDto } from './dto/author.query.dto';
import { FindAndCountOptions, Op } from 'sequelize';

@Injectable()
export class AuthorService {
    constructor (
        @Inject(AUTHOR_REPOSITORY)
        @InjectModel(AuthorModel)
        private readonly repository: typeof AuthorModel,
        private readonly currentUserProvider: CurrentUserProvider
    ) {}

    async create(dto: CreateAuthorDto): Promise<AuthorModel> {
        return await this.repository.create(dto);
    }

    async all (query: AuthorQueryDto): Promise<AuthorModel[]> {

        const opts: FindAndCountOptions = { where: {} };

        if (query.id !== undefined) {
            opts.where = {
                ...opts.where,
                id: query.id
            };
        }

        if (query.fullname !== undefined) {
            opts.where = {
                ...opts.where,
                fullname: {
                    [Op.iLike]: `%${query.fullname.trim()}%`
                }
            };
        }

        return await this.repository.findAll(opts);
    }
}
