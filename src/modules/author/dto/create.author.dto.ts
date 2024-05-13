import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class CreateAuthorDto {

    @ApiProperty({ description: 'FIO' })
    @Allow()
    fullname: string;
}
