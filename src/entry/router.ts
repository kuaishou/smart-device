/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-17 15:44:10
 * @LastEditTime: 2019-08-10 09:01:21
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/login';
import Product from '@/pages/product';

import Identify from '@/pages/identify';

import store from '../store'

import {  SET_TITLE, SET_TOOLBAR_SHOW, SET_TOOLBAR_LEFT_TEXT, SET_TOOLBAR_RIGHT_TEXT } from '../store/mutation-types';
import { CLEAR_INSURED } from '../store/module/insure/mutation-types';
Vue.use(Router);
let router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/product',
      meta: {
        toolbarRightText: "出单记录",
        toolbarLeftText: "账号设置"
      },
      name: 'product',
      component: Product,
    },
    {
      path: '/detail',
      name: 'detail',
      meta: {
        title: '产品详情'
      },
      component: () => import(/* webpackChunkName: "async~query" */ '@/pages/detail/index.vue'),
    },
    {
      path: '/identify',
      meta: {
        title: '识别身份证'
      },
      name: 'identify',
      component: Identify,
    },
    {
      path: '/confirm',
      name: 'confirm',
      meta: {
        title: '确认信息'
      },
      // component: Confirm,
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/confirm/index.vue'),
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        title: '华安保险'
      },
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/error/index.vue'),
    },
    {
      path: '/entry',
      meta: {
        title: '录入信息'
      },
      name: 'entry',
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/entry/index.vue'),
    },
    {
      path: '/policy',
      meta: {
        title: '出单记录',
        toolbarRightText: "　统计"
      },
      name: 'policy',
      component: () => import(/* webpackChunkName: "async~query" */ '@/pages/policy/index.vue'),
    },
    {
      path: '/statistics',
      meta: {
        title: '出单统计'
      },
      name: 'statistics',
      component: () => import(/* webpackChunkName: "async~query" */ '@/pages/statistics/index.vue'),
    },
    {
      path: '/policyDetail',
      meta: {
        title: '保单详情'
      },   
      name: 'policyDetail',
      component: () => import(/* webpackChunkName: "async~query" */ '@/pages/policyDetail/index.vue'),
    },
    {
      path: '/cancelConfirm',
      meta: {
        title: '退保确认'
      },   
      name: 'cancelConfirm',
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/cancelConfirm/index.vue'),
    },
    {
      path: '/cancelStatus',
      meta: {
        title: '华安保险'
      },   
      name: 'cancelStatus',
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/cancelStatus/index.vue'),
    },
   
    {
      path: '/changePassword',
      meta: {
        title: '修改密码'
      },   
      name: 'changePassword',
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/changePassword/index.vue'),
    },
    {
      path: '/scanPay',
      meta: {
        title: '线上支付'
      },   
      name: 'scanPay',
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/scanPay/index.vue'),
    },    {
      path: '/inform',
      meta: {
        title: '健康告知'
      },   
      name: 'inform',
      component: () => import(/* webpackChunkName: "asyn~next" */ '@/pages/inform/index.vue'),
    },
  ],
});

router.beforeEach((to: any, from: any, next: Function) => {
  // document.title = to.meta.title || 'demo'
  // if (!to.query.url && from.query.url) {
  //     to.query.url = from.query.url
  // }
 
  if (to.name == 'Index') {

    store.commit(SET_TOOLBAR_SHOW, {
      content: false
    })
    //store.state.toolbarShow = false
  } else {
    //  store.state.toolbarShow = true
    store.commit(SET_TOOLBAR_SHOW, {
      content: true
    })
  }
  //设置右菜单
  store.commit(SET_TOOLBAR_RIGHT_TEXT, {
    content: to.meta.toolbarRightText
  })
  //设置左菜单
  store.commit(SET_TOOLBAR_LEFT_TEXT, {
    content: to.meta.toolbarLeftText || '返回'
  })
  // toolbarRightText
  if (to.meta.title) {
    store.commit(SET_TITLE, {
      content: to.meta.title
    })
    // store.state.title = to.meta.title
    // store.state.toolbarLeftText = ''
    // store.commit(SET_TOOLBAR_LEFT_TEXT, { content: '返回' })
  } else {
    // console.log('SET_NAME', store.state.name)
    store.commit(SET_TITLE, { content: store.state.name })
    // store.commit(SET_TOOLBAR_LEFT_TEXT, { content: '切换工号' })
    // store.state.title = store.state.name
    // store.state.toolbarLeftText = ''
  }

  if ((to.name == 'identify' || to.name == 'entry') && to.query.noDel != 'true' && from.name == 'confirm') {
    console.log('删除联系人', to, from)
    // insure.insureds = []
    store.commit(CLEAR_INSURED)
  }
  if ((to.name == 'product') && to.query.backExit != 'true') {
    // to.query.backExit = 'true'
    next({
      path: '/product',
      query: {
        backExit: 'true'
      }
    })
  } else {
    next()
  }
  // console.log(to)


})
export default router