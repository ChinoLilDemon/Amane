import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'nom'),
    [],
    `Hug somebody`,
    `*hug [mention]`,
    `[0] do you want to nom thin air?`,
    `[0] nommed on [1]`,
    false);