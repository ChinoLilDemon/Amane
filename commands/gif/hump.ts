import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'hump'),
    [],
    `Hump somebody`,
    `*hump [mention]`,
    `[0] humps`,
    `[0] humps on [1], how naughty.`,
    true);