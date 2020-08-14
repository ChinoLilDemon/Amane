import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('guild_prefix', tbl=>{
        tbl.string('id').primary();
        tbl.string('prefix').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('guild_prefix');
}

