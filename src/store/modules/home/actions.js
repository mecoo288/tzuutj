import Vue from 'vue';
import {getCity, getTjBoth, getOrder, getProvider} from '../../../api/index.js';


// export const getDate = async function({commit,state,rootState}, parma){
//   var urls ={
//     total: '/api/Tongji/TjBoth',
//     order: '/api/Tongji/order',
//     provider: '/api/tongji/fwz'
//   }
//   // Vue.$root.openLoding(true);
//   var res = await request
//     .get(urls[parma.type])
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

const GET_city = (stroe, parma) =>{
  return getCity(stroe, parma)
}
const  GET_tjBoth = (stroe, parma) =>{
  return getTjBoth(stroe, parma)
}
const GET_order = (stroe, parma) => {
  return  getOrder(stroe, parma)
}

const GET_provider = (stroe, parma) => {
  return  getProvider(stroe, parma)
}

export default {
	GET_order,
	GET_city,
	GET_tjBoth,
	GET_provider
}
