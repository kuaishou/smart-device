import { GetterTree } from 'vuex';
import { getStorage } from '@/utils';
// import { RootState } from './@types';

export const getters: GetterTree<FeiHang.RootState, FeiHang.RootState> = {
    insureCompany(state): string {
        // const { user } = state;
        // const firstName = (user && user.firstName) || '';
        // const lastName = (user && user.lastName) || '';
        // return `${firstName} ${lastName}`;
        
        return  getStorage('insureCompany');
    },
    payType(state): string {
     
        return  getStorage('payType');
    }
};