import {MenuStore} from "../pages/data/config.js";
const activMenu = (state, payload) => {
  state.menuActived = payload;
}

const needLogged = (state, payload) => {
  
}

const setMenus = (state, {that, menus = []}) => {
	let MENU = [],
		LIMITPATH = {
			'/p404': true
		};
	for(let key in MenuStore){
		LIMITPATH[ MenuStore[key].url ] = false;
	}
	state.limitPath = LIMITPATH;
 	menus.forEach((menu) =>{
 		let smenu = MenuStore[menu.menuId];
 		if(smenu){
 			state.limitPath[ smenu.url ] = true;
 			MENU.push(Object.assign(smenu, {name:menu.name, id: menu.menuId}))
 		}
 	});
 	state.leftMenus = MENU;
}
export default{
  activMenu,
  needLogged,
  setMenus,
}