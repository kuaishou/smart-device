import { normalDate } from "./index";

class UDate {
    constructor(date?: string | Date) {
        if (typeof date === 'string') {
            date = date.replace(/-/g, "/");
        }
        if (date === undefined) {
            return new Date();
        }
        return new Date(date);
    }
    static value(d:string|Date,format?:string){
        if(typeof d =='string'){
            d = d.replace(/-/g, "/");
        }
        return new Date(d).format(format||'yyyy-MM-dd')
    }
    static now(n?: string | number, format?: string) {
        format = format || 'yyyy-MM-dd';
        let date: Date = new Date();
        if (typeof n == 'string') {
            format = n;
        } else if (typeof n == 'number') {
            date.setDate(date.getDate() + n);
        }
        // console.log(date)
        return date.format(format);
    }
    static getAge(strBirthday: string, date?: string) {
        let returnAge;
        strBirthday = strBirthday.replace(/\//g, '').replace(/-/g, '');
        //let strBirthdayArr = strBirthday.split(".");
        let birthYear = 0;
        let birthMonth = 0;
        let birthDay = 0;

        if (strBirthday.length == 18) {
            // 450821199002271577
            birthYear = +strBirthday.substring(6, 10);
            birthMonth = +strBirthday.substring(10, 12);
            birthDay = +strBirthday.substring(12, 14);
        } else {
            birthYear = +strBirthday.substring(0, 4);
            birthMonth = +strBirthday.substring(4, 6);
            birthDay = +strBirthday.substring(6, 8);
        }
        // console.log(strBirthday, date, birthYear, birthMonth, birthDay)
        // let strBirthdayArr = strBirthday.split(".");
        // let birthYear = Number(strBirthdayArr[0]);
        // let birthMonth = Number(strBirthdayArr[1]);
        // let birthDay = Number(strBirthdayArr[2]);

        let d = new Date();
        if (date) {
            date = date.replace(/-/g, "/");
            d = new Date(normalDate(date));
        }
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        }
        else {
            let ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    let dayDiff = nowDay - birthDay;//日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
                else {
                    let monthDiff = nowMonth - birthMonth;//月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
            }
            else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄

    }
    static minusSecond(date: string | Date, n: number,format?:string){
        if (typeof date == 'string') {
            date = date.replace(/-/g, "/")
        }
        let d = new Date(date);
        // d.setSeconds
        d.setSeconds(d.getSeconds()-n);
        return d.format(format||'yyyy/MM/dd hh:mm:ss');
    }
    static addMinute(date: string | Date, n: number,format?:string) {
        if (typeof date == 'string') {
            date = date.replace(/-/g, "/")
        }
        let d = new Date(date);
        // console.log(d.getMinutes() + n)
        // console.log(d.getMinutes())
        d.setMinutes(d.getMinutes()+n);
        return d.format(format||'yyyy/MM/dd hh:mm:ss');
    }
    static addDay(date: string | Date, n: number,format?:string) {
        if (typeof date == 'string') {
            date = date.replace(/-/g, "/")
        }
        let d = new Date(date);
        d.setDate(d.getDate() + n);
        return d.format(format||'yyyy/MM/dd hh:mm:ss');
    }
    static addYear(date: string | Date, n: number,format?:string) {
        if (typeof date == 'string') {
            date = date.replace(/-/g, "/")
        }
        let d = new Date(date);
        d.setFullYear(d.getFullYear() + n);
        return d.format(format||'yyyy/MM/dd hh:mm:ss');
    }
    static diff(s1: string|Date, s2: string|Date) {
        if(typeof s1 =='string'){
            s1 = s1.replace(/-/g, "/")
        }
        if(typeof s2 =='string'){
            s2 = s2.replace(/-/g, "/")
        }
      
        let day1: any = new Date(s1);
        let day2: any = new Date(s2);
        return ((day2 - day1));
    }
    static diffDay(s1: string|Date, s2: string|Date) {
        return parseInt(
            (this.diff(s1, s2) / (1000 * 60 * 60 * 24) + '')
        );
    }
    static getCalcOfStr(str: string, date?: Date): number {
        let rNum: any = str + '';
        let _num: number = Number(rNum.replace(/D#|M#|Y#/,''));
        const _date = date && date instanceof Date ? date : new Date(),
            yTime = _date.getTime();

        if(isNaN(_num)) {
            _num = 0;
        }else{

            if(rNum.indexOf('D#') == 0){
                rNum = _num;
            }else if(rNum.indexOf('M#') == 0){
                rNum = (_date.setMonth(_date.getMonth()+_num) - yTime)/(24*60*60*1000);
            }else if(rNum.indexOf('Y#') == 0){
                rNum = (_date.setFullYear(_date.getFullYear()+_num) - yTime)/(24*60*60*1000);
            }else{
                rNum = _num
            }
        }

        return Math.round(Number(rNum));
    }
}
export default UDate;