import EmoteCommand from '../../bot/prototypes/EmoteCommand';
import path = require('path');
export default new EmoteCommand(
    path.join(__dirname, '../..', 'emote', 'handholding'),
    ['holdh', 'hh'],
    `holdhands with somebody`,
    `*handh [mention]`,
    `[0] never expected you to try holding hands with no one`,
    `[0] holds hands with [1]`,
    false);