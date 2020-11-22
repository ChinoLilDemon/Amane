import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'succ',
    path.join(__dirname, '../..', 'emote', 'succ'),
    [],
    `*succ [mention]`,
    true,
    true);