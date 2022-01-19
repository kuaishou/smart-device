
import { ActionTree,Commit } from 'vuex';
import { SET_PRODUCT, SET_PAY_TYPE } from './mutation-types';
import { SET_PACKAGE } from './module/insure/mutation-types';
import { setStorage } from '@/utils';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('store/action');
export const actions: ActionTree<FeiHang.RootState, FeiHang.RootState> = {
    setProduct({ commit},padload:Payload): any {
        logCode.debug('设置产品')
        logCode.debug(padload);
        commit(SET_PRODUCT,padload);
        commit(SET_PACKAGE,{
            content:{
                packageCode:padload.content.packageCode,
                productCode:padload.content.productCode
            }
        })
    },
    setPayType({ commit},padload:Payload) {
        
        setStorage('payType',padload.content); 
        commit(SET_PAY_TYPE,padload);
    },
    setInsureCompany({ commit},padload:Payload) {
        
       
        setStorage('insureCompany',padload.content); 
        // commit(SET_INSURE_COMPANY,padload);
    },
    setSalesCode({ commit},padload:Payload) {
        setStorage('salesCode',padload.content); 
    }
};