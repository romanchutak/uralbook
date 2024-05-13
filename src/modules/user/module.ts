import { Module } from '@nestjs/common';
import { DatabaseModule } from '@root/database/database.module';
import { UserService } from './service';
import { userProviders } from './providers';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [UserService, ...userProviders],
    exports: [UserService],
    controllers: []
})
export class UserModule {}
