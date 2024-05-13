import { USER_REPOSITORY } from './constants';
import { UserModel } from './model';

export const userProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: UserModel,
    },
];
