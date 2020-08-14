import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'hug'), 
    [],
    `Hug somebody`,
    `*hug [mention]`,
    `[0] do you want to hug thin air?`,
    `[0] hugged [1]`,
    false);