import { Module } from '@nestjs/common';
import { DatabaseModule } from '@root/database/database.module';

import { BookService } from './service';
import { BookController } from './controller';
import { bookProviders } from './providers';
import { UserModule } from '../user/module';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [BookController],
    providers: [BookService, ...bookProviders],
    exports: [BookService]
})
export class BookModule {}
