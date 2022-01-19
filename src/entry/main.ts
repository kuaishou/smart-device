import Vue from 'vue';

//配置导入
import '@/config/import'

import App from './App.vue';
import router from './router';
import store from '../store';
import '@/filter/index'

import Alert from "@/common/vui/components/Alert/index.vue";
import Agreement from "@/components/Agreement/index.vue";
import LogCode from '@/lib/LogCore';
import { isProduction } from '@/common/config/env';
LogCode.setLevel(isProduction ? LogCode.LEVEL_LOG : LogCode.LEVEL_DEBUG);


LogCode.exclude(['utils', 'common/ui/loading']);
Vue.component('Alert', Alert)
Vue.component('Agreement', Agreement)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  
  render: h => h(App),
}).$mount('#app');
