import { TConfig } from './types';

export default (): TConfig => ({
    port: parseInt(process.env.PORT, 10) || 9999,
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        dialect: process.env.DATABASE_DIALECT || 'postgres',
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASS || '123',
        database: process.env.DATABASE_DATABASE || 'bookstore',
        timezone: process.env.TZ || 'Asia/Yekaterinburg',
    }
});
