import { GetterTree } from 'vuex';
import { normalDate } from '@/utils';
import UDate from '@/utils/UDate';

export const getters: GetterTree<FeiHang.InsureParam, FeiHang.RootState> = {
    insuredBgnTime(state): string {
        
        return normalDate(state.policy.insuredBgnTime).format('yyyy-MM-dd hh:mm');
    },
    insuredEndTime(state): string {
       
        return normalDate(state.policy.insuredEndTime).format('yyyy-MM-dd hh:mm');
    },
    boardingDate(state): string {
        
        return UDate.value(normalDate(state.policy.insuredBgnTime).format('yyyy-MM-dd hh:mm'));
    },
    productCode(state):string{
        console.log('productCode',state.product)
        return state.product&&state.product.productCode;
    },
    promoteCode(state){
        console.log('promoteCode',state)
        return state.policyExt.promoteCode;
    },
    promoteName(state){
        console.log('promoteName',state)
        return state.policyExt.promoteName;
    }
};