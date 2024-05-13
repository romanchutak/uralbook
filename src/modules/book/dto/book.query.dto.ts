import { Allow } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CommonQueryDto } from '@root/modules/common/dto/query.dto';

export class BookQueryDto extends CommonQueryDto {
    @ApiPropertyOptional({ name: 'author', description: 'Поиск по автору' })
    @Allow()
    author: string;

    @ApiPropertyOptional({ name: 'title', description: 'Поиск по названию' })
    @Allow()
    title: string;
}
