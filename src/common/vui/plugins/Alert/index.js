// import objectAssign from 'object-assign'
import MComponent from '../../components/Alert'
import mergeOptions  from '../../../utils/mergeOptions'

let $vm
let watcher

const plugin = {
    install(vue, pluginOptions = {}) {
        const Toast = vue.extend(MComponent)

        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const defaults = {}
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default
            }
        }

        const pluginOpt = {
            show(options = {}) {
                // destroy watcher
                watcher && watcher()
                if (typeof options === 'string') {
                    mergeOptions($vm, Object.assign({}, pluginOptions, { content: options }))
                } else if (typeof options === 'object') {
                    mergeOptions($vm, Object.assign({}, pluginOptions, options))
                }
                if (typeof options === 'object' && options.onShow || options.onHide) {
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm)
                        val === false && options.onHide && options.onHide($vm)
                    })
                }
                $vm.show = true
            },
            hide() {
                $vm.show = false
            },
            isVisible() {
                return $vm.show
            }
        }

    
        vue.prototype.$alert = pluginOpt;
      
    }
}

export default plugin
export const install = plugin.install
