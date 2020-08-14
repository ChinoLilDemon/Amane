import knex = require('knex');
var db = knex(require('./knexfile').development);

interface GuildPrefixData{
    id: string,
    prefix: string
}

/**
 * @param id guild id
 * @param prefix prefix to insert
 */
export function insertPrefix(id: string, prefix: string){
    return db('guild_prefix').insert({id, prefix});
}

/**
 * @param id guild id
 */
export function removePrefix(id: string){
    return db('guild_prefix').where({id}).delete();
}

/**
 * @description Returns a Promise with GuildPrefixData or undefined if no prefix found.
 * @param id guild id
 * @returns GuildPrefixData | undefined
 */
export function findPrefix(id: string): Promise<GuildPrefixData|undefined>{
    return db('guild_prefix').where({id}).first();
}

export function changePrefix(id: string, prefix: string){
    return db('guild_prefix').where({id}).update({prefix});
}