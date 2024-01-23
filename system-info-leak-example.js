const http = require('node:http');
const fs = require('node:fs/promises');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});


http.createServer((req, res) => {
    fs.readFile("./no-file.txt").catch((e) => {
        // here's a system information leak:
        console.error(e);
    });
    res.writeHead(200);
    res.end("👋");
}).listen(8080);
