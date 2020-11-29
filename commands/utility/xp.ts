import Command from '../../bot/prototypes/Command';
import client, { level_system } from '../../bot/client';
import discord = require('discord.js');
import {dialogs} from '../../bot/dialog-handler';

export default new class extends Command{
    aliases: string[] = ['level', 'lvl'];
    description: string = `Get information about xp and stuff`;
    usage: string = `*xp`;
    exec(msg: discord.Message, cmd: string, args: string[], prefix: string, language: string): void {
        level_system.getLevel(msg.author.id, msg.guild?.id)
            .then(level_data=>{
                let embed = new discord.MessageEmbed();
                embed.setTitle('Level Status');
                embed.addField('Global Level', `${level_data.global.level}`);
                embed.addField('Global XP', `${level_data.global.xp} / ${level_system.xpToNext(level_data.global.level)}`);
                if(level_data.local != undefined){
                    embed.addField('Local Level', `${level_data.local.level}`);
                    embed.addField('Local XP', `${level_data.local.xp} / ${level_system.xpToNext(level_data.local.level)}`);
                }
                msg.reply(embed) 
            })
            .catch(()=>{
                msg.reply('It may be that you dont have a level');
            })
    }
    
}