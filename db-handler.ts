import knex = require('knex');
var db = knex(require('./knexfile').development);

interface GuildPrefixData{
    id: string,
    prefix: string
}

//TODO: add ban_log_channel, kick_log_channel, msg_log_channel
//TODO: add level_announce_channel

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

/**
 * @description Changes the prefix for a guild
 * @param id guild id
 * @param prefix the new prefix
 */
export function changePrefix(id: string, prefix: string){
    return db('guild_prefix').where({id}).update({prefix});
}

export function insertLocalLevel(user: string, guild: string, xp: number, level: number){
    return db('local_level').insert({user, guild, xp, level});
}

export function removeLocalLevel(user: string, guild: string){
    return db('local_level').where({user, guild}).delete();
}

export function findLocalLevel(user: string, guild: string){
    return db('local_level').where({user, guild}).first();
}

export function changeLocalLevel(user: string, guild: string, xp: number, level: number){
    return db('local_level').where({user, guild}).update({xp, level});
}

export function allLocalLevel(){
    return db('local_level');
}

export function insertGlobalLevel(user: string, xp: number, level: number){
    return db('global_level').insert({user, xp, level});
}

export function removeGlobalLevel(user: string){
    return db('global_level').where({user}).delete();
}

export function findGlobalLevel(user: string){
    return db('global_level').where({user}).first();
}

export function changeGlobalLevel(user: string, xp: number, level: number){
    return db('global_level').where({user}).update({xp, level});
}

export function allGlobalLevel(){
    return db('global_level');
}