import { toNumber } from '@root/common/transform';
import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';

export class AddRemoveBookDto {
    @Allow()
    @Transform(toNumber)
    bookId: number;

    @Allow()
    @Transform(toNumber)
    orderId: number;
}
