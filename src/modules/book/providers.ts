import { BOOK_REPOSITORY } from './constants';
import { BookModel } from './model';

export const bookProviders = [
    {
        provide: BOOK_REPOSITORY,
        useValue: BookModel,
    },
];
