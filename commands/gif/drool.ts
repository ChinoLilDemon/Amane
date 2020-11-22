import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'drool',
    path.join(__dirname, '../..', 'emote', 'drool'),
    [],
    `*drool [mention]`,
    true);