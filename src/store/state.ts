const  {version} = require('../../package.json')
const state: FeiHang.RootState = {
  // openid: '',
  cancelPolicy:[],
  product: {
    productCode: '',
    packageCode: '',
    productName: '',
    totalInsuredAmt: '',
    originalPremiumAmt: '',
    actualPremiumAmt: '',
  },
  queryPolicyObject: {
    channel: {
      channelCode: 'feihang',
      accessUser: 'micro',
      accessPassword: 'micro123'
    },
    policy: {
      policyAppNo: '',
      policyNo: ''
    },
    trans: {
      transCode: '20001',
      transType: '01'
    }
  },
  //1-非见费，2-见费
  payType:0,
  title: '华安保险',
  toolbarLeftText: '返回',
  toolbarRightText: '',
  toolbarShow: false,
  name: '',
  pullVersion:false,
  version
}
export default state;

