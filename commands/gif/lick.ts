import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'lick'),
    [],
    `Get a taste of someone`,
    `*lick [mention]`,
    `[0] do you want to lick nothing?`,
    `[0] licked [1], seems delicious...`,
    false);