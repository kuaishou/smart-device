export default interface ILogCode {
    //模块名称
    // private  readonly  name:string|undefined
    //普通日志
    log(message?: any, ...optionalParams: any[]): void
    //调试日志
    debug(message?: any, ...optionalParams: any[]): void
    // 错误日志
    error(message?: any, ...optionalParams: any[]): void
    //警告
    warn(message?: any, ...optionalParams: any[]): void
    // //信息
    // info(message?: any, ...optionalParams: any[]): void

}
export type ILevel = 0 | 1 | 2 | 3 | 4|99;