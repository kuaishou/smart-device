interface Array<T> {
    remove(...items: T[]): number;
}
interface Date {
   format(format?:string): string;
}
interface Window{
    WebViewJavascriptBridge:any
}