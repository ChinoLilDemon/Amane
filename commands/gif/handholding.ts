import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    'handholding',
    path.join(__dirname, '../..', 'emote', 'handholding'),
    ['holdh', 'hh'],
    `*handh [mention]`,
    false);