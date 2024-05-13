import { ApiPropertyOptional } from '@nestjs/swagger';
import { toNumberArray } from '@root/common/transform';
import { CommonQueryDto } from '@root/modules/common/dto/query.dto';
import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';

export class AuthorQueryDto extends CommonQueryDto {

    @ApiPropertyOptional({ description: 'Поиск по ID' })
    @Transform(toNumberArray)
    @Allow()
    id?: number|number[]|string;

    @ApiPropertyOptional({ description: 'Поиск по fullname' })
    @Allow()
    fullname: string;
}
