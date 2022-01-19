
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
// import { RootState } from './@types';

import state from './state'
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

import insure from './module/insure'

Vue.use(Vuex);

const store: StoreOptions<FeiHang.RootState> = {
    getters,
    actions,
    mutations,
    state,
    modules: {
        insure
    }
};
// export default {
//     install:function(Vue:any) {
//        console.log('挂在store')
//        Vue.prototype.$store =  new Vuex.Store<RootState>(store);
//     }
// }
export default new Vuex.Store<FeiHang.RootState>(store);