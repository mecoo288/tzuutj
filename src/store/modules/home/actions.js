import Vue from 'vue';
var request = require("superagent");

export const getDate = async function({commit,state,rootState}, parma){
  var urls ={
    total: '/api/Tongji/TjBoth',
    order: '/api/Tongji/order',
    provider: '/api/tongji/fwz'
  }
  // Vue.$root.openLoding(true);
  var res = await request
    .get(rootState.default.reqUrl+ urls[parma.type])
    .query(parma.data);
    // res.then(function(_res){
    //   console.log(_res)
    // });
  return res;
};

export const getCity = async function({commit,state,rootState}, parma){
  var res = await request
    .get(rootState.default.reqUrl+"/api/common/getUserCitys");
  return res;
}
