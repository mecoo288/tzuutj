var request = require("superagent");
var tabList=require('components/data/dd_country_chart_tab.json')

var dateFormat = require('dateformat');


var date = new Date();
date.setDate(date.getDate()-1);

var weekEnd=dateFormat(date,'yyyy-mm-dd');
date.setDate(date.getDate()-6);
var weekStart=dateFormat(date,'yyyy-mm-dd');


var opt={
            chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
          type:'datetime',
          dateTimeLabelFormats: {
                              year: '%Y',
                              month: '%Y-%m',
                              day:'%m-%d'
           }
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            xDateFormat:'%m-%d',
            pointFormat:' {point.y}'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '  ',
            data:[]
        }],
        credits:{
            enabled:false // 禁用版权信息
        }
};


var citys=[];
export default {
     citys:citys,
    now:{
	province:'请选择',
	city:'请选择',
	search:'',
	city_detail:''
    },
    filter:{
        cityCode:0,
	//provinceCode:0,
        fwsName:'',
        dateStart:weekStart,
        dateEnd:weekEnd,
	type:1,
	threeType:'country',
	page:1,
	chartType:'zdd',
	pageNum:20

    },
    chartList:{
	zdd:opt,
	bzje:opt,
	bzsl:opt,
	cdje:opt,
	cdsl:opt,
	ddxq:opt,
	tdje:opt,
	tdsl:opt,
    },
    tableList:{
	trtotal:0,
	tmpList:[],
        zddList:[],
        ddxqList:[],
        cdjeList:[],
        cdslList:[],
        tdjeList:[],
        tdslList:[],
        bzjeList:[],
        bzslList:[]
    },
    tabList:tabList,
    date:{
        start:weekStart,
        end:weekEnd
    },
    page:{
        totalPage:0,
        pages:[1,2,3,4,5],
        pageListNum:5,
        preP:false,
        nextP:false,
        totalPageNowNum:1,
        placeholder:"输入跳转页码"
    },
    commons:{
	firstThName:'日期'
    }

}
