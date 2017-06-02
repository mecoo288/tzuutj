import Vue from 'vue'
var dateFormat = require('dateformat');
var commonConfig=require('../common_config.json');

var citys=[];
var citys_common=[];
var citys_sp=[];
var citys_limit=[];
var provinces=[];
var reqUrl=commonConfig.baseapi.reqUrl;

var citys_merge=[];


var fws=[];


var date = new Date();
date.setDate(date.getDate()-1);

var weekEnd=dateFormat(date,'yyyy-mm-dd');
date.setDate(date.getDate()-6);
var weekStart=dateFormat(date,'yyyy-mm-dd');


date = {
    start:weekStart,
    end:weekEnd
}


export default {
    citys,
    citys_common,
    citys_sp,
    citys_merge,
    citys_limit,
    provinces,
    reqUrl,
    fws,
    date:{
        start:weekStart,
        end:weekEnd
    },
    cookieDomain : commonConfig.baseapi.cookieDomain,
    cityLimit: 1,
    menuActived:"",
};
