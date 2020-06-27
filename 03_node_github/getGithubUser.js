const fetch = require('node-fetch');
const process = require('process');
const GithubError = require('./githubError');

function run() {
    process.stdin.setEncoding('utf8');

    enterNameOut();

    process.stdin.on('data', (data) => {
        const intervalLoader = getLoaderInterval();
        getUser(data.trim()).then(res => {
            const [user, repos] = res;
            clear();
            process.stdin.write(`${user.name} has ${repos.length} repos ))\n`);
        }).catch(error => {
            clear();
            if (error instanceof GithubError) {
                process.stdin.write('Oppss!Github says ' + error + '\n');
            } else {
                process.stdin.write(error + '\n');
            }
        }).finally(() => {
            clearInterval(intervalLoader);
            enterNameOut();
        })
    });
}

/**
 * @param {String} user
 * @return Promise
 */
function getUser(user) {
    return Promise.all([
            fetch('https://api.github.com/users/' + user)
                .then(res => {
                    switch (res.status) {
                        case 200: return res.json();
                        case 404: throw new GithubError(`User "${user}" is not found.`);
                        default: throw new Error(`Connection error.`);
                    }
                }),
            fetch('https://api.github.com/users/' + user + '/repos')
                .then(res => {
                    switch (res.status) {
                        case 200: return res.json();
                        case 404: throw new GithubError(`Repo for user "${user}" is not found.`);
                        default: throw new Error(`Connection error.`);
                    }
                }),
        ]
    )
}

function enterNameOut() {
    process.stdin.write('Enter github name:\n');
}

setInterval(() => {

}, 200);

function getLoaderInterval() {
    let i = 0;
    return  setInterval(() => {
        if (i > 2) {
            i = 0;
        }
        clear();
        process.stdin.write('Loading ' + Array(++i).fill('.').join('') + '\n');
    }, 200);
}

function clear() {
    process.stdout.write('\x1Bc');
}

module.exports = run;
