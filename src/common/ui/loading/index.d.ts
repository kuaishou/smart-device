type LoadingOpt = {
    text:string,
    time:number
}
export interface LoadingUtils{
    show:(opt?:string|LoadingOpt)=>0
    hide:()=>0
}
declare const Loading:LoadingUtils
export default Loading;