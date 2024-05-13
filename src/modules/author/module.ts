import { Module } from '@nestjs/common';

import { AuthorService } from './service';
import { AuthorProviders } from './providers';
import { DatabaseModule } from '@root/database/database.module';
import { CommonModule } from '../common/module';
import { AuthorController } from './controller';
import { UserModule } from '../user/module';

@Module({
    imports: [DatabaseModule, CommonModule, UserModule],
    controllers: [AuthorController],
    providers: [AuthorService, ...AuthorProviders],
    exports: [AuthorService]
})
export class AuthorModule {}
