type HMap = { [key: string]: string }
/**
 * 电量提示
 */

export const ELECTRICITY_CUE: HMap = {
    "001": "抱歉，我的电量已低于10%，暂无法出单，请马上给我充电吧",
    "002": "亲，我的电量已低于20%，请尽快充电，低于10%时将无法出单",
}
/**
 * 支付类型
 */
export const PAY_TYPE: HMap = {
    "1": "特殊支付",
    "2": "在线支付"
}
/**
 * 现金支付类型
 */
export const CASH_PAYMENT = '1';
/**
 * 在线支付支付类型
 */
export const ONLINE_PAYMENT = '2';
/**
 *现金加在线支付类型
 */
export const CASH_ONLINE_PAYMENT = '3'
/**
 * 不能退保
 */
export const CAN_NOT_CANCEL_POLICY = '4'
/**
 * 无确认投保
 */
export const NEED_CONFIRM_INSURANCE = '1'
/**
 * 缓存imei的key
 */
export const CACHE_IMEI_KEY = 'imei'
/**
 * 退出事件
 */
export const NFC_LOGOUT = 'logout';
/**
 * 打印统计事件
 */
export const EVENT_PRINT_BILL = 'printBill';
/**
 * 提示更新安装包
 */
export const EVENT_LOGIN_POS = 'loginPos';
/**
 * 初始化事件
 */
export const INIT_LISTEN = 'submitFromWeb';

/**
 * 打印成功回调
 */
export const EVENT_PRINT_SUCCESS = 'printSuccess';
/**
 * 安卓返回通知事件
 */
export const EVENT_CALLBACK = 'funcJS';
/**
 * 打印事件
 */
export const EVENT_PRINT = 'print';
/**
 * 以前成功返回通讯状态
 */
export const EVENT_CALLBACK_OK = 'suc'
/**
 * 开始读卡事件
 */
export const READ_CARD_START = 'start'
/**
 * 读卡完成事件
 */
export const READ_CARD_DONE = 'NFC'
/**
 * 读卡失败事件
 */
export const READ_CARD_FAIL = 'fail'
/**
 * 读取到乱码
 */
export const READ_CARD_FAIL_CN = 'fail_cn'
/**
 * 电量提示
 */
export const ELECTRIC_PROGRESS = 'battery'
/**
 * 电量上升
 */
export const ELECTRIC_UP = 'up'
/**
 * 电量下降
 */
export const ELECTRIC_DOWN = 'down'

/**
 * 身份证类型
 */
export const ID_CARD_TYPE = '01'
/**
 * 护照类型
 */
export const PASSPORT_TYPE = '02'
/**
 * 关系其他
 */
export const OTHER_RELATION = '14'
/**
 * 证件其他
 */
export const OTHER_CERTIFICATES = '99'
/**
 * 退保
 */
export const POLICY_CANCEL_STATUS = '7'
/** 
 * 注销
*/
export const POLICY_CANCELLATION_STATUS = '6'