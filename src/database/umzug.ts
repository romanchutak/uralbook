import fs = require('fs');
import path = require('path');
import dotenv = require('dotenv');
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    storage: 'sequelize',
    host: process.env.DATABASE_MIGRATION_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    timezone: process.env.TZ || 'Asia/Yekaterinburg',
});

export const migrator = new Umzug({
    migrations: {
        glob: ['migrations/*.ts', { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
        modelName: 'migration_meta',
    }),
    logger: console,
    create: {
        template: filepath => [
            [filepath, fs.readFileSync(path.join(__dirname, 'template/sample-migration.ts')).toString()],
        ],
    }
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
    migrations: {
        glob: ['seeders/*.ts', { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
        modelName: 'seeder_meta',
    }),
    logger: console,
});

export type Seeder = typeof seeder._types.migration;
