import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTableIfNotExists('global_level', tbl => {
            tbl.string('user').primary();
            tbl.integer('xp').notNullable();
            tbl.integer('level').notNullable();
        })
        .createTableIfNotExists('local_level', tbl => {
            tbl.string('user').notNullable();
            tbl.string('guild').notNullable();
            tbl.integer('xp').notNullable();
            tbl.integer('level').notNullable();
            tbl.primary(['user', 'guild'])
        })
        .createTableIfNotExists('level_announce_channel', tbl => {
            tbl.string('guild').primary();
            tbl.string('channel').notNullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropSchemaIfExists('global_level')
        .dropTableIfExists('local_level')
        .dropTableIfExists('level_announce_channel')
}

