

let _premium = 0
class Print {
    
    constructor(printModel: PrintOpt) {
        //分公司
        this.insureCompany = printModel.insureCompany
        this.airportCode = printModel.airportCode

        this.id = printModel.code;
        this.isCash = printModel.isCash
        this.plan = printModel.sName;
        this.promoterNo = printModel.promoteCode;
        this.promoter = printModel.promoteName;
        // debugger
        this.amount = (printModel.totalInsuredAmt / 1000000) + '万';
        _premium = (printModel.originalPremiumAmt / 100) ;
        this.premium = _premium+ '元';

    }
    private id: string = '';
    private insureCompany: string = '';
    private airportCode: string = '';
    private plan: string = '';
    private amount: string = '';
    private premium: string = '';
    private isCash: boolean;
    // private _premium: number = 0;
    private promoterNo: string | undefined = '';
    private promoter: string | undefined = '';
    private totalPremium: string| number = 0;
    private infos: Array<InsurePrintInfos> = [];
    addInfo(a: InsurePrintInfos) {
        this.infos.push(a);
        this.totalPremium = (this.infoSize() * _premium)+ '元';
    }
    infoSize() {
        return this.infos.length;
    }
   

}
export default Print;