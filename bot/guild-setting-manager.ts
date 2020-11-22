import config from '../configure';
import * as db from '../db-handler';
import client from './client';
import { logger } from '../logger';

interface GuildSettings {
    prefix: string | null;
    // TODO: add log settings
}

export class GuildSettingManager {
    private guildList: Map<string, GuildSettings>

    constructor(guildIDs: string[]) {
        this.guildList = new Map();

        // load list of guild settings out of database
        guildIDs.forEach(guildID => {
            Promise
                .all([
                    db.findPrefix(guildID), // get prefix data out of the database => v[0]

                ])
                .then(v => {
                    logger.info(`config of guild '${guildID}' successfully loaded`)
                    this.guildList.set(guildID, {
                        prefix: v[0]?.prefix || null,

                    })
                })
        })
    }

    getPrefix(guildID: string): string | null {
        return this.guildList.get(guildID)?.prefix || null;
    }

    setPrefix(guildID: string, prefix: string): Promise<void> {
        return new Promise((resolve, reject) => {
            var guildSettings = this.guildList.get(guildID);

            if (guildSettings?.prefix) {
                db.changePrefix(guildID, prefix)
                    .then(() => {
                        logger.info(`changed prefix from guild '${guildID}' from '${guildSettings?.prefix}' to '${prefix}'`)
                        if (guildSettings) {
                            guildSettings.prefix = prefix;
                            this.guildList.set(guildID, guildSettings)
                        }
                        resolve();
                    })
                    .catch(reason => {
                        logger.error(`Failed to change prefix with reason: ${reason}`);
                        reject(reason);
                    })
            }
            else {
                if (!guildSettings) {
                    guildSettings = {
                        prefix: null
                    };
                }
                db.insertPrefix(guildID, prefix)
                    .then(() => {
                        logger.info(`changed prefix from guild '${guildID}' to '${prefix}'`)
                        if (guildSettings) {
                            guildSettings.prefix = prefix;
                            this.guildList.set(guildID, guildSettings)
                        }
                        resolve();
                    })
                    .catch(reason => {
                        logger.error(`Failed to change prefix with reason: ${reason}`);
                        reject(reason);
                    })
            }

        })
    }

    deletePrefix(guildID: string): Promise<void> {
        return new Promise((resolve, reject) => {
            let guildSettings = this.guildList.get(guildID);
            if (guildSettings?.prefix) {
                db.removePrefix(guildID)
                    .then(() => {
                        logger.info(`removed prefix of guild '${guildID}'`);
                        resolve();
                    })
                    .catch(reason => {
                        logger.error(`some unexpected mistake happened while removing prefix of guild '${guildID}`, reason)
                        reject(reason);
                    })
            }
            else {
                logger.warn(`tried to delete prefix of guild '${guildID}' but no prefix was found.`)
                reject('no prefix found')
            }
        })
    }
}