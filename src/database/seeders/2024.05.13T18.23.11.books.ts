import { Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {

    const t = await sequelize.transaction();

    try {
        await sequelize
        .getQueryInterface()
        .bulkInsert(
            'book',
            [
                {
                    title: 'Отцы и Дети',
                    author_id: 1
                },
                {
                    title: 'Хоббит',
                    author_id: 2

                },
                {
                    title: 'Туда и обратно',
                    author_id: 3
                },
                {
                    title: 'Империя наносит ответный удар',
                    author_id: 1
                },
                {
                    title: 'Звезда жизни',
                    author_id: 2

                },
                {
                    title: 'Час быка',
                    author_id: 3
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
    await sequelize.query('TRUNCATE TABLE "book" CASCADE');
};
