import { BOOK_ORDER_REPOSITORY, ORDER_REPOSITORY } from './constants';
import { BookOrderModel } from './models/book.order.model';
import { OrderModel } from './models/order.model';

export const orderProviders = [
    {
        provide: ORDER_REPOSITORY,
        useValue: OrderModel,
    },
    {
        provide: BOOK_ORDER_REPOSITORY,
        useValue: BookOrderModel
    },
];
