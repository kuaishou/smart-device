import { baseUrl } from '@/common/config/env';

const state: FeiHang.InsureParam = {

    holder: {
        bornDate: '',
        holderName: '',
        idcartNo: '',
        idcartType: '01',
        mobile: '',
        // identifyExpiry: '',
        // residentialAddr: '',
        // authority: '',
        // nationalityCode: '',
        // nationalityName: '',
        // occupationCode:'',
        // occupationName:'',
        // occupationLeve: '',
        // occupationLevelName: '',
        // releation: ,
        sex: 'M'
    },
    insureds: [
    ],
    payment: {
        payType: '1'
    },
    trans: {
        scanQRCode: "Y",
        // paymentRedirectAddr: `${baseUrl}/eb-web/vue/smart-device/#/confirm`
        // paymentRedirectAddr: `http://http://10.11.29.214:8080/eb-web/vue/smart-device/#/confirm`
    },
    policy: {
        actualPremiumAmt: 0,
        appTime: '',
        businessNo: '',
        insuredBgnTime: '',
        insuredEndTime: '',
        insuredQuantity: 1,
        originalPremiumAmt: 0,
        // policyPeriod: 2, 
        totalInsuredAmt: 0
    },
    policyExt: {
        // airport: '',
        airportCode: '',
        promoteCode: '',
        promoteName: '',
        taskId:''
    },
    product: {
        packageCode: '',
        productCode: ''
    },
    riskExt: {
        hbh: '',
        hbqfsj: ''
    },
    saleInfo: {
        accessPassword: 'micro123',
        accessUser: 'micro',
        channelCode: 'feihang',

    },
    source: {
        saleTerminal: '0003',
        saleTerminalId: ''
    }

}
export default state;