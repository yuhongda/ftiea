'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {resultData} = require('../../common/utils');

router.get('/exportExcel', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};
  console.log('params', params);
  Object.assign(ret, resultData);

  res.send(ret);
});

router.get('/priceList', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    // resultList:null
    resultList:  _.times(15, i => {
        return {
            wareId: _.random(10000000, 100000000),
            wareName: "商品编码升级测试" + i,
            minimalSort: 655,
            warePriceInfoBean: _.times(3, i => {
              return {
                wareId: _.random(10000000, 100000000),
                vendorCode: "bk0011",
                vendorName: "化学工业出版社",
                isDefaultVendor: 1,
                publicPrice: _.random(100, 1000),
                discount: 1,
                price: _.random(100, 1000),
                currency: "RMB",
                modifiedDate: "Jun 27, 2017 2:08:31 PM",
                priceType: 1,
                modifiedBy: "张丹娜",
                isAvailable: true,
                startTime: "Jun 27, 2017 2:08:31 PM",
                endTime: "Jun 27, 2017 2:08:31 PM"
              };
            }),
            pageNumber: 0,
            pageSize: 0,
            endRow: 0,
            recordCount: 1838797,
            rowNum: 0
        };
      })
  });

  res.send(ret);
});

module.exports = router;
