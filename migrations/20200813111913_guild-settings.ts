import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('guild_prefix', tbl => {
            tbl.string('id').primary(); // guild id
            tbl.string('prefix').notNullable();
        })
        .createTable('ban_log_channel', tbl => {
            tbl.string('guild');
            tbl.string('channel');
            tbl.primary(['guild', 'channel'])
        })
        .createTable('kick_log_channel', tbl => {
            tbl.string('guild');
            tbl.string('channel');
            tbl.primary(['guild', 'channel']);
        })
        .createTable('msg_log_channel', tbl => {
            tbl.string('guild');
            tbl.string('channel');
            tbl.primary(['guild', 'channel']);
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('guild_prefix')
        .dropTableIfExists('ban_log_channel')
        .dropTableIfExists('kick_log_channel')
        .dropTableIfExists('msg_log_channel')
}

