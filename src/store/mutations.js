import {MenuStore} from "../pages/data/config.js";
const activMenu = (state, payload) => {
  state.menuActived = payload;
}

const needLogged = (state, payload) => {
  
}

const setMenus = (state, {that, menus = []}) => {
	let MENU = [];
 	menus.forEach((menu) =>{
 		let smenu = MenuStore[menu.menuId];
 		if(smenu){
 			MENU.push(Object.assign(smenu, {name:menu.name, id: menu.menuId}))
 		}
 	});
 	state.leftMenus = MENU;
}
export default{
  activMenu,
  needLogged,
  setMenus
}