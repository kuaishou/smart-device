<template>
  <div>
    <div class="agreement-box" v-if="list && list.length">
      <div class="footer__checked">
        <div class="left" @click="onCheckClick">
          <i :class="['icon-checkbox', {'checked': checked}]"></i>
        </div>
        <div class="right">
          <span class="span1">本人已经仔细阅读和确认</span>
          <div v-for="(item, i) in list" :key="i" @click.stop="onAgreementClick(i)">
            <span class="span2">《{{item.title}}》</span>
            <span class="span1" v-if="i != list.length - 1">{{ i == list.length - 2 ? '和' : '、' }}</span>
          </div>
          <span class="span1">的相关内容</span>
        </div>
      </div>
    </div>
    <agreement
      v-for="(item,i) in list"
      :key="i"
      v-model="item.show"
      :content="item.content"
      @sure="onSure"
      @close="onClose"
      :agreementIndex="i"
      :agreementKey="item.key"
      :title="item.title"
      :footer="item.footer"
      :slideToBottom="true"
    >
    </agreement>
  </div>
</template>

<script>
import { get } from '@/common/fetch'
import { Sitlog } from '@/common/SituRecorder';//录屏开始

export default {
  name: "AgreementList",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    isAllRead: {
      type: Boolean,
      default: false
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    agreementList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: [], //协议数组
      currentIndex: 0, //当前下标
      showAgreement: false, //开始依次显示协议
      allRead: false, //子组件的所有是否已读完
      checked: false, //子组件的是否已勾选协议
    };
  },
  methods: {
    onSure() {
      const { list, currentIndex } = this
      if (currentIndex == this.list.length - 1) { //如果是最后一项协议证明看完所有了
        this.list[currentIndex].show = false
        this.$emit('submit')
        this.allRead = true
        this.$emit('update:isAllRead', true)
      } else {
        if (!list[currentIndex + 1].content) {
          this._getHtm({
            index: currentIndex + 1,
            url: list[currentIndex + 1].url,
            footer: true,
            success: () => {
              setTimeout(() => {
                this.list[currentIndex].show = false
                this.currentIndex ++                
              }, 1000)
            }
          })
        } else {
          list[currentIndex + 1].show = true
          setTimeout(() => {
            list[currentIndex].show = false
            this.currentIndex ++
          }, 400)
        }
      }
    },
    onClose(i) { //关闭时分两种情况: 单独打开协议 和 依次打开协议, 依次打开协议中途关闭需重置协议状态
      this.list[i].show = false
      if (this.list[i].footer) {
        this.showAgreement = false
        this.$emit("input", false)
        this.allRead = false
        this.$emit('update:isAllRead', false)
      } else {
        setTimeout(() => {
          this.list[i].footer = true;
        }, 300)
      }
      this.currentIndex = 0
    },
    _getHtm(data) { //接口获取content, 成功拿到后临时保存下来下次再打开不需要再次获取
      const { index, url, footer, success, error } = data
      get( url, { loading: true })
        .then(htmlStr => {
            this.list[index].content = htmlStr
            this.list[index].footer = footer
            this.$nextTick(() => {
              this.list[index].show = true
              success && success()
            })
            this.$emit('update:agreementList', this.list)
        })
        .catch((err) => {
          error && error()
          this.$toast.show('获取协议数据异常，请稍后再试~')
        })
    },
    onAgreementClick(i) { //独立协议点击, 不影响依次阅读协议的逻辑
    Sitlog(this.list[i].title,'CLICK_BUTTON')
      if (this.list[i].content) {
        this.list[i].footer = false
        this.list[i].show = true
      } else {
        this._getHtm({index: i, footer: false, url: this.list[i].url})
      }
    },
    onCheckClick() {
      this.checked = !this.checked
      this.$emit('update:isChecked', this.checked)
    }
  },
  watch: {
    agreementList: {
      handler(v) {
        if (v && v.length) {
          this.list = v.map(item => ({...item}))
        }
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(v) {
        this.showAgreement = v;
        if (v) {
          const { list } = this
          if (list && list.length) {
            this.currentIndex = 0
            this.$nextTick(() => {
              if (!list[0].content) {
                this._getHtm({
                  index: 0,
                  url: list[0].url,
                  footer: true,
                  error: () => this.$emit("input", false)
                })
              } else list[0].show = true
            })
          }
        }
      },
      immediate: true,
    },
    isAllRead: {
      handler(v) {
        this.allRead = v        
      },
      immediate: true
    },
    isChecked: {
      handler(v) {
        this.checked = v     
      },
      immediate: true
    }
  },
  beforeDestroy() {}
};
</script>


<style scoped lang="less">
.agreement-box {
  padding-bottom: .4rem;
  font-size: .36rem;
}
.footer__checked {
  padding: 0 .2rem;
  color: #333;
  display: flex;
  align-items: center;
  .icon-checkbox{
    display: inline-block;
    width: .48rem;
    height: .48rem;
    background: url('../../assets/img/checkbox-off.png') no-repeat center / 100%;
    transition: background-image .3s;
    &.checked{
      background-image: url('../../assets/img/checkbox-on.png');
    }
  }
  .left {
    padding: 0 .15rem;
  }
  .right {
    flex: 1;
    > div {
      display: inline-block;
    }
  }
  .span1 {
    padding: 0 0 .08rem .05rem;
    font-size: .34rem;
  }
  .span2 {
    color: #4491f1;
  }
}
</style>