const fs = require('fs');
const config = require('./config');

exports.update = function (data) {
    return new Promise((resolve, reject) => {
        let json = JSON.stringify(data, null, '  ');
        fs.writeFile(config.companiesStorage, json, { encoding: 'utf8' }, err => {
            if (err) reject(err);
            else resolve();
        });
    });
};
