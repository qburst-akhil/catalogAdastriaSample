var ssh = require('ssh2');
var _ = require('lodash');
var async = require('async');
var express = require('express');

var router = express.Router();

var utils = require('../utils');
var CONST = require('./constants');

/* GET home page. */
router.get('/', function (req, res, next) {
  // Download file
  console.log("Inside get method");
  var connection = new ssh.Client();

  connection.on('ready', function () {
    console.log("Ready....!!!");
    connection.sftp(function (err, sftp) {
      if (err) throw err;
      console.log("Before di r>>>>>>>>>>");

      sftp.readdir('/Import', (err, list) => {
        if (err) throw err;

        var filteredList = _.filter(list, file => {
          return (file.filename.endsWith('.csv') || file.filename.endsWith('.CSV'))
            && file.filename.startsWith('SALESFORCE_')
        });
        var groupedFileObject = groupFileObjectsByTableName(filteredList);
        var fileNameMap = composeFilenameList(groupedFileObject)
        var fileNameArray = Array.from(fileNameMap.values());

        var file = fileNameMap.get('TITEMPARTHEADER')
        var dir = utils.getDownloadDirectory();


        console.log(`Map contains ${fileNameMap.size} file names`);
        async.eachLimit(fileNameArray, 1, (fileName, callback) => {
          console.log(`File name: ${fileName}`);
          utils.downloadFile(sftp, CONST.IMPORT_DIR + fileName, `${dir}/${fileName}`)
            .then(result => {
              console.log(`Promise Success ${result}`);
              callback();
            })
            .catch(err => {
              console.log(`Promise Failure ${err}`);
              callback();
            });
        }, (err) => {
          if (err) {
            console.log(`Error ${err}`);
          }
          console.log(`connection.end()`);
          connection.end();
        });

        // utils.downloadFile(sftp, CONST.IMPORT_DIR + file,
        //   `${dir}/${file}`)
        //   .then(result => {
        //     console.log(result);
        //     connection.end();
        //   })
        //   .catch(err => {
        //     console.log(err);
        //     connection.end();
        //   })

        // var downloadResult = [];
        // fileNameMap.forEach((filename, key) => {
        //   console.log(`File to download ${CONST.IMPORT_DIR + filename}`);

        //   downloadResult.push(utils.downloadFile(sftp, CONST.IMPORT_DIR + filename,
        //     `${dir}/${filename}`))
        // });

        // Promise.all(downloadResult)
        //   .then(result => {
        //     console.log(result);
        //     connection.end();
        //   })
        //   .catch(err => {
        //     console.log(err);
        //     connection.end();
        //   });

        console.log('File list >>>>>>>>>>>>>>>');
      });
    });
  }).connect({
    host: 'ftp.s7.exacttarget.com',
    port: 22,
    username: '7229592',
    password: "8a#F$Jg3Mw4!z*Q72Kd@"
  });
});

function composeFilenameList(fileObject) {
  console.dir(fileObject);
  delete fileObject['undefined'];
  var fileNameMap = new Map();
  Object.keys(fileObject).map((key, index) => {
    var csvFileArray = fileObject[key];
    var sorted = _.sortBy(csvFileArray, csvFile =>
      csvFile.filename);
    fileNameMap.set(key, sorted[sorted.length - 1].filename);
  });
  return fileNameMap;
};

function groupFileObjectsByTableName(fileObjects) {
  return _.groupBy(fileObjects, item => {
    if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEM + '_')) {
      return CONST.CSVS.TITEM;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TGOODS + '_')) {
      return CONST.CSVS.TGOODS;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTYLING + '_')) {
      return CONST.CSVS.TSTYLING;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTYLINGITEM + '_')) {
      return CONST.CSVS.TSTYLINGITEM;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCAMPAIGN + '_')) {
      return CONST.CSVS.TCAMPAIGN;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCAMPAIGNITEM + '_')) {
      return CONST.CSVS.TCAMPAIGNITEM;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCART + '_')) {
      return CONST.CSVS.TCART;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TORDER + '_')) {
      return CONST.CSVS.TORDER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TORDERDTL + '_')) {
      return CONST.CSVS.TORDERDTL;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTOREORDER + '_')) {
      return CONST.CSVS.TSTOREORDER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTOREORDERDTL + '_')) {
      return CONST.CSVS.TSTOREORDERDTL;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMBER + '_')) {
      return CONST.CSVS.TMEMBER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMBERDEL + '_')) {
      return CONST.CSVS.TMEMBERDEL;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMMMEMBER + '_')) {
      return CONST.CSVS.TMMMEMBER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMMMEMBERDEL + '_')) {
      return CONST.CSVS.TMMMEMBERDEL;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMMMEMSTORE + '_')) {
      return CONST.CSVS.TMMMEMSTORE;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TINTERIMMEMBER + '_')) {
      return CONST.CSVS.TINTERIMMEMBER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTORE + '_')) {
      return CONST.CSVS.TSTORE;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOP + '_')) {
      return CONST.CSVS.TSHOP;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCUSTOMERREVIEW + '_')) {
      return CONST.CSVS.TCUSTOMERREVIEW
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMBINDER + '_')) {
      return CONST.CSVS.TMEMBINDER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPSTOCK + '_')) {
      return CONST.CSVS.TSHOPSTOCK;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTOCKMASTER + '_')) {
      return CONST.CSVS.TSTOCKMASTER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCOUPON + '_')) {
      return CONST.CSVS.TCOUPON;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMCOUPON + '_')) {
      return CONST.CSVS.TMEMCOUPON;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TRANKINGCL + '_')) {
      return CONST.CSVS.TRANKINGCL;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TRANKING + '_')) {
      return CONST.CSVS.TRANKING;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEMPARTSIZE + '_')) {
      return CONST.CSVS.TITEMPARTSIZE;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEMPARTHEADER + '_')) {
      return CONST.CSVS.TITEMPARTHEADER;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISP + '_')) {
      return CONST.CSVS.TSHOPDISP;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISPCLASS + '_')) {
      return CONST.CSVS.TSHOPDISPCLASS;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISPGOODS + '_')) {
      return CONST.CSVS.TSHOPDISPGOODS;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCLASS + '_')) {
      return CONST.CSVS.TCLASS;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCLASSATTRIBUTE + '_')) {
      return CONST.CSVS.TCLASSATTRIBUTE;
    } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEMCLASSATTRIBUTE + '_')) {
      return CONST.CSVS.TITEMCLASSATTRIBUTE;
    }
  });
}

module.exports = router;
