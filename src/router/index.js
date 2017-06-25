import p404 from '../pages/404'
import index from '../pages/';


import account from '../pages/account/';
import account_login from '../pages/account/login/';
import account_changepwd from '../pages/account/changePWD/';
import home from '../pages/home/index';
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
  path: '*',
  component: p404
},
{
  path: '',
  redirect: '/home'
},{
  path:'/account',
  component: account,
  children:[
  {
    path: '/login',
    name: 'login',
    component: account_login
  },{
    path:'/changePWD',
    name: 'changePWD',
    component: account_changepwd
  },
  ]
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
      name:'home_total',
      component: home_total
    },{
      path:'order',
      name:'home_order',
      component: home_order
    },{
      path:'provider',
      name:'home_provider',
      component: home_provider
    }
    ]
  },{
    path:'/product',
    name:'product',
    component: product,
  },{
    path:'/sales',
    name:'sales',
    component: sales,
  },{
    path:'/sales/:recruit',
    component: sales_recruit,
  },{
    path:'/sales/:recruit/:date',
    component: sales_recruit_date,
  },{
    path:'/order',
    name:'order',
    component: order,
  },{
    path:"/order/:date",
    component: order_date
  },{
    path:"/order/:date/:city",
    component: order_date_city
  },{
    path:'/divide',
    name:'divide',
    component: divide
  },{
    path:'/talk',
    name:'talk',
    component: talk
  },{
    path:'/reward',
    name:'reward',
    component: reward
  },{
    path:'/provider',
    name:'provider',
    component: provider
  },{
    path:'/download',
    name:'download',
    component: download
  },{
    path:'/download/:type',
    component: download
  },
  ]
}
]


export default routes
