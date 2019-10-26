/* eslint no-process-exit: off */

const config = require('./config.js');
const StatusBot = require('./src/status-bot');

let status = new StatusBot(config);

status.listen();