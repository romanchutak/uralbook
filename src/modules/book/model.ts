import { BOOK_TABLE_NAME } from './constants';
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Index, Model,
    PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { TBook, TBookCA } from './types/model';
import { AuthorModel } from '../author/model';
import { BookOrderModel } from '../order/models/book.order.model';
import { OrderModel } from '../order/models/order.model';
import { SOME_UNIQ_BOOK_ORDER_THROUGH_KEY } from '../order/constants';

@Table({ tableName: BOOK_TABLE_NAME, createdAt: false, updatedAt: false })
export class BookModel extends Model<TBook, TBookCA> {
    @Unique
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @AllowNull(false)
    @Index({ name: 'book_title' })
    @Column({
        type: DataType.STRING
    })
    title: string;

    @AllowNull(false)
    @ForeignKey(() => AuthorModel)
    @Column({
        field: 'author_id'
    })
    authorId: number;

    /** Associations */

    @BelongsTo(() => AuthorModel, {
        foreignKey: 'authorId',
        onDelete: 'CASCADE'
    })
    author: AuthorModel;

    @BelongsToMany(
        () => OrderModel,
        {
            through: () => BookOrderModel,
            uniqueKey: SOME_UNIQ_BOOK_ORDER_THROUGH_KEY
        }
    )
    orders: OrderModel[];

    @HasMany(() => BookOrderModel, 'bookId')
    bookOrders: BookOrderModel[];

    /** End Associations */
}
