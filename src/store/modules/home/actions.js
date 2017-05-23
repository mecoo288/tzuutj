import Vue from 'vue';
import {getCity, getTjBoth, getOrder, getProvider} from '../../../api/index.js';

// var request = require("superagent");

// export const getDate = async function({commit,state,rootState}, parma){
//   var urls ={
//     total: '/api/Tongji/TjBoth',
//     order: '/api/Tongji/order',
//     provider: '/api/tongji/fwz'
//   }
//   // Vue.$root.openLoding(true);
//   var res = await request
//     .get(rootState.default.reqUrl+ urls[parma.type])
//     .query(parma.data);
//     // res.then(function(_res){
//     //   console.log(_res)
//     // });
//   return res;
// };

// export const getCity = function({commit,state,rootState}, parma){
//   let res = new Promise(function(resolve, reject){
//     request
//     .get(rootState.default.reqUrl+"/api/common/getUserCitys")
//     .then(function(res){
//       console.log(res);
//     });
//   });
//   return res;
// }

const GET_city = (parma) =>{
  return getCity
}
const  GET_tjBoth = (parma) =>{
  return getTjBoth
}
const GET_order = (parma) => {
  return  getOrder
}

const GET_provider = (parma) => {
  return  getProvider
}

export {
  GET_city,
  GET_tjBoth,
  GET_provider
}
