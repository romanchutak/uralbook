import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow } from 'class-validator';

export class CommonQueryDto {
    @ApiPropertyOptional({ name: 'page', description: 'Страница' })
    @Type(() => Number)
    @Allow()
    page?: number;

    @ApiPropertyOptional({ name: 'limit', description: 'Лимит' })
    @Type(() => Number)
    @Allow()
    limit?: number;

    @ApiPropertyOptional({ name: 'sort', description: 'Сортировка' })
    @Allow()
    sort?: string;
}
