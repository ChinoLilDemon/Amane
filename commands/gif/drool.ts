import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'drool'),
    [],
    `Drool`,
    `*drool [mention]`,
    `[0] is drooling`,
    `[0] drools on [1]`,
    true);