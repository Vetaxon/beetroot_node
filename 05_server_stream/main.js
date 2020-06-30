const http = require('http');
const fs = require('fs');
const util = require('util');
const url = require('url');

const port = 3000;
const readFile = util.promisify(fs.readFile);

/**
 * @param {String} filePath
 * @return {Promise<boolean>}
 */
function isFileExist(filePath) {
    return new Promise(resolve => {
        fs.access(filePath, fs.F_OK, (err) => resolve(!err));
    });
}

/**
 * @param {String} filePath
 * @param response
 * @return {Promise<boolean>}
 */
async function sendFile(filePath, response) {
    const isExist = await isFileExist(filePath);
    if (!isExist) {
        throw new Error('File does not exist');
    }

    return new Promise((resolve) => {
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('readable', () => {
            const read = fileStream.read();
            if (read) {
                response.write(read);
            }
        });
        fileStream.on('end', () => resolve(true));
    });
}

async function requestHandler(request, response) {

    const pathname = url.parse(request.url).pathname;

    try {
        response.setHeader('Content-type', 'text/html');
        response.statusCode = 200;

        await sendFile(__dirname + '/htmls' + pathname, response);

        // response.write((await readFile(__dirname + '/htmls/' + pathname)));
    } catch (e) {
        console.error(e.message);
        response.statusCode = 404;
        response.write('File not found')
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