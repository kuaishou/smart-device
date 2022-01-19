import '@/lib/WebViewJavascriptBridge'
import 'lib-flexible'
import '@/assets/css/base.less'

import '@/utils/extend'
import Vue from 'vue'



import { certificates } from '@/common/utils/string'
import { format } from '@/common/utils/date'


Vue.filter('date', format)
Vue.filter('certificates', certificates)

import MDialog from '@/common/vui/plugins/MDialog'
import Alert from '@/common/vui/plugins/Alert'

import DateTime from '@/common/vui/plugins/DateTime';
import { Loading, Toast, bus } from '@/common/vui'

Vue.use(MDialog);
Vue.use(Alert);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(DateTime);
Vue.use(bus)