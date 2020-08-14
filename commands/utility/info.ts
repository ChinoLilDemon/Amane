import Command from '../../bot/prototypes/Command';
import client from '../../bot/client';
import discord = require('discord.js');

export default new class extends Command{
    aliases: string[] = [];
    description: string = `Get information about the bot and its creator.`;
    usage: string = `*info`;
    exec(msg: discord.Message, cmd: string, args: string[], prefix?: string | undefined): void {
        var embed = new discord.MessageEmbed;
        Promise.all([
            client.generateInvite('ADMINISTRATOR'), 
            client.guilds.resolve('620254110188306472')?.channels.resolve('622675046913146900')?.createInvite({
                maxAge: undefined,
                temporary: false,
                maxUses: undefined,
                unique: false,
                reason: 'advertising'
            })])
            .then(v=>{
                embed.setTitle('INFO');
                embed.addField('Author', 'ChinoLilDemon#0001', true);
                embed.addField('Framework', 'discord.js & node-canvas', true);
                embed.addField('Invite Me', `[click here](${v[0]})`);
                embed.addField('Join our Server', `[click here](${v[1]})`);
        
                embed.addField('Ping', 'pinging...');
                msg.channel.send(embed).then(m=>{
                    embed.fields[embed.fields.length - 1].value = `${m.createdTimestamp - msg.createdTimestamp}ms`;
                    m.edit(embed);
                })
        })
    }
    
}