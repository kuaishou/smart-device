
interface SaleInfoParam {
    accessPassword: string,
    accessUser: string,
    channelCode: string,
    salesCode?: string
    subChannelCode?:string
}
interface ProductParam {
    packageCode: string
    productCode: string
}
interface BasicInsuredInfo {
   /**
    * 关系
    */
    releation?: RelationType,
    /**
     * 证件号码
     */
    idcartNo: string,
    /**
     * 证件类型
     */
    idcartType:CertificatesType
    /**
     * 手机号码
     */
    mobile?: string,
    /**
     * 性别
     */
    sex?: SexType,
    /**
     * 邮箱
     */
    mail?: string,
    /**
     * 证件有效期
     */
    identifyExpiry?:string
    /**
     * 是否长期
     */
    identifyLongValid?:'0'|'1'
    /**
     * 证件住址
     */
    residentialAddr?:string
    /**
     * 签发机关
     */
    authority?:string
    /**
     * 国籍中文
     */
    countryName ?:string
    /**
     * 国籍（编码）
     */
    country?:string
    /**
     * 职业大类（工种）
     */
    occupationGroupCode?:string
    /**
     * 职业大类（工种-中文）
     */
    occupationGroupName ?:string
    /**
     * 职业小类编码
     */
    occupationCode?:string
     /**
      * 职业小类中文
      */
     occupationName?:string
    //  areaCode:''
    //  areaName :''
    /**
     * 年龄
     */
    age?: number,
    /**
     * 拼音
     */
    nameSpell?: string
}
interface HolderParam extends BasicInsuredInfo {
    holderName: string,
    holderParam?: string,
    holderType?:string
    bornDate?: string,
}
interface PolicyParam {
    actualPremiumAmt: number,
    appTime: string,
    businessNo: string,
    insuredBgnTime: string,
    insuredEndTime: string,
    insuredQuantity: number,
    originalPremiumAmt: number,
    totalInsuredAmt: number
    policyPeriod?: number
}



interface PolicyExtParam {
    // xcx_lxx?: string
    // airport?: string
    promoteCode?: string
    promoteName?: string
}
interface InsuredParam extends BasicInsuredInfo {

    bornDate: string,
    /**
     * 被保人名称
     */
    insuredName: string,
    insuredParam?: string,
    insuredExt?:any
}
interface BaseInsureParam {

    saleInfo: SaleInfoParam,
    product: ProductParam
    policy: PolicyParam
    holder: HolderParam
    insureds: Array<InsuredParam>
    // riskExt: RiskExtParam
    source?: any
    // payment: {
    //     payParam?: string
    // }
    // trans?: {
    //     paymentRedirectAddr: string
    // }
    policyExt: PolicyExtParam
    // tempDataMap?: {
    //     miniAppCode: string
    //     miniOpenId: string
    // }
}