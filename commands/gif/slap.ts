import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'slap',
    path.join(__dirname, '../..', 'emote', 'slap'),
    [],
    `*slap [mention]`,
    true);