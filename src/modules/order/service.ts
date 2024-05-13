import { FindOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Inject, Injectable } from '@nestjs/common';

import { CurrentUserProvider } from './../common/current.user.provider';

import { TOrder } from './types';

import { BOOK_ORDER_REPOSITORY, ORDER_REPOSITORY } from './constants';

import { BookModel } from '../book/model';
import { OrderModel } from './models/order.model';
import { BookOrderModel } from './models/book.order.model';

import { OrderQueryDto } from './dto/order.query.dto';
import { CreateOrderDto } from './dto/create.order.dto';
import { AddRemoveBookDto } from './dto/add.remove.book.dto';
import { SuccessResponseDto } from '../common/dto/success.response.dto';
import { raw } from 'express';
import { intersection } from '@root/common/utils';


@Injectable()
export class OrderService {
    constructor (
        @Inject(ORDER_REPOSITORY)
        @InjectModel(OrderModel)
        private readonly repository: typeof OrderModel,
        @Inject(BOOK_ORDER_REPOSITORY)
        private readonly bookOrderRepository: typeof BookOrderModel,
        private readonly currentUserProvider: CurrentUserProvider
    ) {}

    async create(dto: CreateOrderDto): Promise<OrderModel> {
        return await this.repository.sequelize.transaction(async transaction => {
            const order = await this.repository.create({
                ...dto,
                userId: this.currentUserProvider.getUser().id
            }, { transaction });

            for (const bookId of dto.bookId) {
                await this.bookOrderRepository.create({
                    orderId: order.id,
                    bookId
                }, { transaction });
            }

            return order;
        });
    }

    async search(query: OrderQueryDto): Promise<OrderModel[]> {
        const bookInclude = { model: BookModel, where: {}, through: { attributes: [] } };
        const opts: FindOptions<TOrder> = { where: {}, include: [bookInclude] };

        let _idFilter = [];

        if (query.id !== undefined) {
            // opts.where = {
            //     ...opts.where,
            //     id: query.id
            // };

            _idFilter = [query.id];
        }

        if (query.bookId !== undefined) {
            const orderIds = await this.bookOrderRepository.findAll({
                where: {
                    bookId: query.bookId
                },
                raw: true,
                attributes: ['orderId']
            }) || [];

            const asarray = orderIds.map(obj => obj.orderId);

            if (asarray.length == 0) {
                return [];
            } else _idFilter = intersection(_idFilter, asarray);
        }

        if (_idFilter.length > 0) {
            opts.where = { ...opts.where, id: _idFilter };
        }

        return await this.repository.findAll(opts);
    }

    async addRemoveBook(dto: AddRemoveBookDto): Promise<SuccessResponseDto> {
        const [bookOrder, created] = await this.bookOrderRepository.findOrCreate({ where: {
            bookId: dto.bookId,
            orderId: dto.orderId
        }, defaults: {
            bookId: dto.bookId,
            orderId: dto.orderId
        } });

        if (!created) {
            await bookOrder.destroy();
        }

        return { success: true };
    }
}
