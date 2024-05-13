import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import LoggingInterceptor from './common/interceptor/logging.interceptor';
import { CustomValidationPipeExceptionFactory } from './common/pipe/validation.pipe.exception.factory';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.useGlobalInterceptors(
        new LoggingInterceptor(new Logger('HTTP')),
    );

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        skipMissingProperties: true,
        transform: true,
        exceptionFactory: CustomValidationPipeExceptionFactory
    }));

    const swaggerConfig = new DocumentBuilder()
        .setTitle('API DOCS')
        .setDescription('API DOCS')
        .setVersion('1.1.1')
        .addTag('some tag')
        .build();

    const DynamicDocument = SwaggerModule.createDocument(app, swaggerConfig, {});

    SwaggerModule.setup('/swagger/v1/docs', app, DynamicDocument);

    await app.listen(configService.get('port', 9999), () =>
        console.log(
            'Server is started ON PORT: ' + configService.get('port', 9999),
        ),);
}
bootstrap();
