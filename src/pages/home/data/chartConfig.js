export default {
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
    enabled:false 
  },


};