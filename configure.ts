import fs = require('fs');
import path = require('path');

interface ConfigInterface{
    token: string,
    prefix: string
}

var config: ConfigInterface = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));

export default config;