
type InsurePrintInfos = {
    //受益人
    beneficiary: string,
    // 身份证号码
    cardNo: string,
    // 身份证类型
    cardType: string,
    // 投保止期
    endTime: string,
    // 被保人
    insured: string,
    // 保单号
    policyNo: string,
    // 投保起期
    startTime: string
    // 投保单号
    applyPolicyNo: string
    // 车牌号
    platNo?: string
}
type PrintOpt = {
    // 公司名称
    insureCompany: string
    //机场代码
    airportCode: string,
    infos: Array<InsurePrintInfos>
    // 产品代码
    code: string
    // // 套餐代码
    // pkgCode: string
    // 打印短名称
    sName: string
    // 折扣保费
    totalInsuredAmt: number
    // 原保费
    originalPremiumAmt: number
    // 推广员代码
    promoteCode?: string
    // 推广员名称
    promoteName?: string
    //是否现金
    isCash:boolean
}
type ProductConfigOpt = {
    //产品代码
    code: string
    // 产品名称
    name: string
    // 套餐代码
    packageCode: string
    // 原始总保费
    originalPremiumAmt: number
    // 实际保费
    actualPremiumAmt: number
     /**
     * 角标图片
     */
    badgeImg:string
    /**
     * 主题
     */
    theme:any 
    //总保额
    totalInsuredAmt: number
    /**
     * 保险期限
     */
    period: number
    term?: string
    /**
     * 列表页图片
     */
    hot: string
    /**
     * 详细页banner图片
     */
    banner: string
    /**
     * 常见问题图片
     */ 
    question: string
    detail: string
    /**
     * 须知url
     */
    noticeUrl: string
    /**
     * 条款url
     */
    clauseUrl: string
    /**
     * 产品介绍
     */
    desc: string
    /**
     * 责任列表
     */
    duty: Array<any>
    /**
     * 显示价格
     */
    price: number
    /**
     * 价格颜色
     */
    // priceColor?: string
    /**
     * 打印名称
     */
    sName: string
    /**
     * 产品的支持的证件类型
     */
    certificates?: Array<any>
    /**
     * 是否隐藏产品
     */
    hide?: boolean
    /**
     * 排除机场不显示[机场代码]
     */
    exclude?: Array<string>
    /**
     * 只有特定机场显示[机场代码]优先级高于exclude
     */
    only?: Array<string>
    /**
     * 推迟
     */
    delay?: number
    /**
     * 止期格式化
     */
    endDateFormat?: string
    /**
     * 最小起保日期 T + dataMinDay
     */
    dateMinDay?:number
    /**
     * 最大起保日期 T + dataMaxDay
     */
    dateMaxDay?:number
    /**
     * 是否检查产品购买（相似或相同）
     */
    isCheckProduct?:boolean
}
interface Payload {
    type?: string
    content: any
    obj?: any
}
type RelationType = '' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14'
type CertificatesType = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '13' | '99'
type SexType = '' | 'F' | 'M'


interface ReadIDCardOpt {
    /**
     * 身份证号码
     */
    cardNo: string
    /**
     * 地址
     */
    address: string
    /**
     * 签发机关
     */
    police: string
    /**
     * 有效期
     */
    endTime: string
    /**
     * 姓名
     */
    name: string
}

/**
 * app沟通对象
 */
declare let WebViewJavascriptBridge: any

/**
 * 基础对象
 */
interface BaseRootState {
   /**
    * 版本
    */
    version: string;
    /**
     * 是否更新
     */
    pullVersion:boolean,
    /**
     * 标题
     */
    title: string
    /**
     * 左文本
     */
    toolbarLeftText: string
    /**
     * 右文本
     */
    toolbarRightText: string
    /**
     * 是否显示
     */
    toolbarShow: boolean
    /**
     * 名称
     */
    name: string,
}
