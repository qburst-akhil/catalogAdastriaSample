const fs = require('fs');
const appRoot = require('app-root-path');
const K = require('../routes/constants')

function getDownloadDirectory() {
  const downloadFolder = `${appRoot}/${K.DWLD_FOLDER}`;
  try {
    if (!fs.existsSync(downloadFolder)) {
      fs.mkdirSync(downloadFolder);
    }
  } catch (error) {
    console.log('Error in folder creation', error);
  }
  return downloadFolder;
}

function downloadFile(sftp, source, destination) {
  return new Promise((resolve, reject) => {
    sftp.fastGet(source, destination, err => {
      var arr = source.split('/')
      var fileName = arr[arr.length - 1];
      if (err) {
        resolve({
          file: fileName,
          error: err
        });
      }
      resolve(fileName)
    });
  });
}

module.exports = {
  getDownloadDirectory,
  downloadFile
};