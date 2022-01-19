export = MyFunction;
declare namespace MyFunction {
    export const Sitstart: (data?:any) => any
    export const Sitlog: (title:string,type?:string) => any
    export const Sitstop: (num:number,data?:any) => any
}