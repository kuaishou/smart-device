
declare namespace FeiHang {
    interface InsureParam extends BaseInsureParam {
        policyExt: {
            airportCode: string
            promoteCode: string
            promoteName: string
            taskId?:string
            sysCodeHealthTold?: string,//是否是投保告知二维码标识
        }
        // PolicyExtParam
        payment: {
            payType: '2' | '1'
        }
        riskExt: {
            hbqfsj: string
            hbh: string
        }
        trans: {
            scanQRCode?: string,
            paymentRedirectAddr?: string
            // paymentRedirectAddr: `http://10.11.29.235:8080/eb-web/vue/smart-device/#/confirm`
        }
    }
    interface CustomerInfo {
        holder: HolderParam
        insureds: Array<InsuredParam>
    }
    interface RootState extends BaseRootState {

        // openid: string
        cancelPolicy: Array<any>
        name: string
        title: string
        toolbarRightText: string
        toolbarLeftText: string
        toolbarShow: boolean
        product: {
            productCode: string,
            packageCode: string,
            productName: string,
            totalInsuredAmt: string,
            originalPremiumAmt: string,
            actualPremiumAmt: string,
        }
        payType: number
        queryPolicyObject: {
            channel: {
                channelCode: string,
                accessUser: string,
                accessPassword: string
            },
            policy: {
                policyAppNo: string,
                policyNo: string
            },
            trans: {
                transCode: string,
                transType: string
            }
        }
    }

    interface Infos {
        beneficiary: string,
        cardNo: string,
        cardType: string,
        endTime: string,
        insured: string,
        policyNo: string,
        startTime: string
    }

    interface PrintOpt {

        id: string,
        infos?: any,
        insureCompany: string,
        plan: string,
        amount: string,
        premium: string
    }
}