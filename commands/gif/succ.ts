import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'succ'),
    [],
    `Succ on somebody`,
    `*succ [mention]`,
    `[0] succies some foods`,
    `[0] succed on [1], banana`,
    true,
    true);