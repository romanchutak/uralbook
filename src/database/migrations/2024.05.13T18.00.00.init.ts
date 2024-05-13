import { Migration } from '../umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.query('CREATE TABLE IF NOT EXISTS "user" ("id"  SERIAL UNIQUE , "role" VARCHAR(128) DEFAULT \'user\', "fullname" VARCHAR(255) NOT NULL, PRIMARY KEY ("id"));');
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('user');
};
