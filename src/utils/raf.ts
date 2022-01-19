const w: any = window
const raf: any = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || w.msRequestAnimationFrame;
export default function draf (cb: any) {
    if (raf) {
        raf(() => {
            raf(cb)
        })
    } else {
        (function (cb) {
            w.setTimeout(cb, 1000 / 60);
        })(cb)
    }
}
