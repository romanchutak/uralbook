import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({
        example: 'Война и Мир',
        description: 'Название',
    })
    @IsNotEmpty()
    @IsDefined()
    @Allow()
    title: string;

    @ApiProperty({
        example: 1,
        description: 'Author ID',
    })
    @IsNotEmpty()
    @IsDefined()
    @Allow()
    authorId: number;
}
