import discord = require('discord.js');

export default abstract class {
    abstract aliases: string[];
    abstract description: string;
    abstract usage: string;
    permissions:  discord.PermissionResolvable = 0;
    nsfw: boolean = false;
    abstract exec(msg: discord.Message, cmd: string, args: string[], prefix?: string): void;
}