import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model,
    PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { TOrder, TOrderCA, TStatus } from '../types';
import { ORDER_TABLE_NAME, SOME_UNIQ_BOOK_ORDER_THROUGH_KEY } from '../constants';
import { UserModel } from '../../user/model';
import { BookModel } from '@root/modules/book/model';
import { BookOrderModel } from './book.order.model';

@Table({ tableName: ORDER_TABLE_NAME, createdAt: false, updatedAt: false })
export class OrderModel extends Model<TOrder, TOrderCA> {
    @Unique
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        field: 'user_id'
    })
    @ForeignKey(() => UserModel)
    userId: number;

    @Column({
        type: DataType.STRING(32),
        defaultValue: 'open'
    })
    status: TStatus;

    /** Associations */

    @BelongsTo(() => UserModel, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    })
    user: UserModel;

    @BelongsToMany(
        () => BookModel,
        {
            through: () => BookOrderModel,
            uniqueKey: SOME_UNIQ_BOOK_ORDER_THROUGH_KEY
        }
    )
    books: BookModel[];

    @HasMany(() => BookOrderModel, 'orderId')
    bookOrders: BookOrderModel[];

    /** End Associations */
}
