import { ActionTree } from 'vuex';

import { RESET_FLOW, ADD_INSURED } from './mutation-types';
import { noNormalDate, uuid, getCustomerData } from '@/utils';
import UDate from '@/utils/UDate';
import { terminalUpdateCustomer } from '@/api';

import LogCode from '@/lib/LogCore';
const logCode = new LogCode('store/insure/action');

export const actions: ActionTree<FeiHang.InsureParam, FeiHang.RootState> = {
    asyncPrint({ commit, state }, padload: Payload): any {
   
    },
    addInsured({ commit, state }, padload: Payload) {
        let  insured =getCustomerData(padload.content,'02')
        terminalUpdateCustomer({
            holder: getCustomerData(padload.content),
            insureds: [
                insured
            ]
        })
        commit(ADD_INSURED, {
            content:insured
        });
    },
    resetFlow({ commit, state }): any {
        commit(RESET_FLOW, {
            content: {
                appTime: noNormalDate(UDate.now(0, 'yyyy-MM-dd hh:mm:ss')),
                businessNo: uuid()
            }
        })
    },
    setPremium({ commit, state, rootState }): any {
     
        logCode.debug('设置保费', state);
    }
};