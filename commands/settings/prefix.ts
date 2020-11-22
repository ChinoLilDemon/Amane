import Command from '../../bot/prototypes/Command';
import * as discord from 'discord.js';
import * as db from '../../db-handler';
import config from '../../configure';
import { guild_setting_manager } from '../../bot/client';
import { dialogs } from '../../bot/dialog-handler';

export default new class extends Command {
    aliases: string[] = [];
    description: string = dialogs.get('en').prefix.description;
    usage: string = "*prefix [prefix] - setting prefix\n*prefix reset - resetting prefix to default";
    constructor() {
        super();
        this.permissions = "ADMINISTRATOR";
    }
    exec(msg: discord.Message, cmd: string, args: string[], prefix?: string): void {
        if (msg.guild) {
            //@ts-ignore
            var guild_prefix = guild_setting_manager.getPrefix(msg.guild?.id);

            if (args.length > 0) {
                if (args[0].length > 3) {
                    if (args[0] == 'reset') {
                        //@ts-ignore
                        guild_setting_manager.deletePrefix(msg.guild.id)
                            .then(() => {
                                msg.reply(dialogs.get('en').prefix.reset);
                            })
                            .catch(reason => {
                                msg.reply(dialogs.get('en').prefix.reset_err);
                            })
                    }
                    else
                        msg.reply(dialogs.get('en').prefix.new_prefix_to_long);
                    return;
                }
                //@ts-ignore
                guild_setting_manager.setPrefix(msg.guild?.id, args[0])
                    .then(() => {
                        //@ts-ignore
                        msg.reply(
                            (dialogs.get('en').prefix.change_successful as string)
                            .replace(/\[prefix\]/g, args[0])
                            );
                    })
                    .catch(reason => {
                        msg.reply(dialogs.get('en').prefix.change_err);
                    })
            }
            else {
                if (guild_prefix)
                    msg.reply(
                        (dialogs.get('en').prefix.get_guild_prefix as string)
                        .replace(/\[prefix\]/g, guild_prefix)
                        );
                else
                    msg.reply(
                        (dialogs.get('en').prefix.get_default_prefix as string)
                        .replace(/\[prefix\]/g, config.prefix)
                        )
            }
        }
        else {
            msg.reply(dialogs.get('en').exceptions.only_in_guilds)
        }
    }

}();