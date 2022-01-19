/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-17 15:44:10
 * @LastEditTime: 2019-08-13 09:32:28
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
// import { cdnSysUrl } from '@/config/env';
import { isProduction, cdnUrl } from '@/common/config/env';
import UDate from '@/utils/UDate';
import { getConfig } from '@/utils';
const switchHSFlag = () => {
    let switchHSFlag = false,
        promote = getConfig();
    
    if (promote && promote.tracBackFlag) {
      if (promote.tracBackFlag == 0) { // 是否可回溯开关 0关 1开
        switchHSFlag = false;
        (window as any).SituRecorder = null;
      } else {
        switchHSFlag = true;
      }
    }
    return switchHSFlag
}
export const switchHS: boolean = switchHSFlag() //2020-09-15版本开关控制是否要开放功能: true开启需要强制观看协议, false不用看协议
export enum ProductTheme {
    Pink = 'pink_theme',
    Default = 'default_theme',
    Violet = 'violet_theme'
}

export const getProduct = (code: string): ProductConfigOpt | null => {
    let config = getProducts();

    for (let index = 0; index < config.length; index++) {
        const v = config[index];
        if (v.code === code) {
            return v;
        }
    }
    // return
    return null;
}
let getCertificatesConfig = () => {
    return [
        {
            name: "其他",
            code: "99"
        },
        {
            name: "身份证",
            code: "01"
        }, {
            name: "护照",
            code: "02"
        }, {
            name: "军人证",
            code: "03"
        }, {
            name: "台胞证",
            code: "05"
        }, {
            name: "港澳返乡证",
            code: "06"
        }
    ]
}

