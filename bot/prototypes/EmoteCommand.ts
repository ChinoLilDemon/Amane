import Command from './Command';
import discord = require('discord.js');
import client from '../client';
import fs = require('fs');
import path = require('path');

export default class extends Command{
    aliases: string[];
    description: string;
    usage: string;

    folder: string;
    solotext: string;
    multitext: string;
    imageOnSolo: boolean;

    folder_content_list: string[];

    constructor(folder: string, aliases: string[], description: string, usage: string, solotext: string, multitext: string, imageOnSolo: boolean, nsfw = false){
        super();
        this.folder = folder;
        this.aliases = aliases;
        this.description = description;
        this.usage = usage;
        this.solotext = solotext;
        this.multitext = multitext;
        this.imageOnSolo = imageOnSolo;
        this.nsfw = nsfw;

        fs.watch(folder, (event, filename)=>{
            console.log('updating file list for emote folder with name: ' + path.parse(folder).name);
            this.folder_content_list = fs.readdirSync(folder, 'utf-8').map(v=>`${folder}/${v}`);
        }).emit('change');
    }
    addImage(embed: discord.MessageEmbed): discord.MessageEmbed{
        var rng = Math.floor(this.folder_content_list.length * Math.random());
        var attachment = new discord.MessageAttachment(this.folder_content_list[rng]);
        return embed.attachFiles([attachment]).setImage(`attachment://${path.parse(this.folder_content_list[rng]).base}`);
    }
    exec(msg: discord.Message, cmd: string, args: string[], prefix?: string): void {
        let embed = new discord.MessageEmbed;
        let mention = msg.mentions.members.find(v => v.id != client.user.id);

        if(mention){
            embed.description = this.multitext.replace('[0]', msg.member.toString()).replace('[1]', mention.toString());
            embed = this.addImage(embed);
        }
        else{
            if (this.imageOnSolo == false){
                msg.reply(this.solotext.replace('[0]', '').trim().replace(/\s+/, ' '));
                return;
            }
            embed.description = this.solotext.replace('[0]', msg.member.toString());
            embed = this.addImage(embed);
        }

        msg.channel.send(embed);
    }
}