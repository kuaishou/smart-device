/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-18 09:21:58
 * @LastEditTime: 2019-08-12 15:30:30
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import ILogCode, { ILevel } from './ILogCore';
// const logCore = new LogCode('LogCode');
let globalLevel = 5, lastSource = '', init = false, queue: { [key: number]: any } = {},
    exclude: string[] = [],
    logCore: any = null;
console.log("%c LogCore日志组件", "font-size:50px;color:red;-webkit-text-fill-color:red;-webkit-text-stroke: 1px black;")


class LogCode implements ILogCode {
    /**
     * 
     * @param name 模块名称
     */
    constructor(name: string) {
        this.name = name || '未定义模块名称';

       
    }
   
    static on(level: ILevel, cb: Function) {
        queue[level] = cb;
    }
    /**
     * 设置打印日志级别
     * @param level 打印日志级别LogCode.LEVEL_*
     */
    static setLevel(level: ILevel) {

        globalLevel = level;

    }
    /**
     * 排除模块不显示
     * @param modular 排除的模块[name]
     */
    static exclude(modular: string[]) {
        exclude = modular;
    }
    // static log(message?: any, ...optionalParams: any[]) {
    //     let p: any = [message, ...optionalParams];
    //     logCore || (logCore = new LogCode(''));
    //     logCore.log.apply(console, p)
    // }
    // static debug(message?: any, ...optionalParams: any[]) {
    //     let p: any = [message, ...optionalParams];
    //     logCore || (logCore = new LogCode(''));
    //     logCore.debug.apply(console, p)
    // }
    // static error(message?: any, ...optionalParams: any[]) {
    //     let p: any = [message, ...optionalParams];
    //     logCore || (logCore = new LogCode(''));
    //     logCore.error.apply(console, p)
    // }
    // static warn(message?: any, ...optionalParams: any[]) {
    //     let p: any = [message, ...optionalParams];
    //     logCore || (logCore = new LogCode(''));
    //     logCore.warn.apply(console, p)
    // }
    private name = '';
    /**
    *所有日志
     */
    static LEVEL_ALL: ILevel = 99;
    /**
     * 调试级别
     */
    static LEVEL_DEBUG: ILevel = 4;
    /**
     * 日志级别
     */
    static LEVEL_LOG: ILevel = 3;
    /**
     * 警告级别
     */
    static LEVEL_WARN: ILevel = 2;
    /**
     * 错误级别
     */
    static LEVEL_ERROR: ILevel = 1;
    /**
     * 关闭日志
     */
    static LEVEL_OFF: ILevel = 0;

    private _log(level?: any, ...optionalParams: any[]) {
        // let [level, ..._p] = p;
        let c: any = LogCode;
        if (globalLevel >= c[`LEVEL_${level.toLocaleUpperCase()}`] && !exclude.includes(optionalParams[0])) {
            let s = this.logSource();
            let _console: any = console;
            queue[LogCode.LEVEL_LOG] && queue[LogCode.LEVEL_ERROR](optionalParams, s);
            queue[LogCode.LEVEL_ALL] && queue[LogCode.LEVEL_ALL](optionalParams, s);
            _console[level].apply(console, optionalParams);
        }
    }
    // 信息级别
    // static LEVEL_INFO = 0;
    log(message?: any, ...optionalParams: any[]): void {

        let p: any = [message, ...optionalParams];
        p.unshift(`${this.name}`);
        p.unshift(`log`);

        this._log.apply(this, p)
        // if (globalLevel >= LogCode.LEVEL_LOG && !exclude.includes(this.name)) {
        //     let s = this.logSource();
        //     queue[LogCode.LEVEL_LOG] && queue[LogCode.LEVEL_ERROR](p, s);
        //     p.unshift(`${this.name}:`);
        //     console.log.apply(console, p)
        // }
    }
    debug(message?: any, ...optionalParams: any[]): void {
        let p: any = [message, ...optionalParams];
        p.unshift(`${this.name}`);
        p.unshift(`debug`);
        this._log.apply(this, p)
        // if (globalLevel >= LogCode.LEVEL_DEBUG && !exclude.includes(this.name)) {
        //     let s = this.logSource();
        //     queue[LogCode.LEVEL_DEBUG] && queue[LogCode.LEVEL_DEBUG](p, s);
        //     p.unshift(`${this.name}:`);
        //     console.debug.apply(console, p);
        // }
    }

    warn(message?: any, ...optionalParams: any[]): void {
        let p: any = [message, ...optionalParams];
        p.unshift(`${this.name}`);
        p.unshift(`warn`);
        this._log.apply(this, p)
        // if (globalLevel >= LogCode.LEVEL_WARN && !exclude.includes(this.name)) {
        //     let s = this.logSource();
        //     queue[LogCode.LEVEL_WARN] && queue[LogCode.LEVEL_ERROR](p, s);
        //     p.unshift(`${this.name}:`);
        //     console.warn.apply(console, p)
        // }
    }
    error(message?: any, ...optionalParams: any[]): void {
        let p: any = [message, ...optionalParams];
        p.unshift(`${this.name}`);
        p.unshift(`error`);
        this._log.apply(this, p)
        // if (globalLevel >= LogCode.LEVEL_ERROR && !exclude.includes(this.name)) {
        //     let s = this.logSource();
        //     queue[LogCode.LEVEL_ERROR] && queue[LogCode.LEVEL_ERROR](p, s);
        //     p.unshift(`${this.name}:`);
        //     console.error.apply(console, p)
        // }
    }
    logSource() {
        let d = new Date();
        let time = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        let { name, url } = this.getSource(5);
        let _sourec = `${name}  ${url}`;
        if (lastSource != _sourec) {
            lastSource = _sourec;
            console.log(`${this.name}: %c${time}%c ${_sourec}`, 'color:red', 'color:#000');
        }
        return `${time} ${_sourec}`;
    }

    getSource(depth = 2): any {

        let error = {} as Error, _sourec = {} as any;

        try {
            throw new Error("")
            // throw new Error("主站的js出现错误");

        } catch (e) {

            error = e;
        }
        // console.log('原样=',typeof error.stack )
        // console.log('typeof=',typeof error )
        // console.log('SON.stringify=',JSON.stringify(error)  )

        // console.log('valueOf=',error.valueOf()+'***' )
        // console.log('toString=',error.toString() )
        // IE9 does not have .stack property
        if (error.stack === undefined) {

            return _sourec;
        }

        // console.log(error.stack)
        let stackTrace = error.stack.split("\n")[depth];
        // console.log(stackTrace)
        if (/ /.test(stackTrace)) {
            let arr = stackTrace.trim().split(/ |@/);
            // console.log('切割=',arr)
            let [, name, url = arr[1]] = arr;

            _sourec = {
                name,
                url: url.replace(/\(|\)/g, '')
            }

        } else if (/@/.test(stackTrace)) {
            let arr = stackTrace.trim().split(/@/);
            // console.log('切割=',arr)
            let [name, url = arr[0]] = arr;

            _sourec = {
                name,
                url: url.replace(/\(|\)/g, '')
            }
        }
        return _sourec;
    }
}
export default LogCode;