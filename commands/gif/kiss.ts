import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'kiss'),
    ['smooch'],
    `Kiss somebody`,
    `*kiss [mention]`,
    `[0] do you want to kiss thin air?`,
    `[0] kissed [1]`,
    false);