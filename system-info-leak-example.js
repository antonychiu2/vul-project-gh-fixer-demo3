const http = require('node:http');
const fs = require('node:fs/promises');
const winston = require('winston');

http.createServer((req, res) => {
    fs.readFile("./no-file.txt").catch((e) => {
        // here's a system information leak:
        console.error(e);
    });
    res.writeHead(200);
    res.end("👋");
}).listen(8080);
