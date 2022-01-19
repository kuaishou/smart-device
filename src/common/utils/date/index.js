export function format(value,_format) {
    value = value.replace(/-/ig,'/')

    let d =  new Date(value);
    
    _format = _format||'yyyy-MM-dd';
    var o = {
        "M+": d.getMonth() + 1, //月
        "d+": d.getDate(), //日
        "h+": d.getHours(), //时
        "m+": d.getMinutes(), //秒
        "s+": d.getSeconds(), //分
        "q+": Math.floor((d.getMonth() + 3) / 3), //quarter
        "S": d.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(_format)){
        _format = _format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)if (new RegExp("(" + k + ")").test(_format)){
        _format = _format.replace( RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length) );
    }
    return _format;
}