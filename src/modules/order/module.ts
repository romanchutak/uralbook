import { Module } from '@nestjs/common';
import { DatabaseModule } from '@root/database/database.module';
import { UserModule } from '../user/module';
import { OrderController } from './controller';
import { OrderService } from './service';
import { orderProviders } from './providers';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [OrderController],
    providers: [OrderService, ...orderProviders],
    exports: [OrderService]
})
export class OrderModule {}
