import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'hump',
    path.join(__dirname, '../..', 'emote', 'hump'),
    [],
    `*hump [mention]`,
    true);