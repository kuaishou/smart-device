// type Promote = {
//     id: string,
//     name: string,
//     code: string
// }

// import KunMing from './promote/KunMing'
// import HaiKou from './promote/HaiKou'
// import BeiJin from './promote/BeiJin'
// let airport: Array<any> = [];
// airport.push(KunMing);
// airport.push(HaiKou);
// airport.push(BeiJin);
// export const getPromoteInfo = (code: string) => {

//     for (let i = 0; i < airport.length; i++) {
//         let promotes = airport[i].list;
//         for (let j = 0; j < promotes.length; j++) {
//             const promote = promotes[j] as Promote;
//             if (promote.code == code) {
//                 return {
//                     name: airport[i].name,
//                     payType: airport[i].payType,
//                     salesCode: airport[i].salesCode,
//                     insureCompany: airport[i].insureCompany,
//                     cooperateCode: airport[i].cooperateCode,
//                     promote
//                 };
//             }
//         }
//     }
//     return null;
// }
// export default {

// }
let airportCofig = [
    {
        airportName: '北京首都机场',
        salesCode: "107032629",
        cooperateCode: "0107100201",
        salesName: "徐敏",
        insureCompany: "北京分公司",
        // 1 现金 2线上 3线上及现金
        payType: 3,
    },
    {
        airportName: "昆明机场",
        cooperateCode: "0114100927",
        salesCode: "114169330",
        salesName: "高福涛",
        // 1 现金 2线上 3线上及现金
        payType: 2,
        insureCompany: "云南分公司",
    },
    {
        airportName: "海口美兰机场",
       
        salesCode:"231000608",
        salesName:"乔梁", 
        insureCompany:"海南分公司",
        // 1 现金 2线上 3线上及现金
        payType:3, 
    },
    {
        airportName: "海口美兰机场（飞航）",
       
        salesCode:"231000608",
        salesName:"乔梁",
        insureCompany:"海南分公司",
        // 1 现金 2线上 3线上及现金
        payType:3, 
    },
    {
        airportName: "海口美兰机场（通汇）",
       
        salesCode:"231000608",
        salesName:"乔梁",
        insureCompany:"海南分公司",
        // 1 现金 2线上 3线上及现金
        payType:3, 
    }
]
export const getPromoteInfo = (airportName: string) => {

    for (let i = 0; i < airportCofig.length; i++) {
        // console.log(airportCofig[i])
        if (airportCofig[i].airportName == airportName) {
            // debugger
            return airportCofig[i];
        }
    }
    return null;
}