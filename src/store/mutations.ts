import { MutationTree } from 'vuex';
import * as types from './mutation-types'
import Vue from 'vue';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('store/mutations')
export const mutations: MutationTree<FeiHang.RootState> = {

    // [types.SET_INSURE_COMPANY](state: RootState,payload:Payload) {
    //     state.insureCompany = payload.content;

    // },
    [types.SET_PAY_TYPE](state: FeiHang.RootState, payload: Payload) {
        state.payType = payload.content;

    },
    [types.SET_TITLE](state: FeiHang.RootState, payload: Payload) {
        state.title = payload.content;

    },
    [types.SET_TOOLBAR_LEFT_TEXT](state: FeiHang.RootState, payload: Payload) {
        state.toolbarLeftText = payload.content;

    },
    [types.SET_TOOLBAR_RIGHT_TEXT](state: FeiHang.RootState, payload: Payload) {
        state.toolbarRightText = payload.content;

    },
    [types.SET_TOOLBAR_SHOW](state: FeiHang.RootState, payload: Payload) {
        state.toolbarShow = payload.content;

    },
    [types.SET_NAME](state: FeiHang.RootState, payload: Payload) {
        state.name = payload.content;

    },
    [types.SET_VERSION](state: FeiHang.RootState, payload: Payload) {
        state.version = payload.content;
    },
    [types.SET_PRODUCT](state: FeiHang.RootState, payload: Payload) {
        //  state.name = payload.content;
        state.product = payload.content;
    }, 
    [types.SET_CANCEL_POLICY](state: FeiHang.RootState, payload: Payload) {
        //  state.name = payload.content;
        state.cancelPolicy = payload.content;
    },
    [types.SET_POLICY_VERIFY](state: FeiHang.RootState, payload: Payload) {
        //  state.name = payload.content;
        // state.cancelPolicy = payload.content;
        Vue.set(state.cancelPolicy[payload.content.index],'verify',payload.content.value)
    },
    [types.SET_PULL_VERSION](state: FeiHang.RootState, payload: Payload) {
        state.pullVersion =  payload.content
    },
};