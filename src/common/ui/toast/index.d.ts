type ToastOpt = {
    text:string,
    time:number
}
export interface ToastUtils{
    show:(opt?:string|ToastOpt)=>0
    hide:()=>0
}
declare const Toast:ToastUtils
export default Toast;