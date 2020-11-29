import { level } from 'winston';
import * as db from '../db-handler';
import { logger } from '../logger';

interface LevelInterface {
    xp: number;
    level: number;
}

interface GlobalLevelData {
    user: string;
    xp: number;
    level: number;
}
interface LocalLevelData {
    user: string;
    guild: string;
    xp: number;
    level: number;
}

export interface CombinedLevelData {
    global: LevelInterface;
    local?: LevelInterface;
}

type UserLevelMap = Map<string, LevelInterface>
type GuildLevelMap = Map<string, UserLevelMap>

export class LevelSystemManager {
    level_xp_map: Array<number> = [];
    global_user_level_map: UserLevelMap;
    global_guild_level_map: GuildLevelMap;
    calculate_level_xp: ((level: number) => number);

    constructor(calculateLevelXpFn: ((level: number) => number)) {
        this.calculate_level_xp = calculateLevelXpFn;
        this.global_user_level_map = new Map<string, LevelInterface>();
        this.global_guild_level_map = new Map<string, UserLevelMap>();

        Promise
            .all([
                db.allGlobalLevel(),
                db.allLocalLevel()
            ])
            .then(level_tables => {
                if (level_tables[0]) {
                    level_tables[0].forEach((global_level: GlobalLevelData) => {
                        this.global_user_level_map.set(
                            global_level.user,
                            {
                                level: global_level.level,
                                xp: global_level.xp
                            })
                    })
                }
                if (level_tables[1]) {
                    level_tables[1].forEach((local_level: LocalLevelData) => {
                        let guild_level_map = this.getGuildLevelMap(local_level.guild)
                        guild_level_map.set(local_level.user, {
                            level: local_level.level,
                            xp: local_level.xp
                        });
                        this.global_guild_level_map.set(local_level.guild, guild_level_map);
                    })
                }
            })
        for (let i = 0; i < 10; i++) {
            this.calculateToXPMapIfNotExists(i);
        }
    }
    private calculateToXPMap(level: number) {
        this.level_xp_map[level] = Math.floor(this.calculate_level_xp(level + 1));
    }
    private calculateToXPMapIfNotExists(level: number) {
        if (this.level_xp_map[level] == undefined) {
            this.calculateToXPMap(level);
        }
    }
    private getGuildLevelMap(guild: string) {
        let guild_level_map = this.global_guild_level_map
            .get(guild);
        if (guild_level_map == undefined) {
            guild_level_map = new Map<string, LevelInterface>();
        }
        return guild_level_map;
    }
    private addPointsToInterface(level_user: LevelInterface, points: number) {
        this.calculateToXPMapIfNotExists(level_user.level);
        level_user.xp += points;
        if (this.level_xp_map[level_user.level] <= level_user.xp) {
            level_user.xp -= this.level_xp_map[level_user.level];
            level_user.level++;
        }
        return level_user;
    }
    private addPointsToLocal(guild: string, user: string, points: number) {
        let guild_level_map = this.getGuildLevelMap(guild);
        let level_user = guild_level_map.get(user);
        let user_does_not_exist = false;
        if (level_user == undefined) {
            user_does_not_exist = true;
            level_user = {
                level: 0,
                xp: 0
            };
        }
        level_user = this.addPointsToInterface(level_user, points);
        if (user_does_not_exist) {
            db.insertLocalLevel(user, guild, level_user.xp, level_user.level)
                .catch(() => logger.warn(`Failed to insert leveldata of user with Discord ID "${user}" in guild "${guild}"`));
        }
        else {
            db.changeLocalLevel(user, guild, level_user.xp, level_user.level)
                .catch(() => logger.warn(`Failed to update leveldate of user with Discord ID "${user}" in guild "${guild}"`));
        }
        guild_level_map.set(user, level_user);
        this.global_guild_level_map.set(guild, guild_level_map);
    }
    private addPointsToGlobal(user: string, points: number) {
        let level_user = this.global_user_level_map.get(user);
        let user_does_not_exist = false;
        if (level_user == undefined) {
            user_does_not_exist = true;
            level_user = {
                level: 0,
                xp: 0
            };
        }
        level_user = this.addPointsToInterface(level_user, points);
        if (user_does_not_exist) {
            db.insertGlobalLevel(user, level_user.xp, level_user.level)
                .catch(() => logger.warn(`Failed to insert leveldata of user with Discord ID "${user}""`));
        }
        else {
            db.changeGlobalLevel(user, level_user.xp, level_user.level)
                .catch(() => logger.warn(`Failed to update leveldate of user with Discord ID "${user}"`));
        }
        this.global_user_level_map.set(user, level_user);
    }
    public xpToNext(level: number) {
        this.calculateToXPMapIfNotExists(level);
        return this.level_xp_map[level];
    }
    public addPointsToMember(guild: string, user: string, points: number) {
        this.addPointsToGlobal(user, points);
        this.addPointsToLocal(guild, user, points);
    }
    public getLevel(user: string, guild?: string): Promise<CombinedLevelData> {
        return new Promise<CombinedLevelData>((resolve, reject) => {
            let result: CombinedLevelData | any = {};
            this.addPointsToGlobal(user, 0);
            if (guild) {
                this.addPointsToLocal(guild, user, 0);
                result.local = this.getGuildLevelMap(guild).get(user)
            }
            result.global = this.global_user_level_map.get(user);
            if (result.global == undefined) {
                reject();
                return;
            }
            resolve(result);
        })
    }
}