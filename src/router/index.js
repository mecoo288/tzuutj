import chart_base from '../pages/charts/base';

import base_dd from '../pages/charts/base/dd/base.vue';
import index from '../pages/';

import dd_country from '../pages/charts/base/dd/country.vue';
import dd_country_chart from '../pages/charts/base/dd/country_chart_base.vue'
import dd_country_chart_zdd from '../pages/charts/base/dd/chart/zdd.vue'
import dd_country_chart_ddxq from '../pages/charts/base/dd/chart/ddxq.vue'
import dd_country_chart_cdje from '../pages/charts/base/dd/chart/cdje.vue'
import dd_country_chart_cdsl from '../pages/charts/base/dd/chart/cdsl.vue'
import dd_country_chart_tdje from '../pages/charts/base/dd/chart/tdje.vue'
import dd_country_chart_tdsl from '../pages/charts/base/dd/chart/tdsl.vue'
import dd_country_chart_bzje from '../pages/charts/base/dd/chart/bzje.vue'
import dd_country_chart_bzsl from '../pages/charts/base/dd/chart/bzsl.vue'
import dd_country_chart_ddjj from '../pages/charts/base/dd/chart/ddjj.vue'

import dd_city from '../pages/charts/base/dd/city.vue';
import dd_detail from '../pages/charts/base/dd/detail.vue';



import base_fwz from '../pages/charts/base/fwz/base.vue';
import fwz_country from '../pages/charts/base/fwz/country.vue';
import fwz_country_chart_fwzsl from '../pages/charts/base/fwz/chart/fwzsl.vue'
import fwz_country_chart_drxzsl from '../pages/charts/base/fwz/chart/drxzsl.vue'
import fwz_country_chart_sxztrs from '../pages/charts/base/fwz/chart/sxztrs.vue'
import fwz_country_chart_xxztrs from '../pages/charts/base/fwz/chart/xxztrs.vue'
import fwz_country_chart_ygzrs from '../pages/charts/base/fwz/chart/ygzrs.vue'
import fwz_country_chart_wgzrs from '../pages/charts/base/fwz/chart/wgzrs.vue'



import fwz_city from '../pages/charts/base/fwz/city.vue';
import fwz_detail from '../pages/charts/base/fwz/detail.vue';

import base_hh from '../pages/charts/base/hh/index.vue';
import base_ds from '../pages/charts/base/ds/index.vue';
import base_fc from '../pages/charts/base/fc/index.vue';
import base_sp from '../pages/charts/base/sp/index.vue';

import login from '../pages/account/login/';
import changepwd from '../pages/account/changePWD/';
import home from '../pages/home/index';
import limit from '../pages/limit/index';
import home_total from '../pages/home/total';
import home_order from '../pages/home/order';
import home_provider from '../pages/home/provider';

import order from '../pages/order/'

import sales from '../pages/sales/';

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
  path: '/limit',
  component: limit
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
    children: []
  },{
    path:'/sales',
    component: sales,
  },{
    path:'/order',
    component: order
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
    path: '/charts',
    component: chart_base,
    children: [{
      path: 'dd',
      component: base_dd,
      children: [{
        path: 'country',
        component: dd_country,
        children: [{
          path: 'zdd',
          component: dd_country_chart_zdd
        }, {
          path: 'ddxq',
          component: dd_country_chart_ddxq
        }, {
          path: 'cdje',
          component: dd_country_chart_cdje
        }, {
          path: 'cdsl',
          component: dd_country_chart_cdsl
        }, {
          path: 'tdje',
          component: dd_country_chart_tdje
        }, {
          path: 'tdsl',
          component: dd_country_chart_tdsl
        }, {
          path: 'bzje',
          component: dd_country_chart_bzje
        }, {
          path: 'bzsl',
          component: dd_country_chart_bzsl
        }, {
          path: 'ddjj',
          component: dd_country_chart_ddjj
        }]
      }, {
        path: 'city',
        component: dd_city,
      }, {
        path: 'detail',
        component: dd_detail,
      }]
    }, {
      path: 'fwz',
      component: base_fwz,
      children: [{
        path: 'city',
        component: fwz_city,
      }, {
        path: 'detail',
        component: fwz_detail,
      }, {
        path: 'country',
        component: fwz_country,
        children: [

        {
          path: 'fwzsl',
          component: fwz_country_chart_fwzsl
        }, {
          path: 'drxzsl',
          component: fwz_country_chart_drxzsl
        }, {
          path: 'sxztrs',
          component: fwz_country_chart_sxztrs
        },

        {
          path: 'xxztrs',
          component: fwz_country_chart_xxztrs
        },

        {
          path: 'ygzrs',
          component: fwz_country_chart_ygzrs
        }, {
          path: 'wgzrs',
          component: fwz_country_chart_wgzrs
        }]
      }]
    }, {
      path: 'hh',
      component: base_hh
    }, {
      path: 'ds',
      component: base_ds
    }, {
      path: 'fc',
      component: base_fc
    }, {
      path: 'sp',
      component: base_sp
    }]
  }

  ]
}
]


export default routes
