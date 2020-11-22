import Command from '../../bot/prototypes/Command';
import client from '../../bot/client';
import discord = require('discord.js');
import {dialogs} from '../../bot/dialog-handler';

export default new class extends Command{
    aliases: string[] = [];
    description: string = `Get information about the bot and its creator.`;
    usage: string = `*info`;
    exec(msg: discord.Message, cmd: string, args: string[], prefix?: string | undefined): void {
        var embed = new discord.MessageEmbed;
        Promise.all([
            client.generateInvite('ADMINISTRATOR'), 
            ])
            .then(v=>{
                embed.setTitle('INFO');
                embed.addField(dialogs.get('en').info.author, 'ChinoLilDemon#0001', true);
                embed.addField(dialogs.get('en').info.fw, 'discord.js & node-canvas', true);
                embed.addField(dialogs.get('en').info.invite, `[click here](${v[0]})`);
                embed.addField(dialogs.get('en').info.advert, `[click here](https://discord.gg/BqMJJEw)`);
                embed.addField('Ping', 'pinging...');
                msg.channel.send(embed).then(m=>{
                    embed.fields[embed.fields.length - 1].value = `${m.createdTimestamp - msg.createdTimestamp}ms`;
                    m.edit(embed);
                })
        })
    }
    
}