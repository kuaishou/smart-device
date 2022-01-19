export = memberModule;
declare class memberModule {
    constructor(someParam?: string);
    //设置
    static setToken:(value:any)=>any
    static getToken:()=>string

    static setWxToken:(value:any)=>any
    static getWxToken:()=>string

    static setWeiXinInfo:(value:AuthWeiXinInfo)=>string
    
    static getWeiXinInfo:()=>AuthWeiXinInfo
    
    static getOpenID:(key:string)=>string
    
    static isLogin:()=>boolean
    static setLogin:(key:string)=>0
    static checkLogin:(success:Function,error?:Function)=>0
    static toWxAuthorize:(userinfo?:boolean|AuthorizeOpt)=>any
    static toLogin:(loginBackUrl?:string)=>any

    static url:string
}
type AuthWeiXinInfo = {
    openid:string
    nickname:string
    headimgurl:string
}
type AuthorizeOpt = {
    userinfo?:boolean,
    appCode?:string
    replace?:boolean
}