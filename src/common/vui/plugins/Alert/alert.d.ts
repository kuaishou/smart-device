type Opt = {
    width?: string,
    content: string,
    iconType?: 'icon-success' | 'icon-tip' | 'none',

    cancelText?: string,
    confirm?: Function,
    cancel?: Function,
    maskClose?:boolean,
    title?:string
    confirmText?: string
}
export interface AlertUtils {
    show: (opt?: string | Opt) => 0
    hide: () => 0
}
declare const MAlert: AlertUtils
export default MAlert;