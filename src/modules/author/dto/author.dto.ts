import { BookModel } from '@root/modules/book/model';
import { CreateAuthorDto } from './create.author.dto';
import { Allow } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthorDto extends CreateAuthorDto {

    @Allow()
    @ApiProperty({ description: 'ID' })
    id: number;

    @ApiPropertyOptional({ description: 'Author Books' })
    @Allow()
    books?: BookModel[];
}
