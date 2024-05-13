import { AUTHOR_REPOSITORY } from './constants';
import { AuthorModel } from './model';

export const AuthorProviders = [
    {
        provide: AUTHOR_REPOSITORY,
        useValue: AuthorModel,
    }
];
