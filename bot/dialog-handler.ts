import path = require('path');
import fs = require('fs');
import ini = require('ini');

export var dialogs = new Map<string, any>();
dialogs.set('en', ini.parse(fs.readFileSync(path.join(__dirname, '..', 'lang/default.ini'), 'utf-8')));
