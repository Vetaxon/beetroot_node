const fs = require('fs');
const path = require('path');

const [filename, content] = process.argv
    .filter((value, index) => index > 1)
    .map(item => item.replace(/['"]+/g, ''));

write(filename, content)
    .then(res => {
        fs.readFile(filename, (err, data) => {
            if (err) throw err;
            console.log(data.toString());
        });
    })
    .catch(error => console.error(error));

function write(filename, content) {

    if (!filename || !content) {
        return;
    }

    if (!path.extname(filename)) {
        filename += filename + '.txt'
    }

    return new Promise((resolve => {
        fs.stat(filename, (error, stats) => {
            resolve(!!stats)
        })
    })).then(res => {
        if (res) {
            return new Promise(resolve => {
                fs.appendFile(filename, content, function (error) {
                    if (error) throw error;
                    resolve(true);
                });
            })
        }

        return new Promise(resolve => {
            fs.writeFile(filename, content, function (error) {
                if (error) throw error;
                resolve(true);
            });
        })
    })
}