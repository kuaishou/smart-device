<template>

<div v-if="show" class="loading-box-index">
    
        <div class="pageLoading bgModal" ></div>
        <div class="pageLoading loadingWrap borderBox" >
            <img src="./loading-change.gif">
            <p>正在加载</p>
        </div>
    </div>
<!-- <transition :name="transition">
    <div
      class="weui-loading_toast vux-loading"
      :class="!text ? 'vux-loading-no-text' : ''"
      v-show="show">
      <div class="weui-mask_transparent"></div>
      <div
        class="weui-toast"
        :style="{
          position: position
        }">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content" ><slot>数据加载中...</slot></p>
      </div>
    </div>
  </transition> -->
</template>
<script>
export default {
  props: {
    text: String,
    transition: String,
    position: String,
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //   show: false
    };
  },
  created() {}
};
</script>

<style lang="less" scoped>
.bgModal {
  visibility: visible;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9998;
  position: fixed !important;
  _position: absolute;
  // _background-image: url(about:blank);
  _background-attachment: fixed;
  // _top: expression(eval(document.documentElement.scrollTop));
}
.borderBox {
  width: 250px;/*px*/
  height: 250px;/*px*/
  border-radius: 20px;/*px*/
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
  filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000, endcolorstr=#7F000000);
}
.borderBox > img {
  height: 150px;/*px*/
}
.borderBox > p {
  margin-top: 5px;/*px*/
  font-size: 34px;/*px*/
  color: #ececec;
}


.weui-loading {
  width: 100px;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: weuiLoading 1s steps(12, end) infinite;
  animation: weuiLoading 1s steps(12, end) infinite;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
  background-size: 100%;
}
.weui-loading.weui-loading_transparent,
.weui-btn_loading.weui-btn_primary .weui-loading,
.weui-btn_loading.weui-btn_warn .weui-loading {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E");
}
@-webkit-keyframes weuiLoading {
  0% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(0, 0, 1, 360deg);
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
@keyframes weuiLoading {
  0% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(0, 0, 1, 360deg);
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
@media screen and (min-width: 1024*2.5px) {
  .weui-dialog {
    width: 35%;
  }
}
.weui-toast {
  
  position: fixed;
  z-index: 5000;
  width: 220px;
  min-height:76px;
  top: 450px;
  left: 50%;
  margin-left: -100px;
  background: rgba(17, 17, 17, 0.7);
  text-align: center;
  border-radius: 12.5px;
  color: #FFFFFF;
}
.weui-icon_toast {
  margin: 55px 0 0;
  display: block;
}
.weui-icon_toast.weui-icon-success-no-circle:before {
  color: #FFFFFF;
  font-size: 137.5px;/*px*/
}
.weui-icon_toast.weui-loading {
  margin: 50px 60px 20px;
  width: 95px;
  height: 95px;
  vertical-align: baseline;
}
.weui-toast__content {
  margin: 0 0 37.5px;
}
.weui-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.weui-mask_transparent {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>

