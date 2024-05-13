import { AuthorModel } from '@root/modules/author/model';
import { UserModel } from '../modules/user/model';
import { BookModel } from '@root/modules/book/model';
import { BookOrderModel } from '@root/modules/order/models/book.order.model';
import { OrderModel } from '@root/modules/order/models/order.model';

export const models = [
    UserModel,
    AuthorModel,
    BookModel,
    OrderModel,
    BookOrderModel,
];
