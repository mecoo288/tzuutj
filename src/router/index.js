import index from '../pages/';

import login from '../pages/account/login/';
import changepwd from '../pages/account/changePWD/';
import home from '../pages/home/index';
import authorize from '../pages/authorize/index';
import home_total from '../pages/home/total';
import home_order from '../pages/home/order';
import home_provider from '../pages/home/provider';

import order from '../pages/order/'
import order_date from '../pages/order/date'
import order_date_city from '../pages/order/city'

import sales from '../pages/sales/';
import sales_recruit from '../pages/sales/recruit';
import sales_recruit_date from '../pages/sales/provider';

import divide from '../pages/divide/';

import download from '../pages/download/';

import reward from '../pages/reward/';

import talk from '../pages/talk/';

import provider from '../pages/provider/';



/* 
k.liu rebuild
2017-6-9
*/

import product from '../pages/product/'

const routes = [
{
  path: '',
  redirect: '/home'
}, {
  path: '/login',
  component: login
},{
  path:'/changePWD',
  component: changepwd
},{
  path: '/authorize',
  component: authorize
},{
  path:"/index",
  component: index,
  children:[
  {
    path: '/home',
    component: home,
    redirect:'/home/total',
    children:[
    {
      path:'total',
      component: home_total
    },{
      path:'order',
      component: home_order
    },{
      path:'provider',
      component: home_provider
    }
    ]
  },{
    path:'/product',
    component: product,
  },{
    path:'/sales',
    component: sales,
  },{
    path:'/sales/:recruit',
    component: sales_recruit,
  },{
    path:'/sales/:recruit/:date',
    component: sales_recruit_date,
  },{
    path:'/order',
    component: order,
  },{
    path:"/order/:date",
    component: order_date
  },{
    path:"/order/:date/:city",
    component: order_date_city
  },{
    path:'/divide',
    component: divide
  },{
    path:'/talk',
    component: talk
  },{
    path:'/reward',
    component: reward
  },{
    path:'/provider',
    component: provider
  },{
    path:'/download',
    component: download
  },{
    path:'/download/:type',
    component: download
  },
  ]
}
]


export default routes
