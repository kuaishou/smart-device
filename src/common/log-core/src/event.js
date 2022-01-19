import logCore from "./core";
let countClick = 0, lastClickTime = 0;
function listenClick(e) {
    let time = +new Date();
    // console.log('当前点击-', time)
    // console.log('上次点击-', lastClickTime)
    // console.log('间隔-', time-lastClickTime)
    if (logCore.startupClickX >= e.clientX && logCore.startupClickY >= e.clientY) {
        if (lastClickTime != 0 && time - lastClickTime > logCore.clickTimeInterval) {
            // console.log('无效点击');
            countClick = 0;
            lastClickTime = 0;
            return 0;
        }
        lastClickTime = time;
        // console.log('统计点击');
        countClick++;
        if (logCore.clickCountOpenLog <= countClick) {
            if (confirm('你准备开启打印日志模式，如果这个是你不小心触发的请选择取消')) {
                logCore.loadDebug();
                document.removeEventListener('click', listenClick);
            } else {
                countClick = 0;
                lastClickTime = 0;
            }

        }
    } else {
        // console.log(logCore)
        countClick = 0;
    }
    // console.log('点击', e.clientX, e.clientY)

}
function initListenLogStart() {

    document.addEventListener('click', listenClick)
    // logCore.loadDebug
}

export default {
    init: function () {
        console.log('*******', logCore);
        if (!logCore.isStartupLog) {
            //初始化监听日志启动
            initListenLogStart();
        }
    }
}