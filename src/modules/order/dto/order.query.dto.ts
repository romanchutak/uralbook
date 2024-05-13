import { toNumber } from '@root/common/transform';
import { CommonQueryDto } from '@root/modules/common/dto/query.dto';
import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';

export class OrderQueryDto extends CommonQueryDto {
    @Transform(toNumber)
    @Allow()
    id: number;

    @Transform(toNumber)
    @Allow()
    bookId: number;
}
