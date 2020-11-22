import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'nom',
    path.join(__dirname, '../..', 'emote', 'nom'),
    [],
    `*hug [mention]`,
    false);