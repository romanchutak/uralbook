import { BelongsTo, Column, DataType,
    ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { OrderModel } from './order.model';
import { TBookOrder, TBookOrderCA } from '../types';
import { BookModel } from '@root/modules/book/model';
import { BOOK_ORDER_TABLE_NAME } from '../constants';

@Table({ tableName: BOOK_ORDER_TABLE_NAME })
export class BookOrderModel extends Model<TBookOrder, TBookOrderCA> {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => BookModel)
    @Column({
        type: DataType.INTEGER,
        field: 'book_id',
    })
    bookId: number;

    @ForeignKey(() => OrderModel)
    @Column({
        type: DataType.INTEGER,
        field: 'order_id',
    })
    orderId: number;

    @Column({
        field: 'created_at',
        type: DataType.DATE
    })
    createdAt: Date;

    @Column({
        field: 'updated_at',
        type: DataType.DATE
    })
    updatedAt: Date;

    /** Assosiations */

    @BelongsTo(() => BookModel, {
        foreignKey: 'bookId',
        onDelete: 'CASCADE'
    })
    book: BookModel;

    @BelongsTo(() => OrderModel, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE'
    })
    order: OrderModel;
    /** End Assosiations */
}
