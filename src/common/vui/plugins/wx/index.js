
import wechat from '../../../wechat'

let plugin = {
    install: (vue) => {
        wechat.init();
        vue.prototype.$wx = wechat;
       
    }
}
export default plugin