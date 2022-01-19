<template>
  <transition name="fadeUp">
    <div class="agreement-wrap" v-show="showAgreement">
      <div class="agreement-header hairline--bottom">
        <span class="agreement-title">{{ title }}</span>
        <span class="agreement-close" @click="onClose"></span>
      </div>
      <div class="agreement-content" ref="content" @scroll.prevent="onScroll">
        <slot>
          <div class="padding" v-html="content"></div>
        </slot>
      </div>
      <div class="agreement-footer" v-if="footer">
        <slot name="footer">
          <div class="footer__checked hairline--bottom" v-if="checked" @click="agreementChecked = !agreementChecked">
            <i :class="['icon-checkbox', {'checked': agreementChecked}]"></i>
            <span>本人已经仔细阅读并确认以上内容</span>
          </div>
          <div class="footer_btn" :class="{disable: isDisable}" @click="onSure">
            <span>{{ footerText }}</span>
            <span v-if="count">（ {{ count }} ）</span>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import raf from '@/utils/raf';

export default {
  name: "Agreement",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: String,
    content: String,
    timeoutNum: { //倒计时默认时间
      type: Number,
      default: 5
    },
    footer: Boolean, //是否显示底部协议、按钮组
    slideToBottom: Boolean, // 是否开启滑到底部控制
    footerText: { //确定按钮文案
      type: String,
      default: '确定'
    },
    checked: { //是否显示协议勾选控制
      type: Boolean,
      default: true
    },
    btnTime: { //是否开启倒计时控制
      type: Boolean,
      default: true
    },
    agreementIndex: {
      type: Number,
      default: 0
    },
    agreementKey: String,
    offsetBttom: { //底部预留距离
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      count: 0, //倒计时5秒
      timer: null,
      isBottom: false,
      showAgreement: false,
      offsetHeight: 0,
      scrollHeight: 0,
      agreementChecked: false
    };
  },
  computed: {
    isDisable () {
      return this.checked && !this.agreementChecked || this.btnTime && this.count || this.slideToBottom && !this.isBottom
    }
  },
  methods: {
    init() {
      this.count = 0
      this.timer = null
      this.isBottom = false
      this.showAgreement = false
    },
    onClose() { //每次关闭清空计数器
      this.count = 0;
      this.isBottom = false;
      this.showAgreement = false;
      this.$emit("input", this.showAgreement);
      this.$emit("close", this.agreementIndex);
      clearInterval(this.timer);
      this.$refs.content.scrollTop = 0;
    },
    countDown(first) { //设置倒计时5秒
      first && (this.count = this.timeoutNum)
      this.timer = setTimeout(() => {
        if (this.count > 0) {
          this.count--
          this.countDown(false)
        } else clearInterval(this.timer);
      }, 1000)
    },
    isScrollBottom() { //滑动到底部预留 offsetBttom 距离
      const { scrollHeight, scrollTop, clientHeight } = this.$refs.content
      return scrollTop + clientHeight >= scrollHeight - this.offsetBttom
    },
    onScroll(e) {
      this.scrollEvent(e.target)
    },
    scrollEvent(el) {
      if (this.slideToBottom) { //滑动到底部
        if (el.scrollTop >= this.scrollHeight - this.offsetHeight - this.offsetBttom) {
          this.isBottom = true
        }
      }
    },
    initContent () {
      const initHeight = () => {
        this.offsetHeight = this.$refs.content.offsetHeight
        this.scrollHeight = this.$refs.content.scrollHeight
        this.scrollEvent(this.$refs.content) // 初始化的时候执行一遍，以免页面高度不构成滚动条导致不激活到底事件
      }
      raf(initHeight)
      setTimeout(initHeight, 500) //fix渲染延迟高度获取错误
    },
    onSure() {
      if (this.btnTime && this.count) return
      if (this.slideToBottom && !this.isBottom) {
        this.$toast.show('请滑到底部阅读完整内容')
        return
      }
      if (this.checked && !this.agreementChecked) {
        this.$toast.show('请勾选并阅读以上内容')
        return
      }
      this.isBottom = false
      this.$emit('sure', this.agreementKey)
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.showAgreement = newValue;
        if (this.showAgreement) {
          raf(() => {
            this.$refs.content.scrollTop = 0
          })
          if (this.footer && this.slideToBottom) {
            this.initContent()
            this.$toast.show('请滑到底部阅读完整内容')
          }
          if (this.footer && this.btnTime) this.countDown(true)
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.agreement-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 19;
  display: flex;
  flex-direction: column;
  .agreement-header {
    line-height: 1.12rem;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #eee; /*px*/    
    .agreement-title {
      font-size: 0.48rem;
    }
    .agreement-close {
      position: absolute;
      min-width: 0.96rem;
      height: 0.96rem;
      right: 0;
      &:before,
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.04rem;
        height: 0.4rem;
        background: #333;
        border-radius: 0.02rem;
      }
      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
  .agreement-content {
    flex: 1;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .padding {
      padding: 0.32rem;
      box-sizing: border-box;
      height: 100%;
      iframe {
        width: 100%;
        height: 100%;
      }
    }
    img {
      width: 100%;
    }
  }
  .agreement-footer {
    .footer_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: .48rem;
      line-height: 1.12rem;
      background-color: #4491f1;
      &.disable {
        opacity: .5;
      }
    }
  }
  .footer__checked {
    padding: 0 .2rem;
    color: #666;
    display: flex;
    align-items: center;
    .icon-checkbox{
      display: inline-block;
      width: .4rem;
      height: .4rem;
      background: url('../../assets/img/checkbox-off.png') no-repeat center / 100%;
      margin: 0 .15rem;
      transition: background-image .3s;
      &.checked{
        background-image: url('../../assets/img/checkbox-on.png');
      }
    }
    span {
      line-height: .9rem;
    }
  }
}

.fadeUp-enter,
.fadeUp-leave-to {
  transform: translate3d(0, 100%, 0);
}
.fadeUp-enter-active,
.fadeUp-leave-active {
  transition: all .3s ease;
}
</style>