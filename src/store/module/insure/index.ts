// profile/index.ts
import { Module } from 'vuex';
import state from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

// const namespaced: boolean = true;

 const module: Module<FeiHang.InsureParam, FeiHang.RootState> = {
    // namespaced,
    state,
    getters,
    actions,
    mutations
};
export default module;