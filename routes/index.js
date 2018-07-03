var express = require('express');
var ssh = require('ssh2');
var _ = require('lodash')
var router = express.Router();
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

      console.dir(sftp);
      sftp.readdir('/Import', (err, list) => {
        if (err) throw err;
        console.log("Read dir list ", list);
        var tItem = [];
        var tGoods = [];
        var tStyling = [];
        var tStylingItem = [];
        var tCampaign = [];
        var tCampaignItem = [];
        var tCart = [];
        var tOrder = [];
        var tOrderDtl = [];
        var tStoreOrder = [];
        var tStoreOrderDetail = [];
        var tMember = [];
        var tMemberDel = [];
        var tMMMember = [];
        var tMMMemberDel = [];
        var tMMMemStore = [];
        var tInterimMember = [];
        var tStore = [];
        var tShop = [];
        var tCustomerReview = [];
        var tMemBinder = [];
        var tShopStock = [];
        var tStockmaster = [];
        var tCoupon = [];
        var tMemCoupon = [];
        var tRankingGcl = [];
        var tRanking = [];
        var tItemPartSize = [];
        var tItemPartHeader = [];
        var tShopDisp = [];
        var tShopDispGoods = [];
        var tClass = [];
        var tClassAttribute = [];
        var tItemClassAttribute = [];
        var tShopDispClass = [];
        var filteredList = _.filter(list, file => {
          return (file.filename.endsWith('.csv') || file.filename.endsWith('.CSV'))
            && file.filename.startsWith('SALESFORCE_')
        });
        var response = _.groupBy(filteredList, item => {
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
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISPGOODS + '_')) {
            return CONST.CSVS.TSHOPDISPGOODS;
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCLASS + '_')) {
            return CONST.CSVS.TCLASS;
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCLASSATTRIBUTE + '_')) {
            return CONST.CSVS.TCLASSATTRIBUTE;
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEMCLASSATTRIBUTE + '_')) {
            return CONST.CSVS.TITEMCLASSATTRIBUTE;
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISPCLASS + '_')) {
            return CONST.CSVS.TSHOPDISPCLASS;
          }
        });
        var map = new Map();
        map = initalizeEmptyMap(map)
        _.forEach(filteredList, item => {
          if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEM + '_')) {
            tItem.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TGOODS + '_')) {
            tGoods.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTYLING + '_')) {
            tStyling.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTYLINGITEM + '_')) {
            tStylingItem.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCAMPAIGN + '_')) {
            tCampaign.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCAMPAIGNITEM + '_')) {
            tCampaignItem.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCART + '_')) {
            tCart.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TORDER + '_')) {
            tOrder.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TORDERDTL + '_')) {
            tOrderDtl.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTOREORDER + '_')) {
            tStoreOrder.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTOREORDERDTL + '_')) {
            tStoreOrderDetail.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMBER + '_')) {
            tMember.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMBERDEL + '_')) {
            tMemberDel.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMMMEMBER + '_')) {
            tMMMember.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMMMEMBERDEL + '_')) {
            tMMMemberDel.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMMMEMSTORE + '_')) {
            tMMMemStore.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TINTERIMMEMBER + '_')) {
            tInterimMember.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTORE + '_')) {
            tStore.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOP + '_')) {
            tShop.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCUSTOMERREVIEW + '_')) {
            tCustomerReview.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMBINDER + '_')) {
            tMemBinder.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPSTOCK + '_')) {
            tShopStock.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSTOCKMASTER + '_')) {
            tStockmaster.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCOUPON + '_')) {
            tCoupon.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TMEMCOUPON + '_')) {
            tMemCoupon.push(item.filename);
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TRANKINGCL + '_')) {
            tRankingGcl.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TRANKING + '_')) {
            tRanking.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEMPARTSIZE + '_')) {
            tItemPartSize.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEMPARTHEADER + '_')) {
            tItemPartHeader.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISP + '_')) {
            tShopDisp.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISPGOODS + '_')) {
            tShopDispGoods.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCLASS + '_')) {
            tClass.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TCLASSATTRIBUTE + '_')) {
            tClassAttribute.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TITEMCLASSATTRIBUTE + '_')) {
            tItemClassAttribute.push(item.filename)
          } else if (_.startsWith(item.filename, CONST.FILE_PREFIX + CONST.CSVS.TSHOPDISPCLASS + '_')) {
            tShopDispClass.push(item.filename)
          }
        })
        // var tItemList = _.filter(list, (fileObj) => {
        //   return _.startsWith(fileObj.filename, 'SALESFORCE_TITEM')
        // });
        console.log('File list >>>>>>>>>>>>>>>');
        console.log(fileList);

        connection.end()
      });

    });
  }).connect({
    host: 'ftp.s7.exacttarget.com',
    port: 22,
    username: '7229592',
    password: "8a#F$Jg3Mw4!z*Q72Kd@"
  });
});

function initalizeEmptyMap(map) {
  map.set(CONST.CSVS.TITEM, []);
  map.set(CONST.CSVS.TGOODS, []);
  map.set(CONST.CSVS.TSTYLING, []);
  map.set(CONST.CSVS.TSTYLINGITEM, []);
  map.set(CONST.CSVS.TCAMPAIGN, []);
  map.set(CONST.CSVS.TCAMPAIGNITEM, []);
  map.set(CONST.CSVS.TCART, []);
  map.set(CONST.CSVS.TORDER, []);
  map.set(CONST.CSVS.TORDERDTL, []);
  map.set(CONST.CSVS.TSTOREORDER, []);
  map.set(CONST.CSVS.TSTOREORDERDTL, []);
  map.set(CONST.CSVS.TMEMBER, []);
  map.set(CONST.CSVS.TMEMBERDEL, []);
  map.set(CONST.CSVS.TMMMEMBER, []);
  map.set(CONST.CSVS.TMMMEMBERDEL, []);
  map.set(CONST.CSVS.TMMMEMSTORE, []);
  map.set(CONST.CSVS.TINTERIMMEMBER, []);
  map.set(CONST.CSVS.TSTORE, []);
  map.set(CONST.CSVS.TSHOP, []);
  map.set(CONST.CSVS.TCUSTOMERREVIEW, []);
  map.set(CONST.CSVS.TMEMBINDER, []);
  map.set(CONST.CSVS.TSHOPSTOCK, []);
  map.set(CONST.CSVS.TSTOCKMASTER, []);
  map.set(CONST.CSVS.TCOUPON, []);
  map.set(CONST.CSVS.TMEMCOUPON, []);
  map.set(CONST.CSVS.TRANKINGCL, []);
  map.set(CONST.CSVS.TRANKING, []);
  map.set(CONST.CSVS.TITEMPARTSIZE, []);
  map.set(CONST.CSVS.TITEMPARTHEADER, []);
  map.set(CONST.CSVS.TSHOPDISP, []);
  map.set(CONST.CSVS.TSHOPDISPGOODS, []);
  map.set(CONST.CSVS.TCLASS, []);
  map.set(CONST.CSVS.TCLASSATTRIBUTE, []);
  map.set(CONST.CSVS.TITEMCLASSATTRIBUTE, []);
  map.set(CONST.CSVS.TSHOPDISPCLASS, []);
  return map
}

module.exports = router;
