<template>
  <div @click.stop="close" v-show="show" class="mask tb-alert">
    <div
      @click.stop
      :style="{
                      width:width 
                    }"
      class="alert-box"
    >
      <div class="alert-content">
        <slot>
          <div :class="[iconType]" class="alert-icon"></div>
          <div v-html="content" class="alert-tip"></div>
          <div class="alert-footer">
            <div v-if="cancelText" @click="cancel" class="alert-btn">{{cancelText}}</div>
            <div v-if="confirmText" @click="confirm" class="confirm-btn alert-btn">{{confirmText}}</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cancelText: String,
    confirmText: String,
    width: String,
    iconType: {
      type: String,
      default: "icon-success"
    },
    show: {
      type: Boolean,
      default: false
    },
    maskClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    },

    content: {
      type: String,
      default: null
    }
  },
  methods: {
    confirm() {
    
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("confirm");
    },
    close() {
      // this.show = false;
      if (this.maskClose) {
        this.$emit("update:show", false);
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  created() {
    this.$nextTick(() => {});
  }
};
</script>

<style lang="less" scoped>
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9;
  top: 0;
}
.confirm-tip {
  margin-top: 30px;
}
.alert-box {
  // border: 20px solid #4491f1;
  overflow: hidden;
  background-color: #4491f1;
  border-radius: 20px;
  /* width: 240px;
    height: 130px; */
  width: 550px;
  // height: 400px;
  margin: 0 auto;
  text-align: center;
  padding-top: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  font-size: 34px; /*px*/
  padding: 15px;
}
.alert-footer {
  display: flex;
}
.alert-content {
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
}
.alert-icon {
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
  margin: 0.5rem auto 0.1rem;
}
.icon-success {
  background-image: url("./img/icon_success.png");
}
.icon-tip {
  background-image: url("./img/tip.png");
}
.alert-tip {
  font-size: 0.24rem;
  color: rgb(114, 106, 106);
  font-size: 50px;
  padding: 30px;
}
.alert-btn {
  flex: 1;
  border: 1px solid #4491f1; /*no*/
  border-radius: 10px;
  margin: 30px;
  // margin-left: 30px;
  // margin-right: 30px;
  color: #4491f1;
  padding: 15px;
}
.none{
  display: none;
}
.confirm-btn{
  color: white;
  background: #4491f1;
}
</style>

