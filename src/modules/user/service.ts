import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './model';
import { USER_REPOSITORY } from './constants';

@Injectable()
export class UserService {
    constructor (
        @Inject(USER_REPOSITORY)
        @InjectModel(UserModel)
        private readonly repository: typeof UserModel,
    ) {}

    async read (id: number): Promise<UserModel> {
        return await this.repository.findByPk(id);
    }
}
