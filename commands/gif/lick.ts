import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'lick',
    path.join(__dirname, '../..', 'emote', 'lick'),
    [],
    `*lick [mention]`,
    false);