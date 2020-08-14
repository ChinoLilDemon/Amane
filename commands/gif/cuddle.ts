import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'cuddle'),
    ['snuggle'],
    `Cuddle somebody`,
    `*hug [mention]`,
    `[0] do you want to cuddle thin air?`,
    `[0] snuggled [1]`,
    false);