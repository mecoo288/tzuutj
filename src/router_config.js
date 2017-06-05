//import tr from 'components/tr/tr';
//chart
import chart_base from 'components/charts/base';
//import chart_order from 'components/charts/order';

import base_dd from 'components/charts/base/dd/base.vue';
import index from 'components/page/';

import dd_country from 'components/charts/base/dd/country.vue';
import dd_country_chart from 'components/charts/base/dd/country_chart_base.vue'
import dd_country_chart_zdd from 'components/charts/base/dd/chart/zdd.vue'
import dd_country_chart_ddxq from 'components/charts/base/dd/chart/ddxq.vue'
import dd_country_chart_cdje from 'components/charts/base/dd/chart/cdje.vue'
import dd_country_chart_cdsl from 'components/charts/base/dd/chart/cdsl.vue'
import dd_country_chart_tdje from 'components/charts/base/dd/chart/tdje.vue'
import dd_country_chart_tdsl from 'components/charts/base/dd/chart/tdsl.vue'
import dd_country_chart_bzje from 'components/charts/base/dd/chart/bzje.vue'
import dd_country_chart_bzsl from 'components/charts/base/dd/chart/bzsl.vue'
import dd_country_chart_ddjj from 'components/charts/base/dd/chart/ddjj.vue'

import dd_city from 'components/charts/base/dd/city.vue';
import dd_detail from 'components/charts/base/dd/detail.vue';



import base_fwz from 'components/charts/base/fwz/base.vue';
import fwz_country from 'components/charts/base/fwz/country.vue';
import fwz_country_chart_fwzsl from 'components/charts/base/fwz/chart/fwzsl.vue'
import fwz_country_chart_drxzsl from 'components/charts/base/fwz/chart/drxzsl.vue'
import fwz_country_chart_sxztrs from 'components/charts/base/fwz/chart/sxztrs.vue'
import fwz_country_chart_xxztrs from 'components/charts/base/fwz/chart/xxztrs.vue'
import fwz_country_chart_ygzrs from 'components/charts/base/fwz/chart/ygzrs.vue'
import fwz_country_chart_wgzrs from 'components/charts/base/fwz/chart/wgzrs.vue'



import fwz_city from 'components/charts/base/fwz/city.vue';
import fwz_detail from 'components/charts/base/fwz/detail.vue';

import base_hh from 'components/charts/base/hh/index.vue';
import base_ds from 'components/charts/base/ds/index.vue';
import base_fc from 'components/charts/base/fc/index.vue';
import base_sp from 'components/charts/base/sp/index.vue';

// import goods from 'components/goods/goods'
// import ratings from 'components/ratings/ratings'
// import seller from 'components/seller/seller';
import login from 'components/page/login/login';
import changepwd from 'components/page/changePWD/';
import home from 'components/page/home/index';
import limit from 'components/page/limit/index';
import total from 'components/page/home/total';
import order from 'components/page/home/order';
import provider from 'components/page/home/provider';


const routes = [
{
  path: '',
  redirect: '/home'
}, {
  path: '/login',
  component: login
},
{
  path:'/changePWD',
  component: changepwd
},
{
  path: '/limit',
  component: limit
},{
  path:"/index",
  component: index,
  children:[
  /*首页*/
  {
    path: '/home',
    component: home,
    redirect:'/home/total',
    children:[

    {
      path:'total',
      component: total
    },{
      path:'order',
      component: order
    },{
      path:'provider',
      component: provider
    }
    ]
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
