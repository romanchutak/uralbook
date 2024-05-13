import { Dialect } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { TConfig, TDatabaseConfig } from '@root/config/types';

import { models } from './models.for.providers';
import { DATABASE_PROVIDER_NAME } from './constants';

export const databaseProviders = [{
    provide: DATABASE_PROVIDER_NAME,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService<TConfig>): Promise<Sequelize> => {
        const databaseConfig = configService.get<TDatabaseConfig>('database');

        const sequelize = new Sequelize({
            port: databaseConfig.port,
            host: databaseConfig.host,
            dialect: databaseConfig.dialect as Dialect,
            username: databaseConfig.username,
            password: databaseConfig.password,
            database: databaseConfig.database,
            timezone: databaseConfig.timezone,
            pool: {
                max: 10,
                min: 0,
                acquire: 60000,
                idle: 10000
            },
            models: models,
        });

        // await sequelize.sync({
        //     // force: true
        //     alter: { drop: false },
        //     logging: true
        // });

        return sequelize;
    },
}];
