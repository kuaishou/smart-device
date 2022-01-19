
// import toast from '../../utils/Toast'
import Toast from '../../../ui/toast'

let plugin = {
    install: (vue) => {
        // console.log('Toast222', Toast)
        vue.prototype.$toast = Toast
      
    }
}
export default plugin
export const install = plugin.install