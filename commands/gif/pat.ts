import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'pat'),
    [],
    `Pat somebody`,
    `*pat [mention]`,
    `[0] do you want to pat thin air?`,
    `[0] pats [1] head`,
    false);