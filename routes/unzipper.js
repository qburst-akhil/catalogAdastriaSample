const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const exec = require('child_process').exec;

class Unzipper {
    constructor() {
    }

    unzipFilesInDirectory(directory) {
        return new Promise((resolve, reject) => {
            const files = fs.readdirSync(directory);
            let zipFiles = files.filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ext === '.zip';
            });
            const unzipped = [];
            zipFiles.forEach(zipFile => {
                unzipped.push(this.unzipFile(zipFile, directory));
            });
            Promise.all(unzipped)
                .then(success => {
                    console.log(`Success unzipping ${JSON.stringify(success)}`);
                    const failed = _.filter(success, item => {
                        return item.status === 'Failure';
                    })
                    if (failed.length > 0) {
                        reject(failed);
                    } else {
                        const csvFiles = this.getCsvFile(directory);
                        resolve(csvFiles);
                    }
                })
                .catch(err => {
                    console.log(`Error while unzipping ${err}`);
                    reject(err);
                });
        });
    }

    unzipFile(file, directory) {
        return new Promise(resolve => {
            const filePath = path.join(directory, file);
            exec(`unzip -o ${filePath} -d ${directory}/`, (err, stdout, stderr) => {
                if (err || stderr) {
                    console.log('Error in xip file conv');
                    resolve({
                        status: 'Failure',
                        filename: file
                    });
                }
                console.log(`Unzippped ${filePath}`);
                resolve({
                    status: 'Success',
                    filename: file
                });
            });
        });
    }

    getCsvFile(directory) {
        try {

            const files = fs.readdirSync(directory)
            return _.filter(files, file => {
                return path.extname(file) === '.csv' || path.extname(file) === '.CSV';
            });

        } catch (error) {
            console.log('');

        }
    }
}


module.exports = new Unzipper();