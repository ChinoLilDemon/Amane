import Command from '../../bot/prototypes/Command';
import * as discord from 'discord.js';
import * as db from '../../db-handler';
import config from '../../configure';

export default new class extends Command{
    aliases: string[] = [];
    description: string = "Changes the prefix for the Guild";
    usage: string = "*prefix [prefix] - setting prefix\n*prefix reset - resetting prefix to default";
    constructor(){
        super();
        this.permissions = "ADMINISTRATOR";
    }
    exec(msg: discord.Message, cmd: string, args: string[], prefix?: string): void {
        if(msg.guild){
            db.findPrefix(msg.guild.id).then(v=>{
                if (args.length > 0) {
                    if (args[0].length > 3) {
                        if(args[0] == 'reset'){
                            //@ts-ignore
                            db.removePrefix(msg.guild.id).then(v=>{
                                msg.reply('reseted the prefix for this guild, now using default prefix again.');
                            })
                            .catch(reason=>{
                                msg.reply(`I wasn't able to reset the prefix to default`);
                                console.log('prefix reset failed with reason: ' + reason);
                            })
                        }
                        else
                            msg.reply('i can only remember prefixes that are less than 3 characters long...');
                        return;
                    }
                    if(v)
                        //@ts-ignore
                        db.changePrefix(msg.guild.id, args[0]).then(() => {
                                msg.reply(`i successfully changed the prefix to "${args[0]}"`)
                            })
                            .catch(reason => {
                                msg.reply(`i failed to change the prefix for this place.`);
                                console.log(`Failed to change prefix with reason: ${reason}`);
                            });
                    else
                        //@ts-ignore
                        db.insertPrefix(msg.guild.id, args[0]).then(()=>{
                                msg.reply(`i successfully changed the prefix to "${args[0]}"`)
                            })
                            .catch(reason =>{
                                msg.reply(`i failed to change the prefix for this place.`);
                                console.log(`Failed to change prefix with reason: ${reason}`);
                            });
                }
                else{
                    if(v)
                        msg.reply(`the prefix for this guild is ${v.prefix}`);
                    else
                        msg.reply(`my prefix is ${config.prefix}`)
                }
            })
        }
        else{
            msg.reply('This command can only be used in guilds')
        }
    }
    
}();