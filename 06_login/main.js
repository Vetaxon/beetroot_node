const http = require('http');
const fs = require('fs');
const util = require('util');
const url = require('url');
const { parse } = require('querystring');

const port = 3000;
const readFile = util.promisify(fs.readFile);

function getPostBody(request) {
    return new Promise(resolve => {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const parsed = parse(body);
            resolve(parsed);
        });
    })
}

async function requestHandler(request, response) {

    response.setHeader('Content-type', 'text/html');

    if (request.method === 'GET') {
        const pathname = url.parse(request.url).pathname;
        try {
            response.statusCode = 200;
            response.write((await readFile(__dirname + pathname)));
        } catch (e) {
            response.statusCode = 404;
            response.write('File not found')
        }
    }

    if (request.method === 'POST') {
        const body = await getPostBody(request);
        if (body.login === 'user' && body.password === 'secret') {
            response.write(`<h3>Success. Email: ${body.login}, password: ${body.password}</h3>`);
        } else {
            response.write(`<h3>Failed</h3>`);
        }
    }

    response.end();
}


const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err)
    }
    console.log(`Server is listening on ${port}`)
});