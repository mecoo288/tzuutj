import {getCity, getTjBoth, getOrder, getProvider} from '../../../api/index.js';

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
