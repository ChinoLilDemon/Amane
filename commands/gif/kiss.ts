import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'kiss',
    path.join(__dirname, '../..', 'emote', 'kiss'),
    ['smooch'],
    `*kiss [mention]`,
    false);