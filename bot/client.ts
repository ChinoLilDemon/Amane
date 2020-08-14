import discord = require('discord.js');
import fs = require('fs');
import path = require('path');
import Command from './prototypes/Command';
import * as db from '../db-handler';
import config from '../configure';



export var command_categories = new discord.Collection<string, string[]>();
export var command_list = new discord.Collection<string, Command>();
export var command_aliases = new discord.Collection<string, string>();

var client = new discord.Client();

function hasPrefix(msg: discord.Message, cb: (prefix: string)=>void){
    var reg = new RegExp('^<@!'+client.user?.id+'>').exec(msg.content);
    if(reg){
        cb(reg[0]);
        return;
    }
    if(msg.guild){
        db.findPrefix(msg.guild.id).then(v=>{
            if(v){
                if(msg.content.startsWith(v.prefix)) cb(v.prefix);
            }
            else{
                if(msg.content.startsWith(config.prefix)) cb(config.prefix);
            }
        })
        .catch(()=>{
            if (msg.content.startsWith(config.prefix)) cb(config.prefix);
        });
    }
    else{
        if (msg.content.startsWith(config.prefix)) cb(config.prefix);
    }
}

client.on('ready',()=>{
    // creating command list 
    console.log('initialising command list...');
    var cmd_dir = path.join(__dirname, '..', 'commands');
    fs.readdirSync(cmd_dir).map(v=>{
        var commands = new discord.Collection<string, Command>();
        fs.readdirSync(path.join(cmd_dir, v))
            .map(j => commands.set(path.parse(j).name, require(`../commands/${v}/${path.parse(j).name}`).default));
        command_categories.set(v, commands.keyArray());
        commands.map((value, key)=>{
            command_list.set(key, value);
            console.log('initialised command : ' + key);
            value.aliases?.map(alias=>{
                command_aliases.set(alias, key);
                console.log('initialised alias : ' + alias);
            });
        })
    })
    console.log(`${client.user?.username} successfully started`);
});

client.on('message', (msg)=>{
    if(msg.author.bot) return;
    console.log(msg.content);
    hasPrefix(msg, prefix=>{
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
                    command.exec(msg, cmd, args, prefix);
                else
                    msg.reply(`you don't have the needed permissions to use this command.`);
            else
                msg.reply('This command can only be used in nsfw channels');
        }
    });
})

export default client;