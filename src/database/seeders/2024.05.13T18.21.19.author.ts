import { Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {

    const t = await sequelize.transaction();

    try {
        await sequelize
        .getQueryInterface()
        .bulkInsert(
            'author',
            [
                {
                    fullname: 'Тургенев',
                },
                {
                    fullname: 'Петров',
                },
                {
                    fullname: 'Иванов',
                },

            ],
        { transaction: t });

        await t.commit();

    } catch (e) {
        console.log(e);
        await t.rollback();
    }
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.query('TRUNCATE TABLE "author" CASCADE');
};