export const getProducts = () => {
    var config: Array<ProductConfigOpt> = [
        {
            name: "“e年畅行”健康意外综合保障",
            sName: "“e年畅行”健康意外综合保障",
            // only: ["11"],
            code: "P133201",
            packageCode: "P133201-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 20600 : 1,
            actualPremiumAmt: isProduction ? 20600 : 1,
            totalInsuredAmt: 1179000000,
            certificates:[{
                name: "身份证",
                code: "01"
            }],
            price: 206,
            // priceColor: 'red',
            period: UDate.getCalcOfStr("Y#1"),
            term: "1年",
            dateMinDay: 1,  //第二天起保
            hot: cdnUrl + require("../assets/img/P133201/hot.png"),
            banner: cdnUrl + require("../assets/img/P133201/banner.png"),
            question: cdnUrl + require("../assets/img/P133201/question.png"),
            detail: cdnUrl + require("../assets/img/P133201/detail.png"),
            noticeUrl: require('../assets/file/P133201/notice.htm'),
            clauseUrl: require('../assets/file/P133201/clause.htm'),
            desc: "高保额医疗+交通意外保障保1年",
            badgeImg: require('../assets/img/badge/zhunxiang.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 500000,
                    name: '航空意外伤害保险'
                }, {
                    amount: 100000,
                    name: '火车、高铁意外伤害保险'
                },
                {
                    amount: 100000,
                    name: '轮船意外伤害保险'
                }
                , {
                    amount: 20000,
                    name: '市内公共汽、电车意外伤害保险'
                },
                {
                    amount: 20000,
                    name: '出租车意外伤害保险'
                }, {
                    amount: 20000,
                    name: '长途公共汽车意外伤害保险'
                }, {
                    amount: 20000,
                    name: '旅行社客车、机场公共汽车意外伤害保险'
                }, {
                    amount: 5000,
                    name: '交通工具意外伤害保险'
                }, {
                    amount: 3000000,
                    name: '一般医疗保险'
                }, {
                    amount: 6000000,
                    name: '120种重大疾病医疗保险'
                }, {
                    amount: 1000000,
                    name: '质子重离子医疗保险'
                }, {
                    amount: 5000,
                    name: '重大疾病异地就医交通费用保险'
                }, {
                    amount: 1000000,
                    name: '附加恶性肿瘤院外特定药品费用医疗保险'
                }
            ]
        },
        {
            name: "航空人身意外伤害保险",
            sName: "航空意外险20元",
            // only: ["11"],
            code: "P061726",
            packageCode: "P061726-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt:2000,
            actualPremiumAmt:2000,
            totalInsuredAmt: 81000000,
            certificates: getCertificatesConfig(),
            price: 20,
            // priceColor: 'red',
            period: 5,
            term: "5",
            hot: cdnUrl + require("../assets/img/P061710/hot.png"),
            banner: cdnUrl + require("../assets/img/P061710/banner.png"),
            question: cdnUrl + require("../assets/img/P061710/question.png"),
            detail: cdnUrl + require("../assets/img/P061710/detail.png"),
            noticeUrl: require('../assets/file/P061726/notice.htm'),
            clauseUrl: require('../assets/file/P061726/clause.htm'),
            desc: "高额航空意外保障，适合差旅人士",
            badgeImg: require('../assets/img/badge/biaozhun.png'),
            theme: ProductTheme.Default,
            isCheckProduct: false,
            duty: [
                {
                    amount: 800000,
                    name: '航空意外身故残疾'
                }, {
                    amount: 10000,
                    name: '航空意外医疗'
                }
            ]
        },
        {
            name: "一路平安交通工具意外伤害保险",
            sName: "交通意外险50元",
            // only: ["11"],
            code: "P060143",
            packageCode: "P060143-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 5000 : 1,
            actualPremiumAmt: isProduction ? 5000 : 1,
            // originalPremiumAmt:5000,
            // actualPremiumAmt:5000,
            totalInsuredAmt: 243000000,
            certificates: getCertificatesConfig(),
            price: 50,
            // priceColor: 'red',
            period: 10,
            term: "10",
            hot: cdnUrl + require("../assets/img/P060110/hot.png"),
            banner: cdnUrl + require("../assets/img/P060110/banner.png"),
            question: cdnUrl + require("../assets/img/P060110/question.png"),
            detail: cdnUrl + require("../assets/img/P060110/detail.png"),
            noticeUrl: require('../assets/file/P060143/notice.htm'),
            clauseUrl: require('../assets/file/P060110/clause.htm'),
            desc: "150万高额保障，超10种交通工具",
            badgeImg: require('../assets/img/badge/gaoe.png'),
            theme: ProductTheme.Pink,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1500000,
                    name: '航空意外伤害保险金'
                }, {
                    amount: 150000,
                    name: '火车高铁意外伤害保险金'
                },
                {
                    amount: 150000,
                    name: '地铁轻轨意外伤害保险金'
                },
                {
                    amount:150000 ,
                    name: '轮船意外伤害保险金'
                },
                {
                    amount: 80000,
                    name: '市内公共汽、电车意外伤害保险金'
                },
                {
                    amount: 80000,
                    name: '出租车意外伤害保险金'
                },
                {
                    amount:80000 ,
                    name: '长途公共汽车意外伤害保险金'
                },
                {
                    amount: 80000,
                    name: '旅行社客车、机场公共汽车意外伤害保险金'
                },
                {
                    amount: 80000,
                    name: '私有汽车意外伤害保险金'
                },
                {
                    amount: 80000,
                    name: '公务汽车意外伤害保险金'
                }

            ]
        },
        {
            name: "航意&行李综合保障",
            sName: "航意行李险50元",
            // only: ["11"],
            code: "P132802",
            packageCode: "P132802-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt:5000,
            actualPremiumAmt:5000,
            totalInsuredAmt: 200430000,
            certificates: getCertificatesConfig(),
            price: 50,
            // priceColor: 'red',
            period: 7,
            term: "7",
            hot: cdnUrl + require("../assets/img/P132802/hot.png"),
            banner: cdnUrl + require("../assets/img/P132802/banner.png"),
            question: cdnUrl + require("../assets/img/P132802/question.png"),
            detail: cdnUrl + require("../assets/img/P132802/detail.png"),
            noticeUrl: require('../assets/file/P132802/notice.htm'),
            clauseUrl: require('../assets/file/P132802/clause.htm'),
            desc: "航空意外200万，行李丢失3000元",
            badgeImg: require('../assets/img/badge/zhunxiang.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 2000000,
                    name: '航空人身意外身故、伤残'
                }, {
                    amount: 3000,
                    name: '行李意外丢失赔偿'
                },
                {
                    amount: 300,
                    name: '行李箱体损失最高赔偿'
                },
                {
                    amount: 1000,
                    name: '每件/套/ 双物品损失最高赔偿'
                }
            ]
        },
        {
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险40元",
            // only: ["11"],
            code: "P060138",
            packageCode: "P060138-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt:4000,
            actualPremiumAmt:4000,
            totalInsuredAmt: 92000000,
            certificates: getCertificatesConfig(),
            price: 40,
            // priceColor: 'red',
            period: 10,
            term: "10",
            hot: cdnUrl + require("../assets/img/P060132/hot.png"),
            banner: cdnUrl + require("../assets/img/P060132/P060138banner.png"),
            question: cdnUrl + require("../assets/img/P060132/question.png"),
            detail: cdnUrl + require("../assets/img/P060132/detail.png"),
            noticeUrl: require('../assets/file/P060138/notice.htm'),
            clauseUrl: require('../assets/file/P060138/clause.htm'),
            desc: "70万意外保障，涵盖多种交通工具",
            badgeImg: require('../assets/img/badge/zhunxiang.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 700000,
                    name: '航空意外伤害保险金'
                }, {
                    amount: 50000,
                    name: '火车高铁意外伤害保险金'
                },
                {
                    amount: 50000,
                    name: '轮船意外伤害保险金'
                },
                {
                    amount: 20000,
                    name: '市内公共汽、电车意外伤害保险金'
                }
                , {
                    amount: 20000,
                    name: '出租车意外伤害保险金'
                },
                {
                    amount: 20000,
                    name: '长途公共汽车意外伤害保险金'
                }, {
                    amount: 20000,
                    name: '旅行社客车、机场公共汽车意外伤害保险金'
                }, {
                    amount: 20000,
                    name: '私有汽车意外伤害保险金'
                }, {
                    amount: 20000,
                    name: '公务汽车意外伤害保险金'
                }
            ]
        },
        {
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险30元",
            // exclude: ["6", "7","13"],
            code: "P060110",
            packageCode: "P060110-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 3000 : 1,
            actualPremiumAmt: isProduction ? 3000 : 1,
            totalInsuredAmt: 243000000,
            certificates: getCertificatesConfig(),
            price: 30,
            // priceColor: 'red',
            period: 7,
            term: "7",
            hot: cdnUrl + require("../assets/img/P060110/hot.png"),
            banner: cdnUrl + require("../assets/img/P060110/banner.png"),
            question: cdnUrl + require("../assets/img/P060110/question.png"),
            detail: cdnUrl + require("../assets/img/P060110/detail.png"),
            noticeUrl: require('../assets/file/P060110/notice.htm'),
            clauseUrl: require('../assets/file/P060110/clause.htm'),
            desc: "150万高额保障，超10种交通工具",
            badgeImg: require('../assets/img/badge/gaoe.png'),
            theme: ProductTheme.Pink,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1500000,
                    name: '航空意外伤害保险'
                }, {
                    amount: 150000,
                    name: '火车高铁意外伤害保险'
                },
                {
                    amount: 150000,
                    name: '轮船意外伤害保险'
                },
                {
                    amount: 150000,
                    name: '地铁轻轨意外伤害保险'
                }
                , {
                    amount: 80000,
                    name: '出租车意外伤害保险'
                },
                {
                    amount: 80000,
                    name: '市内公共汽车、电车意外伤害保险'
                }, {
                    amount: 80000,
                    name: '长途公共汽车意外伤害保险'
                }, {
                    amount: 80000,
                    name: '公务汽车意外伤害保险'
                }, {
                    amount: 80000,
                    name: '私有汽车意外伤害保险'
                }, {
                    amount: 80000,
                    name: '旅行社客车、机场公共汽车意外伤害保险'
                }
            ]
        },
        {
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险40元",
            // only: ["11"],
            code: "P060132",
            packageCode: "P060132-T2",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 4000 : 1,
            actualPremiumAmt: isProduction ? 4000 : 1,
            totalInsuredAmt: 300000000,
            certificates: getCertificatesConfig(),
            price: 40,
            // priceColor: 'red',
            period: 7,
            term: "7",
            hot: cdnUrl + require("../assets/img/P060132/hot.png"),
            banner: cdnUrl + require("../assets/img/P060132/banner.png"),
            question: cdnUrl + require("../assets/img/P060132/question.png"),
            detail: cdnUrl + require("../assets/img/P060132/detail.png"),
            noticeUrl: require('../assets/file/P060132/notice.htm'),
            clauseUrl: require('../assets/file/P060132/clause.htm'),
            desc: "180万高额保障，超10种交通工具",
            badgeImg: require('../assets/img/badge/zhunxiang.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1800000,
                    name: '航空意外伤害保险'
                }, {
                    amount: 200000,
                    name: '火车高铁意外伤害保险'
                },
                {
                    amount: 200000,
                    name: '地铁轻轨意外伤害保险'
                },
                {
                    amount: 200000,
                    name: '轮船意外伤害保险'
                }
                , {
                    amount: 100000,
                    name: '市内公共汽车、电车意外伤害保险'
                },
                {
                    amount: 100000,
                    name: '出租车意外伤害保险'
                }, {
                    amount: 100000,
                    name: '长途公共汽车意外伤害保险'
                }, {
                    amount: 100000,
                    name: '旅行社客车、机场公共汽车意外伤害保险'
                }, {
                    amount: 100000,
                    name: '私有汽车意外伤害保险'
                }, {
                    amount: 100000,
                    name: '公务汽车意外伤害保险'
                }
            ]
        },
        {
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险50元",
            // only: ["11"],
            code: "P060141",
            packageCode: "P060141-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 5000 : 1,
            actualPremiumAmt: isProduction ? 5000 : 1,
            totalInsuredAmt: 78500000,
            certificates: getCertificatesConfig(),
            price: 50,
            // priceColor: 'red',
            period: UDate.getCalcOfStr("Y#1"),
            term: "1年",
           // dateMinDay: 1,  //停止使用第二天投保改为及时投保
            hot: cdnUrl + require("../assets/img/P060132/hot.png"),
            banner: cdnUrl + require("../assets/img/P060141/banner.png"),
            question: cdnUrl + require("../assets/img/P060132/question.png"),
            detail: cdnUrl + require("../assets/img/P060132/detail.png"),
            noticeUrl: require('../assets/file/P060141/notice.htm'),
            clauseUrl: require('../assets/file/P060141/clause.htm'),
            desc: "保一年9种交通工具，不限次数",
            badgeImg: require('../assets/img/badge/zhunxiang.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 500000,
                    name: '航空意外伤害保险'
                }, {
                    amount: 100000,
                    name: '火车高铁意外伤害保险'
                },
                {
                    amount: 100000,
                    name: '轮船意外伤害保险'
                }
                , {
                    amount: 20000,
                    name: '市内公共汽车、电车意外伤害保险'
                },
                {
                    amount: 20000,
                    name: '出租车意外伤害保险'
                }, {
                    amount: 20000,
                    name: '长途公共汽车意外伤害保险'
                }, {
                    amount: 20000,
                    name: '旅行社客车、机场公共汽车意外伤害保险'
                }, {
                    amount: 5000,
                    name: '交通工具意外伤害保险'
                }
            ]
        },
        {
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险100元",
            // only: ["11"],
            code: "P060142",
            packageCode: "P060142-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 10000 : 1,
            actualPremiumAmt: isProduction ? 10000 : 1,
            totalInsuredAmt: 243000000,
            certificates: getCertificatesConfig(),
            price: 100,
            // priceColor: 'red',
            period: UDate.getCalcOfStr("Y#1"),
            term: "1年",
           // dateMinDay: 1,
            hot: cdnUrl + require("../assets/img/P060132/hot.png"),
            banner: cdnUrl + require("../assets/img/P060141/banner.png"),
            question: cdnUrl + require("../assets/img/P060132/question.png"),
            detail: cdnUrl + require("../assets/img/P060132/detail.png"),
            noticeUrl: require('../assets/file/P060141/notice.htm'),
            clauseUrl: require('../assets/file/P060141/clause.htm'),
            desc: "保一年9种交通工具，不限次数",
            badgeImg: require('../assets/img/badge/zhunxiang.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 2000000,
                    name: '航空意外伤害保险'
                }, {
                    amount: 100000,
                    name: '火车高铁意外伤害保险'
                },
                {
                    amount: 100000,
                    name: '轮船意外伤害保险'
                }
                , {
                    amount: 50000,
                    name: '市内公共汽车、电车意外伤害保险'
                },
                {
                    amount: 50000,
                    name: '出租车意外伤害保险'
                }, {
                    amount: 50000,
                    name: '长途公共汽车意外伤害保险'
                }, {
                    amount: 50000,
                    name: '旅行社客车、机场公共汽车意外伤害保险'
                }, {
                    amount: 30000,
                    name: '交通工具意外伤害保险'
                }
            ]
        },
        {//航旅项目-一路平安交通工具意外险拓展新冠肺炎病毒住院津贴责任
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险（扩展新冠）30元",
            // exclude: ["6", "7","13"],
            code: "P060136",
            packageCode: "P060136-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 3000 : 1,
            actualPremiumAmt: isProduction ? 3000 : 1,
            // originalPremiumAmt: 3000,
            // actualPremiumAmt: 3000,
            totalInsuredAmt: 161800000,
            certificates: getCertificatesConfig(),
            price: 30,
            // priceColor: 'red',
            period: 7,
            term: "7",
            hot: cdnUrl + require("../assets/img/P060136/hot.png"),
            banner: cdnUrl + require("../assets/img/P060136/banner.png"),
            question: cdnUrl + require("../assets/img/P060136/question.png"),
            detail: cdnUrl + require("../assets/img/P060136/detail.png"),
            noticeUrl: require('../assets/file/P060136/notice.htm'),
            clauseUrl: require('../assets/file/P060136/clause.htm'),
            desc: "保交通意外，新冠肺炎津贴100元/天",
            badgeImg: require('../assets/img/badge/newRed.png'),
            theme: ProductTheme.Pink,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1000000,
                    name: '航空意外伤害保险金'
                }, {
                    amount: 100000,
                    name: '火车高铁意外伤害保险金'
                },
                {
                    amount: 100000,
                    name: '地铁轻轨意外伤害保险金'
                },
                {
                    amount: 100000,
                    name: '轮船意外伤害保险金'
                }
                , {
                    amount: 50000,
                    name: '市内公共汽、电车意外伤害保险金'
                },
                {
                    amount: 50000,
                    name: '出租车意外伤害保险金'
                }, {
                    amount: 50000,
                    name: '长途公共汽车意外伤害保险金'
                }, {
                    amount: 50000,
                    name: '旅行社客车、机场公共汽车意外伤害保险金'
                }, {
                    amount: 50000,
                    name: '私有汽车意外伤害保险金'
                }, {
                    amount: 50000,
                    name: '公务汽车意外伤害保险金'
                }, {
                    amountDay: 100,//针对100元/天特殊处理
                    name: '附加意外伤害住院津贴（含新冠肺炎）'
                }
            ]
        },
        {//航旅项目-一路平安交通工具意外险拓展新冠肺炎病毒住院津贴责任
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险（扩展新冠）40元",
            // only: ["11"],
            code: "P060137",
            packageCode: "P060137-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 4000 : 1,
            actualPremiumAmt: isProduction ? 4000 : 1,
            // originalPremiumAmt: 4000,
            // actualPremiumAmt:  4000,
            totalInsuredAmt: 244800000,
            certificates: getCertificatesConfig(),
            price: 40,
            // priceColor: 'red',
            period: 7,
            term: "7",
            hot: cdnUrl + require("../assets/img/P060136/hot.png"),
            banner: cdnUrl + require("../assets/img/P060136/banner.png"),
            question: cdnUrl + require("../assets/img/P060136/question.png"),
            detail: cdnUrl + require("../assets/img/P060136/detail.png"),
            noticeUrl: require('../assets/file/P060136/notice.htm'),
            clauseUrl: require('../assets/file/P060136/clause.htm'),
            desc: "保交通意外，新冠肺炎津贴100元/天",
            badgeImg: require('../assets/img/badge/newViolet.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1500000,
                    name: '航空意外伤害保险金'
                }, {
                    amount: 150000,
                    name: '火车高铁意外伤害保险金'
                },
                {
                    amount: 150000,
                    name: '地铁轻轨意外伤害保险金'
                },
                {
                    amount: 150000,
                    name: '轮船意外伤害保险金'
                }
                , {
                    amount: 80000,
                    name: '市内公共汽、电车意外伤害保险金'
                },
                {
                    amount: 80000,
                    name: '出租车意外伤害保险金'
                }, {
                    amount: 80000,
                    name: '长途公共汽车意外伤害保险金'
                }, {
                    amount: 80000,
                    name: '旅行社客车、机场公共汽车意外伤害保险金'
                }, {
                    amount: 80000,
                    name: '私有汽车意外伤害保险金'
                }, {
                    amount: 80000,
                    name: '公务汽车意外伤害保险金'
                }, {
                    amountDay: 100,//针对100元/天特殊处理
                    name: '附加意外伤害住院津贴（含新冠肺炎）'
                }
            ]
        },
        {
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险20元",
            // exclude: ["7", "11","13"],
            code: "P060104",
            packageCode: "P060104-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 2000 : 1,
            actualPremiumAmt: isProduction ? 2000 : 1,
            totalInsuredAmt: 160000000,
            certificates: getCertificatesConfig(),
            price: 20,
            period: 7,
            term: "7",
            hot: cdnUrl + require("../assets/img/P060104/hot.png"),
            banner: cdnUrl + require("../assets/img/P060104/banner.png"),
            question: cdnUrl + require("../assets/img/P060104/question.png"),
            detail: cdnUrl + require("../assets/img/P060104/detail.png"),
            noticeUrl: require('../assets/file/P060104/notice.htm'),
            clauseUrl: require('../assets/file/P060104/clause.htm'),
            desc: "100万高额保障，超10种交通工具",
            badgeImg: require('../assets/img/badge/biaozhun.png'),
            theme: ProductTheme.Default,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1000000,
                    name: '航空意外伤害保险'
                }, {
                    amount: 100000,
                    name: '火车高铁意外伤害保险'
                },
                {
                    amount: 100000,
                    name: '轮船意外伤害保险'
                },
                {
                    amount: 100000,
                    name: '地铁轻轨意外伤害保险'
                }
                , {
                    amount: 50000,
                    name: '出租车意外伤害保险'
                },
                {
                    amount: 50000,
                    name: '市内公共汽车、电车意外伤害保险'
                }, {
                    amount: 50000,
                    name: '长途公共汽车意外伤害保险'
                }, {
                    amount: 50000,
                    name: '公务汽车意外伤害保险'
                }, {
                    amount: 50000,
                    name: '私有汽车意外伤害保险'
                }, {
                    amount: 50000,
                    name: '旅行社客车、机场公共汽车意外伤害保险'
                }
            ]
        }, {
            name: "一路平安交通工具意外伤害险",
            sName: "交通意外险2元",
            // only: ["11"],
            code: "P060128",
            packageCode: "P060128-T1",
            // originalPremiumAmt: 1,
            // actualPremiumAmt: 1,
            originalPremiumAmt: isProduction ? 200 : 200,
            actualPremiumAmt: isProduction ? 200 : 200,
            totalInsuredAmt: 10120000,
            certificates: getCertificatesConfig(),
            price: 2,
            // priceColor: 'red',
            period: 1,
            term: "1",
            hot: cdnUrl + require("../assets/img/P060128/hot.png"),
            banner: cdnUrl + require("../assets/img/P060128/banner.png"),
            question: cdnUrl + require("../assets/img/P060128/question.png"),
            detail: cdnUrl + require("../assets/img/P060128/detail.png"),
            noticeUrl: require('../assets/file/P060128/notice.htm'),
            clauseUrl: require('../assets/file/P060128/clause.htm'),
            desc: "10万高保额保障，限乘坐机场大巴",
            badgeImg: require('../assets/img/badge/jichu.png'),
            theme: ProductTheme.Default,
            // isCheckProduct: true,
            duty: [
                {
                    amount: 100000,
                    name: '旅行社客车、机场公共汽车意外伤害保险金'
                }, {
                    amount: 1200,
                    name: '意外伤害医疗保险金'
                }

            ]
        },
        {
            name: "航空意外险（单次航班）",
            sName: "航空意外险（单次航班）30元",
            // only: ["7"],
            code: "P061703",
            packageCode: "P061703-T1",
            originalPremiumAmt: isProduction ? 3000 : 1,
            totalInsuredAmt: 260000000,
            actualPremiumAmt: isProduction ? 3000 : 1,
            price: 30,
            endDateFormat: 'yyyy/MM/dd 23:59:59',
            certificates: getCertificatesConfig(),
            period: 1,
            hot: cdnUrl + require("../assets/img/P061703/hot.png"),
            banner: cdnUrl + require("../assets/img/P061703/banner.png"),
            question: cdnUrl + require("../assets/img/P061703/question.png"),
            detail: cdnUrl + require("../assets/img/P061703/detail.png"),
            noticeUrl: require('../assets/file/P061703/notice.htm'),
            clauseUrl: require('../assets/file/P061703/clause.htm'),
            desc: "给家人一份安心和承诺",
            badgeImg: cdnUrl + require('../assets/img/badge/biaozhun.png'),
            theme: ProductTheme.Default,
            duty: [
                {
                    amount: 2600000,
                    name: "航空意外伤害保险"
                }
            ]
        }
        , {
            name: "航空意外险",
            sName: "航空意外险20元",
            // only: ["13"],
            code: "P061710",
            packageCode: "P061710-T1",
            originalPremiumAmt: isProduction ? 2000 : 2000,
            totalInsuredAmt: 200000000,
            actualPremiumAmt: isProduction ? 2000 : 2000,
            price: 20,
            endDateFormat: 'yyyy/MM/dd 23:59:59',
            certificates: getCertificatesConfig(),
            period: 4,
            hot: cdnUrl + require("../assets/img/P061710/hot.png"),
            banner: cdnUrl + require("../assets/img/P061710/banner.png"),
            question: cdnUrl + require("../assets/img/P061710/question.png"),
            detail: cdnUrl + require("../assets/img/P061710/detail.png"),
            noticeUrl: require('../assets/file/P061710/notice.htm'),
            clauseUrl: require('../assets/file/P061710/clause.htm'),
            desc: "给家人一份安心和承诺",
            badgeImg: cdnUrl + require('../assets/img/badge/biaozhun.png'),
            theme: ProductTheme.Default,
            duty: [
                {
                    amount: 2000000,
                    name: "航空意外伤害保险"
                }
            ]
        }
        , {//该产品和P061710是同一款产品所以静态信息用P061710的
            name: "航空意外险",
            sName: "航空意外险20元",
            // only: ["13"],
            code: "P061717",
            packageCode: "P061717-T1",
            originalPremiumAmt: isProduction ? 2000 : 1,
            totalInsuredAmt: 200000000,
            actualPremiumAmt: isProduction ? 2000 : 1,
            price: 20,
            endDateFormat: 'yyyy/MM/dd 23:59:59',
            certificates: getCertificatesConfig(),
            period: 4,
            hot: cdnUrl + require("../assets/img/P061710/hot.png"),//该产品和P061710是同一款产品所以静态信息用P061710的
            banner: cdnUrl + require("../assets/img/P061710/banner.png"),
            question: cdnUrl + require("../assets/img/P061710/question.png"),
            detail: cdnUrl + require("../assets/img/P061710/detail.png"),
            noticeUrl: require('../assets/file/P061710/notice.htm'),
            clauseUrl: require('../assets/file/P061710/clause.htm'),
            desc: "给家人一份安心和承诺",
            badgeImg: cdnUrl + require('../assets/img/badge/biaozhun.png'),
            theme: ProductTheme.Default,
            duty: [
                {
                    amount: 2000000,
                    name: "航空意外伤害保险"
                }
            ]
        }
        , {
            name: "航空意外险",
            sName: "航空意外险30元",
            code: "P061702",
            hide: true,
            packageCode: "P061702-T1",
            originalPremiumAmt: 3000,
            totalInsuredAmt: 150000000,
            actualPremiumAmt: 3000,
            price: 30,
            certificates: getCertificatesConfig(),
            period: 2,
            hot: cdnUrl + require("../assets/img/P061702/hot.png"),
            banner: cdnUrl + require("../assets/img/P061702/banner.png"),
            question: cdnUrl + require("../assets/img/P061702/question.png"),
            detail: cdnUrl + require("../assets/img/P061702/detail.png"),
            noticeUrl: require('../assets/file/P061702/notice.htm'),
            clauseUrl: require('../assets/file/P061702/clause.htm'),
            desc: "给家人一份安心和承诺",
            badgeImg: cdnUrl + require('../assets/img/badge/biaozhun.png'),
            theme: ProductTheme.Default,
            duty: [
                {
                    amount: 1500000,
                    name: "航空意外伤害保险"
                }
            ]
        },
        {//航旅项目-一路平安交通工具意外险拓展新冠肺炎病毒住院津贴责任
            name: "华安交通工具意外伤害保险",
            sName: "交通意外险-拓展传染病50元",
            // exclude: ["6", "7","13"],
            code: "P060152",
            packageCode: "P060152-T1",
            originalPremiumAmt: isProduction ? 5000 : 5000,
            actualPremiumAmt: isProduction ? 5000 : 5000,
            totalInsuredAmt: 247200000,
            certificates: getCertificatesConfig(),
            price: 50,
            // priceColor: 'red',
            period: 10,
            term: "10",
            hot: cdnUrl + require("../assets/img/P060136/hot.png"),
            banner: cdnUrl + require("../assets/img/P060152/banner.png"),
            question: cdnUrl + require("../assets/img/P060136/question.png"),
            detail: cdnUrl + require("../assets/img/P060136/detail.png"),
            noticeUrl: require('../assets/file/P060152/notice.htm'),
            clauseUrl: require('../assets/file/P060152/clause.htm'),
            desc: "保交通意外，新冠肺炎危重症和身故",
            badgeImg: require('../assets/img/badge/newRed.png'),
            theme: ProductTheme.Pink,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1500000,
                    name: '航空意外伤害保险金'
                }, {
                    amount: 150000,
                    name: '火车、高铁意外伤害保险金'
                },
                {
                    amount: 150000,
                    name: '地铁轻轨列车保险金'
                },
                {
                    amount: 150000,
                    name: '轮船意外伤害保险金'
                }
                , {
                    amount: 80000,
                    name: '市内公共汽、电车意外伤害保险金'
                },
                {
                    amount: 80000,
                    name: '出租车意外伤害保险金'
                }, {
                    amount: 80000,
                    name: '长途公共汽车意外伤害保险金'
                }, {
                    amount: 80000,
                    name: '旅行社客车、机场公共汽车意外伤害保险金'
                }, {
                    amount: 2000,
                    name: '特定传染病危重症保险责任'
                }, {
                    amount: 200000,
                    name: '特定传染病身故保险责任'
                }
            ]
        },
        { // 航意&行李综合保障
            name: "航意&行李综合保障",
            sName: "航意行李险30元",
            code: "P132803",
            packageCode: "P132803-T1",
            originalPremiumAmt: isProduction ? 3000 : 1,
            actualPremiumAmt: isProduction ? 3000 : 1,
            totalInsuredAmt: 150300000,
            certificates: getCertificatesConfig(),
            price: 30,
            period: 7,
            term: "7",
            hot: cdnUrl + require("../assets/img/P132802/hot.png"),
            banner: cdnUrl + require("../assets/img/P132802/banner.png"),
            question: cdnUrl + require("../assets/img/P132802/question.png"),
            detail: cdnUrl + require("../assets/img/P132802/detail.png"),
            noticeUrl: require('../assets/file/P132802/notice.htm'),
            clauseUrl: require('../assets/file/P132802/clause.htm'),
            desc: "航空意外150万，行李丢失3000元",
            badgeImg: require('../assets/img/badge/newRed.png'),
            theme: ProductTheme.Pink,
            isCheckProduct: false,
            duty: [
                {
                    amount: 1500000,
                    name: '航空人身意外身故、伤残'
                }, {
                    amount: 3000,
                    name: '行李意外丢失赔偿'
                },
                {
                    amount: 300,
                    name: '行李箱体损失最高赔偿'
                },
                {
                    amount: 1000,
                    name: '每件/套/ 双物品损失最高赔偿'
                }
            ]
        },
        { // 华安一路平安交通工具意外伤害保险50元
            name: "一路平安交通工具意外伤害保险",
            sName: "交通意外险50元",
            code: "P060140",
            packageCode: "P060140-T1",
            originalPremiumAmt: isProduction ? 5000 : 1,
            actualPremiumAmt: isProduction ? 5000 : 1,
            totalInsuredAmt: 78500000,
            certificates: getCertificatesConfig(),
            price: 50,
            period: UDate.getCalcOfStr("Y#1"),
            term: "1年",
            hot: cdnUrl + require("../assets/img/P060132/hot.png"),
            banner: cdnUrl + require("../assets/img/P060141/banner.png"),
            question: cdnUrl + require("../assets/img/P060132/question.png"),
            detail: cdnUrl + require("../assets/img/P060132/detail.png"),
            noticeUrl: require('../assets/file/P060141/notice.htm'),
            clauseUrl: require('../assets/file/P060141/clause.htm'),
            desc: "保一年9种交通工具，不限次数",
            badgeImg: require('../assets/img/badge/zhunxiang.png'),
            theme: ProductTheme.Violet,
            isCheckProduct: false,
            duty: [
                {
                    amount: 500000,
                    name: '飞机意外伤害保险金'
                }, {
                    amount: 100000,
                    name: '火车意外伤害保险金'
                },
                {
                    amount: 100000,
                    name: '轮船意外伤害保险金'
                },
                {
                    amount: 20000,
                    name: '市内公共汽、电车意外伤害保险金'
                }
                , {
                    amount: 20000,
                    name: '出租车意外伤害保险金'
                },
                {
                    amount: 20000,
                    name: '长途公共汽车意外伤害保险金'
                }, {
                    amount: 20000,
                    name: '旅行社客车、机场公共汽车意外伤害保险金'
                }, {
                    amount: 5000,
                    name: '交通工具意外伤害医疗'
                }
            ]
        }
    ]

    return config;
}
