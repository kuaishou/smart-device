/* eslint-disable */
import Verify from './src/index'
import {
    identityValid
} from './src/lib/idcard'
// 扩展必选
Verify.hook('errMsg', function () {

})
Verify
    .install('name', function (value, msg) {
        this.$$errMsg = msg || '请准确填写，如遇生僻字请用拼音';

        return /^[\u4e00-\u9fa5a-zA-Z]{2,25}$/.test(value);
    })
    .install('required', function (value, msg) {
        this.$$errMsg = msg;
        return value != undefined && value != null && value != '';
    })
    .install('isChinese', function (value, msg) {
        this.$$errMsg = msg;
        return /[\u4e00-\u9fa5]/.test(value);
    })
    .install('equals', function (value, text, msg) {
        console.log('equals', value, text)
        this.$$errMsg = msg;
        return value === text;
    })
    .install('length', function (value, min, max) {

        return !(value.length < min || value.length > max)

    })
    .install('phone', function (value, msg) {
        this.$$errMsg = msg || '请填写正确的手机号';
        var phoneReg = /^1\d{10}$/;
        //电话

        return phoneReg.test(value);

    })
    .install('gt', function (value, a) {
        //    console.log(value)
        console.log('gt', a);
        //    console.log(value.length<value)
        return value > a;

    })
    .install('isFalse', function (value, msg) {
        this.$$errMsg = msg
        console.log('value', value)
        return value !== false;

    })
    .install('isTrue', function (value, msg) {
        this.$$errMsg = msg
        return value === true;

    })
    .install('smsCode', function (value, msg) {

        this.$$errMsg = msg || '请填写正确的验证码'
        return value && value.length == 6;

    })
    // 身份证
    .install('idCard', function (value, msg) {
        this.$$errMsg = msg || '请填写准确的身份证号'

        return identityValid(value)

    })
    .install('email', function (value, msg) {

        this.$$errMsg = msg || '请填写准确电子邮箱'
        return value != '';
    })
    // 护照
    .install('passport', function (value, msg) {


        // console.log('value',/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(value))
        //    alert('sss',!!/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(value))
        this.$$errMsg = msg || '请填写准确的护照号'
        return value && value.length >= 8;

    })
export default Verify;
