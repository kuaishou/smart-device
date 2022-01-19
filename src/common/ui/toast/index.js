// const tpl = 
import './index.css'
function Toast() {

}
let toast = new Toast;
function getSingleToastDom() {
    let toastWrap = document.getElementById('ui-toast-wrap')
    // if (document.getElementById('ui-toast-wrap'))
    if (!toastWrap) {
      
        toastWrap = document.createElement('div');
        toastWrap.id = 'ui-toast-wrap'
        toastWrap.style.display = 'none';
        toastWrap.className = 'ui-toast-wrap'
        toastWrap.innerHTML = `
        <div class="ui-toast-body">
        <div class="ui-toast-text opacity9"></div>
        </div>
        `;
        document.body.appendChild(toastWrap);
        toastWrap.addEventListener('click',function(){
            toast.hide();
        })
    }
    // console.log('**', toastWrap)
    return toastWrap;
}
Toast.prototype.show = function (opt) {
    // debugger

    if (typeof opt == 'string') {
        opt = {
            time: 3000,
            text: opt
        }
    }
 
    let toastWrap = getSingleToastDom();
    let centerContent = toastWrap.getElementsByClassName('ui-toast-text')[0];
    
    centerContent.innerHTML = opt.text;
    toastWrap.style.display = 'block';
  
    setTimeout(() => {
        this.hide();
    }, opt.time);
}
Toast.prototype.hide = function () {
    let toastWrap = getSingleToastDom();
    toastWrap.style.display = 'none';
}

export default toast