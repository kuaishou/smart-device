import {post,get} from '@/common/fetch'
export const sendSms = (data) => {
    data = Object.assign({
        smsSource: 'usercenter',
        smsType: 'sms-usercenter-login',
    }, data)
    console.log('sendSms', data)
    return post(`/pup/usercenter/sms/sendSms`, data, {
        loading:false,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}