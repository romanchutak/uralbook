import { AllowNull, Column, DataType, HasMany, Index, Model,
    PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { TAuthor, TAuthorCA } from './types/model';
import { AUTHOR_TABLE_NAME } from './constants';
import { BookModel } from '../book/model';

@Table({ tableName: AUTHOR_TABLE_NAME, createdAt: false, updatedAt: false })
export class AuthorModel extends Model<TAuthor, TAuthorCA> {
    @Unique
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @AllowNull(false)
    @Index({ name: 'author_name' })
    @Column({
        type: DataType.STRING,
    })
    fullname: string;

    /** Associations */

    @HasMany(() => BookModel, 'authorId')
    books: BookModel[];

    /** End Associations */
}
