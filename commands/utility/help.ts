import * as client from '../../bot/client';
import Command from '../../bot/prototypes/Command';
import discord = require('discord.js');

export default new class extends Command {
    aliases: string[] = [];
    description: string = "Sends you a list of commands";
    usage: string = '*help';
    exec(msg: discord.Message, cmd: string, args: string[], prefix?: string): void {
        let promise_list = [];
        for(let i of client.command_categories.keyArray()){
            let embed = new discord.MessageEmbed();
            embed.setTitle(i.toUpperCase());
            var description = '';
            client.command_categories.get(i)?.map(command_name=>{
                description = description.concat(command_name + ' - ' + client.command_list.get(command_name)?.description);
            });
            embed.setDescription(description);
            promise_list.push(msg.author.send(embed));
        }
        Promise.all(promise_list).then(()=>{
            msg.reply('you got mail!');
        })
    }
}();