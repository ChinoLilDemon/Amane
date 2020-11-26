import discord = require('discord.js');
import fs = require('fs');
import path = require('path');
import Command from './prototypes/Command';
import * as db from '../db-handler';
import config from '../configure';
import {GuildSettingManager} from './guild-setting-manager';
import {logger} from '../logger';
import { dialogs } from './dialog-handler';

export var guild_setting_manager: GuildSettingManager;

export var command_categories = new discord.Collection<string, string[]>();
export var command_list = new discord.Collection<string, Command>();
export var command_aliases = new discord.Collection<string, string>();

var client = new discord.Client();

function hasPrefix(msg: discord.Message, cb: (prefix: string)=>void){
    var prefix = (msg.guild) 
        ? guild_setting_manager.getPrefix(msg.guild.id) || config.prefix 
        : config.prefix;
    if(msg.content.startsWith(prefix)) cb(prefix);
}

client.on('ready',()=>{
    // creating command list 
    logger.info('initialising command list...');
    var cmd_dir = path.join(__dirname, '..', 'commands');
    fs.readdirSync(cmd_dir).map(v=>{
        var commands = new discord.Collection<string, Command>();
        fs.readdirSync(path.join(cmd_dir, v))
            .map(j => commands.set(path.parse(j).name, require(`../commands/${v}/${path.parse(j).name}`).default));
        command_categories.set(v, commands.keyArray());
        commands.map((value, key)=>{
            command_list.set(key, value);
            logger.info('initialised command : ' + key);
            value.aliases?.map(alias=>{
                command_aliases.set(alias, key);
                logger.info('initialised alias : ' + alias);
            });
        })
    })
    guild_setting_manager = new GuildSettingManager(client.guilds.cache.map(guild => guild.id ));
    logger.info(`${client.user?.username} successfully started`);
});

client.on('message', (msg)=>{
    if(msg.author.bot) return;
    hasPrefix(msg, prefix=>{
        let lang = 'en';
        var args: string[] = msg.content.substr(prefix.length).trim().split(/\s+/);
        var cmd = args.shift();
        if(!cmd) return;
        var cmdAlias = command_aliases.get(cmd.toLowerCase());
        if(cmdAlias) cmd = cmdAlias;
        var command = command_list.get(cmd.toLowerCase());
        if(command){
            if(command.nsfw == false || 
                (msg.channel instanceof discord.GuildChannel && msg.channel.nsfw) || 
                msg.channel instanceof discord.DMChannel)
                if (msg.member?.hasPermission(command.permissions) !== false)
                    command.exec(msg, cmd, args, prefix, lang);
                else
                    msg.reply(dialogs.get(lang).exceptions.not_enough_perms);
            else
                msg.reply(dialogs.get(lang).exceptions.only_in_nsfw);
        }
    });
})

export default client;
