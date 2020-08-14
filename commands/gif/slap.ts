import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'slap'),
    [],
    `Slap somebody`,
    `*slap [mention]`,
    `[0] slaps the air.`,
    `[0] slapped [1]`,
    true);