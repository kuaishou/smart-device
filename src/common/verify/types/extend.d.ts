import { Verify } from './verify';
declare module "./verify" {
    interface Verify {
        /**
        
        */
        errMsg(...msg:string[]): Verify; 
        /**
         * 校验长度
         * @param min 最小长度
         * @param max 最大长度
         */
        length(min:number,max:number): Verify;
        /**
         * 校验必选
         * @param msg 校验不通过提示
         */
        required(msg?:string): Verify;
         /**
         * 校验中文
         * @param msg 校验不通过提示
         */
        isChinese(msg?:string): Verify;
        /**
         * 校验姓名
         * @param msg 校验不通过提示
         */
        name(msg?:string): Verify;
        /**
         * 校验手机号
         * @param msg 校验不通过提示
         */
        phone(msg?:string): Verify;
        /**
         * 校验邮件
         * @param msg 校验不通过提示
         */
        email(msg?:string): Verify;
        contain(): Verify;
        isNumber(): Verify;
        isNull(): Verify;
        isNullOrEmpty(): Verify;
        isEmpty(): Verify;
        isUndefined(): Verify;
        gt(a:any): Verify;
        equals(a:any,msg?:any): Verify;
        isTrue(msg?:any): Verify;
        isFalse(msg?:any): Verify;
        idCard(msg?:any): Verify;
        /**
         * 校验护照
         * @param msg 校验不通过提示
         */
        passport(msg?:any):Verify
        /**
         * 校验短信验证码
         * @param msg 校验不通过提示
         */
        smsCode(msg?:any):Verify
    }
}