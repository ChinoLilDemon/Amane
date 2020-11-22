import winston = require('winston');
import path = require('path');

var date = new Date();

export var logger: winston.Logger = winston.createLogger({
    format: 
        winston.format.combine(
            winston.format.simple(), 
            winston.format.colorize()
        ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            dirname: path.join(__dirname, 'logs'),
            filename: `M${date.getMonth()}D${date.getDate()}Y${date.getFullYear()}-${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s.log`
        })
    ]
});