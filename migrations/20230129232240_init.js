/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .dropTableIfExists('instruments')
        .dropTableIfExists('users')
        .createTable('instruments', (table) => {
            table.increments();
            table.string('instrument_symbol').notNullable().unique();
            table.string('instrument_name');
            table.float('usd_price');
            table.timestamps();
        })
        .createTable('users', (table) => {
            table.increments();
            table.string('email').notNullable().unique();
            table.string('password', 60);
            table.boolean('instruments_access').notNullable().defaultTo(false);
            table.timestamps();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('users')
        .dropTable('instruments');
};
