import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'hug',
    path.join(__dirname, '../..', 'emote', 'hug'), 
    [],
    `*hug [mention]`,
    false);