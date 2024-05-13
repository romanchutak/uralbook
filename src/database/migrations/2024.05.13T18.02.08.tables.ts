import { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.transaction(async transaction => {
        await sequelize.query('CREATE TABLE IF NOT EXISTS "author" ("id"  SERIAL UNIQUE , "fullname" VARCHAR(255) NOT NULL, PRIMARY KEY ("id"));', { transaction });
        await sequelize.query('CREATE INDEX "author_name" ON "author" ("fullname")', { transaction });
        await sequelize.query('CREATE TABLE IF NOT EXISTS "book" ("id"  SERIAL UNIQUE , "title" VARCHAR(255) NOT NULL, "author_id" INTEGER NOT NULL REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));', { transaction });
        await sequelize.query('CREATE INDEX "book_title" ON "book" ("title")', { transaction });
        await sequelize.query('CREATE TABLE IF NOT EXISTS "order" ("id"  SERIAL UNIQUE , "user_id" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "status" VARCHAR(32) DEFAULT \'open\', PRIMARY KEY ("id"));', { transaction });
        await sequelize.query('CREATE TABLE IF NOT EXISTS "book_order" ("id"  SERIAL , "book_id" INTEGER REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "order_id" INTEGER REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, UNIQUE ("book_id", "order_id"), PRIMARY KEY ("id"));', { transaction });
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.transaction(async transaction => {
        await sequelize.query('DROP TABLE IF EXISTS "book_order"', { transaction });
        await sequelize.query('DROP TABLE IF EXISTS "order"', { transaction });
        await sequelize.query('DROP INDEX "book_title"', { transaction });
        await sequelize.query('DROP TABLE IF EXISTS "book"', { transaction });
        await sequelize.query('DROP INDEX "author_name"', { transaction });
        await sequelize.query('DROP TABLE IF EXISTS "author"', { transaction });
    });
};
