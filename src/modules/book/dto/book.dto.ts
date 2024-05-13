import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthorDto } from '@root/modules/author/dto/author.dto';
import { Allow } from 'class-validator';

export class BookDto {
    @ApiProperty({ description: 'ID' })
    @Allow()
    id: number;

    @ApiProperty({ description: 'Название' })
    @Allow()
    title: string;

    @ApiProperty({ description: 'Author ID' })
    @Allow()
    authorId: number;

    @ApiPropertyOptional({ description: 'Информация об авторе' })
    @Allow()
    author?: AuthorDto;
}
