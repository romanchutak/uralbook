import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/module';
import { ConfigModule } from '@nestjs/config';
import config from '@root/config/configuration';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception/AllExceptionsFilter';
import { AuthorModule } from './modules/author/module';
import { BookModule } from './modules/book/module';
import { CommonModule } from './modules/common/module';
import { OrderModule } from './modules/order/module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        CommonModule,
        UserModule,
        AuthorModule,
        BookModule,
        OrderModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        Logger,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter
        },
    ],
})
export class AppModule {}
