import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';

import { OrderModel } from './models/order.model';

import { OrderService } from './service';

import { OrderQueryDto } from './dto/order.query.dto';
import { CreateOrderDto } from './dto/create.order.dto';
import { AddRemoveBookDto } from './dto/add.remove.book.dto';
import { SuccessResponseDto } from '../common/dto/success.response.dto';
import { ORDER_API_TAG, ORDER_CONTROLLER_PATH } from './constants';

@ApiTags(ORDER_API_TAG)
@Controller(ORDER_CONTROLLER_PATH)
export class OrderController {
    constructor(private service: OrderService) {}

    @ApiOperation({ summary: 'Создание заказа' })
    @ApiResponse({ status: 200, type: OrderModel })
    @ApiBody({ type: CreateOrderDto })
    @UseGuards(AuthGuard)
    @Post()
    create(
        @Body() dto: CreateOrderDto,
    ): Promise<OrderModel> {
        return this.service.create(dto);
    }

    @ApiOperation({ summary: 'Добавление / Удаление книги' })
    @ApiResponse({ status: 200, type: SuccessResponseDto })
    @ApiBody({ type: AddRemoveBookDto })
    @UseGuards(AuthGuard)
    @Post('book')
    addRemoveBook(
        @Body() dto: AddRemoveBookDto,
    ): Promise<SuccessResponseDto> {
        return this.service.addRemoveBook(dto);
    }

    @ApiOperation({ summary: 'Список заказов' })
    @ApiResponse({ status: 200, type: OrderModel, isArray: true })
    @Get()
    search(@Query() query: OrderQueryDto): Promise<OrderModel[]> {
        return this.service.search(query);
    }
}
