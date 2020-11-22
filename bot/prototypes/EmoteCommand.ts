import Command from './Command';
import discord = require('discord.js');
import client from '../client';
import fs = require('fs');
import path = require('path');
import {dialogs} from '../dialog-handler';

export default class extends Command{
    aliases: string[];
    description: string;
    usage: string;

    command_name: string;

    folder: string;
    imageOnSolo: boolean;
    
    folder_content_list: string[] = [];

    constructor(command_name: string, folder: string, aliases: string[], usage: string, imageOnSolo: boolean, nsfw = false){
        super();
        this.folder = folder;
        this.aliases = aliases;

        this.usage = usage;
        this.imageOnSolo = imageOnSolo;
        this.nsfw = nsfw;

        this.command_name = command_name;
        this.description = dialogs.get('en')[this.command_name].description;

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
    exec(msg: discord.Message, cmd: string, args: string[], prefix?: string, language?: string): void {
        if(!msg.member) return;
        let embed = new discord.MessageEmbed;
        let mention = msg.mentions.members?.find(v => v.id != client.user?.id);
        if(mention){
            embed.description = dialogs.get('en')[this.command_name].multi.replace('[member]', msg.member.toString()).replace('[mention]', mention.toString());
            embed = this.addImage(embed);
        }
        else{
            if (this.imageOnSolo == false){ 
                msg.channel.send(dialogs.get('en')[this.command_name].solo.replace('[member]', msg.member.toString()).trim().replace(/\s+/, ' '));
                return;
            }
            embed.description = dialogs.get('en')[this.command_name].solo.replace('[member]', msg.member.toString());
            embed = this.addImage(embed);
        }

        msg.channel.send(embed);
    }
}