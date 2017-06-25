const calConfig = {
  disabledDate(date){
    return date.getTime() >= Date.now() - 8.64e7;
  },
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 91);
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
      picker.$emit('pick', [start, end]);
    }
  }]
};

const leftMenu = [
{
  "name": "首页",
  "url": "/home",
  "alias": "home"
},
{
  "name": "订单统计",
  "url": "/order",
  "alias": "order"
},
{
  "name": "服务者统计",
  "url": "/provider",
  "alias": "provider"
},
{
  "name": "BD销售统计",
  "url": "/sales",
  "alias": "sales"
},
{
  "name": "会话统计",
  "url": "/talk",
  "alias": "talk"
},
{
  "name": "打赏统计",
  "url": "/reward",
  "alias": "reward"
},
{
  "name": "分成统计",
  "url": "/divide",
  "alias": "divide"
},
{
  "name": "商品统计",
  "url": "/product",
  "alias": "product"
},
{
  "name": "下载中心",
  "url": "/download",
  "alias": "download"
}
];

const MenuStore = {
  "65":{
    "name": "首页",
    "url": "/home",
    "alias": "home"
  },
  "66":{
    "name": "订单统计",
    "url": "/order",
    "alias": "order"
  },
  "69":{
    "name": "服务者统计",
    "url": "/provider",
    "alias": "provider"
  },
  "91":{
    "name": "BD销售统计",
    "url": "/sales",
    "alias": "sales"
  },
  "74":{
    "name": "会话统计",
    "url": "/talk",
    "alias": "talk"
  },
  "75":{
    "name": "打赏统计",
    "url": "/reward",
    "alias": "reward"
  },
  "76":{
    "name": "分成统计",
    "url": "/divide",
    "alias": "divide"
  },
  "77":{
    "name": "商品统计",
    "url": "/product",
    "alias": "product"
  },
  "92":{
    "name": "下载中心",
    "url": "/download",
    "alias": "download"
  }
};


const chartConfig = {
  chart: {
    type: 'line',
    zoomType: 'x'
  },
  lang:{
    downloadJPEG: "导出JPEG图片",
    downloadPDF: "导出PDF文件",
    downloadPNG: "导出PNG图片",
    downloadSVG: "导出SVG",
    printChart: "打印图表"
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    type:'datetime',
    labels:{
      format:'{value:%m-%d}',
      align: 'right',
      rotation: -30
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
    xDateFormat:'%Y-%m-%d',
    pointFormat:' {point.y}',
    shared: true,
    crosshairs: true,
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
    enabled:false 
  },


};
export {
  calConfig,
  leftMenu,
  chartConfig,
  MenuStore,
}