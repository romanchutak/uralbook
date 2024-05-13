import { AllowNull, Column, DataType, Model,
    PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { TUser, TUserCA } from './types/model';
import { USER_TABLE_NAME } from './constants';

@Table({ tableName: USER_TABLE_NAME, createdAt: false, updatedAt: false })
export class UserModel extends Model<TUser, TUserCA> {
    @Unique
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING(128),
        defaultValue: 'user'
    })
    role: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    fullname: string;
}
