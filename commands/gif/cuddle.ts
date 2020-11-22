import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'cuddle',
    path.join(__dirname, '../..', 'emote', 'cuddle'),
    ['snuggle'],
    `*hug [mention]`,
    false);