import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('global_level', tbl=>{
        tbl.string('user').primary();
        tbl.string('xp').notNullable();
        tbl.string('level').notNullable();
    })
    .createTable('local_level', tbl=>{
        tbl.string('user').notNullable();
        tbl.string('guild').notNullable();
        tbl.string('xp').notNullable();
        tbl.string('level').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropSchemaIfExists('global_level')
    .dropTableIfExists('local_level');
}

