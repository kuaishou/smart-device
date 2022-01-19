

// import * as _ from 'lodash'
import { baseUrl } from '@/common/config/env';
import { ID_CARD_TYPE } from '@/constant';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('utils');
interface HMap {
	[key: string]: any
}

export const removeStorage = (key: string) => {
	console.log('移除', key)
	localStorage.removeItem(key)
	console.log('获取', localStorage.getItem(key))
}
export const setStorage = (key: string, data: any) => {
	if (typeof data == 'object') {
		data = JSON.stringify(data);
	}
	localStorage.setItem(key, data);
}
export const getStorage = (key: string): any => {

	let data = localStorage.getItem(key);
	try {
		data = JSON.parse(data || '');

	} catch (error) {

	}
	return data;
}
export const loadImage = (url: string) => {

	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = () => {
			resolve();
		}
		img.onerror = () => {
			reject();
		}
		img.src = url;
	})
}
export const uuid = (function (uuidRegEx, uuidReplacer) {
	return function () {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
	};
})(/[xy]/g, function (c: string) {
	var r = Math.random() * 16 | 0,
		v = c == "x" ? r : (r & 3 | 8);
	return v.toString(16);
});

export const isIDCard = (idcard: string) => {
	idcard = idcard.toUpperCase();
	var Errors = [
		true,
		"身份证号码位数不对，请正确填写。",
		"身份证号码出生日期超出范围或含有非法字符，请正确填写。",
		"身份证号码校验错误，请正确填写。",
		"身份证号码地区非法，请正确填写。",
		"身份证号码出生日期只能在当前日期之前!"
	];
	var area: HMap = {
		11: "\u5317\u4eac", 12: "\u5929\u6d25", 13: "\u6cb3\u5317", 14: "\u5c71\u897f", 15: "\u5185\u8499\u53e4", 21: "\u8fbd\u5b81", 22: "\u5409\u6797", 23: "\u9ed1\u9f99\u6c5f",
		31: "\u4e0a\u6d77", 32: "\u6c5f\u82cf", 33: "\u6d59\u6c5f", 34: "\u5b89\u5fbd", 35: "\u798f\u5efa", 36: "\u6c5f\u897f", 37: "\u5c71\u4e1c", 41: "\u6cb3\u5357", 42: "\u6e56\u5317",
		43: "\u6e56\u5357", 44: "\u5e7f\u4e1c", 45: "\u5e7f\u897f", 46: "\u6d77\u5357", 50: "\u91cd\u5e86", 51: "\u56db\u5ddd", 52: "\u8d35\u5dde", 53: "\u4e91\u5357", 54: "\u897f\u85cf",
		61: "\u9655\u897f", 62: "\u7518\u8083", 63: "\u9752\u6d77", 64: "\u5b81\u590f", 65: "\u65b0\u7586", 71: "\u53f0\u6e7e", 81: "\u9999\u6e2f", 82: "\u6fb3\u95e8", 91: "\u56fd\u5916"
	};
	var Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	if (idcard == "") {//为空
		return true;
	}
	if (area[parseInt(idcard.substr(0, 2))] == null) {
		return Errors[4];
	}
	let ereg;
	switch (idcard.length) {
		case 15:
			if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
			} else {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/
			}
			if (ereg.test(idcard)) {
				var birthYear = idcard.substr(6, 2);
				var birthMonth = idcard.substr(8, 2);
				var birthDay = idcard.substr(10, 2);
				// if(window.App && App.oServerDate){//取服务器端系统时间，没有则取客户端系统时间
				// 	var oToday = App.oServerDate;
				// }else{
				var oTodayMS = new Date();
				var oToday = new Date(oTodayMS.getFullYear(), oTodayMS.getMonth(), oTodayMS.getDate());
				// }
				var oUserBirth = new Date(Number(birthYear), parseInt(birthMonth, 10) - 1, 0/*birthDay*/);
				if ((Date.parse('oUserBirth') - Date.parse('oToday')) >= 0) {
					return Errors[5];
				}
				return Errors[0];
			} else {
				return Errors[2];
			}
			break;
		case 18:
			if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
			} else {
				ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
			}
			if (ereg.test(idcard)) {
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1);
				if (M == idcard_array[17]) {
					var birthYear = idcard.substr(6, 4);
					var birthMonth = idcard.substr(10, 2);
					var birthDay = idcard.substr(12, 2);
					// if(window.App && App.oServerDate){//取服务器端系统时间，没有则取客户端系统时间
					// 	var oToday = App.oServerDate;
					// }else{
					var oTodayMS = new Date();
					var oToday = new Date(oTodayMS.getFullYear(), oTodayMS.getMonth(), oTodayMS.getDate());
					// }
					var oUserBirth = new Date(Number(birthYear), parseInt(birthMonth, 10) - 1);
					if ((Date.parse('oUserBirth') - Date.parse('oToday')) >= 0) {
						return Errors[5];
					}
					return Errors[0];
				} else {
					return Errors[3]
				}
			} else {
				return Errors[2];
			}
			break;
		default:
			return Errors[1];
			break;
	}
	return true
}
export const identityValid = (code: string) => {
	var city: { [key: string]: string } = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
	var tip = "";
	var pass = true;

	if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	}

	else if (!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
		pass = false;
	}
	else {
		//18位身份证需要验证最后一位校验位
		if (code.length == 18) {
			let _code: Array<any> = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = _code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if (last != _code[17]) {
				tip = "校验位错误";
				pass = false;
			}
		}
	}

	return pass;
}
export const getIDCard = (no: string) => {
	let idCardInfo: HMap = {};
	idCardInfo.no = no;
	let y = '0', m = '0', d = '0', sex = '';
	if (no.length == 15) {
		y = no.substring(6, 8);
		m = no.substring(8, 10);
		d = no.substring(10, 12);
		sex = no.substring(14, 15);
		sex = Number(sex) % 2 == 1 ? 'M' : 'F';
		if (Number(y) > 10) y = '19' + y;
		else y = '20' + y;
	} else if (no.length == 18) {
		y = no.substring(6, 10);
		m = no.substring(10, 12);
		d = no.substring(12, 14);
		sex = no.substring(16, 17);
		sex = Number(sex) % 2 == 1 ? 'M' : 'F';
	} else {
		idCardInfo.error = true;
	}
	idCardInfo.year = y;
	idCardInfo.month = m;
	idCardInfo.day = d;
	idCardInfo.sex = sex;
	idCardInfo.date = y + '-' + m + '-' + d;
	return idCardInfo;
}
export const interval = (arr: Array<number>, n: number) => {

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] >= n) {
			return arr[i];
		}
	}
	return arr[0];
}
// 补零
function formatNumber(n: number) {
	const str = n.toString()
	return str[1] ? str : `0${str}`
}

