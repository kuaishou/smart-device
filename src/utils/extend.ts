
// window.log= console.log.bind(console)
// import * as _ from 'lodash'
Array.prototype.remove = function (params: any): number {
    let index: number = -1;
    // if (Object.prototype.toString.call(params) == '[object Object]') {
    //     // _.find(this,)
    //     var res = _.find(this, function (o) {
    //         return o['key'] === params
    //     });
    // } else {
    index = this.indexOf(params);
    // }
    //    _.pull(this,params);
    //    return 0;
    this.splice(index, 1)
    // // console.log(params)
    return index;
}

Date.prototype.format = function (format: string) {
    format = format || 'yyyy-MM-dd';
    var o: { [key: string]: any } = {
        "M+": this.getMonth() + 1, //月
        "d+": this.getDate(), //日
        "h+": this.getHours(), //时
        "m+": this.getMinutes(), //秒
        "s+": this.getSeconds(), //分
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }

    	// console.log('format-')
    return format;
};