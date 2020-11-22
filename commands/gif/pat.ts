import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'pat',
    path.join(__dirname, '../..', 'emote', 'pat'),
    [],
    `*pat [mention]`,
    false);