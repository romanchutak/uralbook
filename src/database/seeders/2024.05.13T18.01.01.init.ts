import { Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {

    const t = await sequelize.transaction();

    try {
        await sequelize.getQueryInterface().bulkInsert('user', [{
            fullname: 'User',
            role: 'user',
        }], { transaction: t });

        await t.commit();

    } catch (e) {
        console.log(e);
        await t.rollback();
    }
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.query('TRUNCATE TABLE `user`');
};
