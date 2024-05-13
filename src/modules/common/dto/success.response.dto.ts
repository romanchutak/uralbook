import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class SuccessResponseDto {
    @ApiProperty({ name: 'success', description: 'Идентификатор удачности завершения запроса' })
    @Allow()
    success: boolean;
}
