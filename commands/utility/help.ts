import * as client from '../../bot/client';
import Command from '../../bot/prototypes/Command';
import discord = require('discord.js');
import { dialogs } from '../../bot/dialog-handler';

export default new class extends Command {
    aliases: string[] = [];
    description: string = dialogs.get('en').help.description;
    usage: string = '*help';
    exec(msg: discord.Message, cmd: string, args: string[], prefix: string, language: string): void {
        let promise_list = [];
        for(let i of client.command_categories.keyArray()){
            let embed = new discord.MessageEmbed();
            embed.setTitle(i.toUpperCase());
            var description = '';
            client.command_categories.get(i)?.map(command_name=>{
                description = description.concat(command_name + ' - ' + dialogs.get(language)[command_name].description + '\n');
            });
            embed.setDescription(description);
            promise_list.push(msg.author.send(embed));
        }
        Promise.all(promise_list).then(()=>{
            msg.reply(dialogs.get('en').help.response);
        })
    }
}();