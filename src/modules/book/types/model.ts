import { TAuthor } from '@root/modules/author/types';
import { TOrder } from '@root/modules/order/types';

export type TBookCA = {
    title: string;
    authorId: number;
};

export type TBook = TBookCA & {
    id: number;

    author?: TAuthor;
    orders?: TOrder[];
};
