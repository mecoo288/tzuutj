var tabList=require('../../../data/hh_tab.json')
var dateFormat = require('dateformat');


var date = new Date();
date.setDate(date.getDate()-1);

var weekEnd=dateFormat(date,'yyyy-mm-dd');
date.setDate(date.getDate()-6);
var weekStart=dateFormat(date,'yyyy-mm-dd');

var citys=[];
export default {
     citys:citys,

    filter:{
        cityName:'',
        fwzName:'',
        dateStart:'',
        dateEnd:'',
	page:1,
	pageNum:20
    },
    tableList:{
	trtotal:0,
	rqList:[],
        spidList:[],
        hhspList:[],
        tzrxmList:[],
	hhcsList:[],
	hhsList:[]
    },
    tabList:tabList,
    page:{
	total:0,
        totalPage:0,
        pages:[],
        pageListNum:5,
        preP:false,
        nextP:false,
        totalPageNowNum:1,
        placeholder:"输入跳转页码"
    },
    selectNow:{
        name:"全国",
        pinyin:"all"
    },
    date:{
        start:'开始日期',
        end:'结束日期'
    },
        now:{
        province:'请选择',
        city:'全部',
        search:''
    },
     firstInit:false
}
