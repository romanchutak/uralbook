import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({ description: 'Books IDs' })
    @IsDefined()
    @IsNotEmpty()
    @Allow()
    bookId: number[];
}