export const noNormalDate = (date: string, format?: string) => {

	date = date.replace(/-/g, "/");

	return new Date(date).format(format || 'yyyyMMddhhmmss');
}
export const normalDate = (date: string) => {
	logCode.debug(date)
	date = date.replace(/-|\//g, '')
		.replace(' ', '')
		.replace(/:/g, '');
	logCode.debug(date);
	let year: number = Number(date.substring(0, 4));
	let month: number = Number(date.substring(4, 6));
	let day: number = Number(date.substring(6, 8));
	let hour: number = 0, minute: number = 0, second: number = 0;
	if (date.length > 8) {
		hour = Number(date.substring(8, 10));
		minute = Number(date.substring(10, 12));
		second = Number(date.substring(12, 14));
	}
	logCode.debug(new Date(year, month - 1, day, hour, minute, second))
	return new Date(year, month - 1, day, hour, minute, second);
}

// 防抖
export function debounce(method: any, delay: number, context: any) {
	logCode.debug('debounce', context._timer)
	clearTimeout(context._timer);
	context._timer = setTimeout(function () {

		method.call(context);
	}, delay);

}

export const param = (data: { [key: string]: any }) => {
	let s: Array<string> = [];
	for (let i in data) {
		s.push(`${i}=${data[i]}`);
	}
	return s.join('&');
}

export const translateSex = (sex: string) => {

}

export const contactToInsure = (v: any, isHolder?: boolean) => {
	let data: { [key: string]: any } = {
		"idcartNo": v.contactIdNo,
		"idcartType": v.contactIdType,
		"mobile": v.contactPhone,
		"sex": v.contactSex,
		"mail": v.contactEmail,
		"bornDate": noNormalDate(v.dateOfBirth, 'yyyyMMdd'),
		"nameSpell": v.contactEname
	}
	if (isHolder) {
		data.holderName = v.contactCname;
		data.holderType = '1';

	} else {
		data.insuredName = v.contactCname;
		data.insuredType = '1';
		data.releation = v.relationType;
	}
	return data;
}
//是否是被保人
export const hasInsured = (no: string, insureds: Array<InsuredParam>) => {
	let flag = false;
	insureds.forEach((v: InsuredParam) => {
		if (v.idcartNo == no) {
			flag = true;
		}
	});
	return flag;
}
/**
 * 
 * @param content 被保人信息
 * @param type 01返回投保人，02返回被保人
 */
export const getCustomerData = (content: InsuredParam, type = ID_CARD_TYPE) => {

	let data: any = Object.assign({
		identifyLongValid: '0',
		countryName: '中国',
		country: '1010090156',
		occupationGroupCode: '00',
		occupationGroupName: '一般职业',
		occupationCode: '0001001',
		occupationName: '机关内勤(不从事凶险工作)',
	}, content);
	if (data.identifyExpiry == '长期') {
		data.identifyExpiry = '';
		data.identifyLongValid = '1';
	}
	if (type == ID_CARD_TYPE) {
		data.holderName = data['insuredName'];
		data['releation']="14";//核心需要投保人与被保人关系值
		delete data['insuredName'];
	}
	if (data.idcartType == ID_CARD_TYPE) {
		let idCard: any = getIDCard(data.idcartNo);
		data.bornDate = `${idCard.year}${idCard.month}${idCard.day}`;
		data.sex = idCard.sex;
	}
	return data;
}

export const setConfig = (config: any) => {
	let data = {
		promoteName: config.promoteName,//推广员名称
		promoteCode: config.userCode,//推广员代码
		airportCode: config.airportCode,//机场代码
		cooperateCode: config.cooperateCode,//客户源
		salesCode: config.salesCode,//业务员
		subChannelCode: config.subChannelCode,//子渠道
		payType: config.payType,//支付类型
		insureCompany: config.insureCompany || '',//打印的公司名称
		putawayProduct: config.putawayProduct,//后台配置显示的产品,","号分隔
		retreatPay: config.retreatPay,//允许退保方式
		confirmInsurance: config.confirmInsurance, //无确认投保
		tracBackFlag: config.tracBackFlag // 是否可回溯
	}
	setStorage('fei_hang_config', data);
}
type FHConfigName = (
	'promoteName' |
	'promoteCode' |
	'airportCode' |
	'cooperateCode' |
	'salesCode' |
	'subChannelCode' |
	'payType' |
	'insureCompany' |
	'putawayProduct' |
	'retreatPay' |
	'confirmInsurance')
/**
 * 
 * @param name 配置名称
 * promoteName 推广员名称
 * promoteCode 推广员代码
 * airportCode 机场代码
 * cooperateCode 推广员名称
 * salesCode 业务员
 * subChannelCode 子渠道
 * payType 支付类型
 * insureCompany 打印的公司名称
 * retreatPay 允许退保方式
 * confirmInsurance 无确认投保
 */
export const getConfig = (name?: FHConfigName) => {
	let config = getStorage('fei_hang_config');
	if (name) {
		return config && config[name];
	}
	return config;
}
export const clearConfig = () => {
	removeStorage('fei_hang_config')
}
/**
 * 
 * @param value 值
 * @param format 保留位数
 */
export function formatPremium(value: string | number, format?: number): any {
	return new Number(value).toFixed(format ? format : 0);
}
export function toNumber(value: any): number {
	return +value;
}