const log4js = require('log4js');
const stringify = require('json-stringify-safe');
const util = require('util');

log4js.addLayout('ndjson', function () {
  return function (logEvent) {
    const replacer = (key, value) => value;
    const data = logEvent.data.map(x => typeof x === 'string' ? x : stringify(x, replacer));
    return `${logEvent.level}: ${util.format(...data)}`;
  };
});

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: process.env.NODE_ENV === 'development'
          ? 'coloured' : 'ndjson',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'debug',
    },
  },
});

module.exports = log4js.getLogger();
