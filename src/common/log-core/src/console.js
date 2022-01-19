import logCore from "./core";
const win = window, doc = document;
const _console = {
    init: function () {
        rewriteConsole();
    }
}
function rewriteConsole() {
    ['log', 'info', 'warn', 'debug', 'error'].forEach(v => {
        let _console = console[v];
        console[v] = function () {
            // _console('到这里')
            logCore.record.push({
                type:v,
                value:JSON.stringify(arguments)
            })
            _console.apply(win.console, arguments)
        }
    })
}
export default _console;