<template>
  <div @scroll="toolbarRightClick" id="app" class="app">
    <header v-show="toolbarShow" class="header">
      <span
        :class="[toolbarLeftText=='返回'?'callback':'switch-code']"
        @click="toolbarLeftClick"
      >{{toolbarLeftText}}</span>
      {{title}}
      <span
        v-if="toolbarRightText"
        class="toolbar-menu"
        @click="toolbarRightClick"
      >{{toolbarRightText}}</span>
    </header>
    <router-view ref="Page"/>
    <alert 
    @confirm="showElectricTip = false"
    icon-type="icon-tip" width="80%" :content="electricTip" :confirmText="confirmText" :show.sync="showElectricTip">
     
    </alert>
  </div>
</template>
<script lang="ts" src="./App.ts">
// import { getStorage, setStorage } from "@/utils";
// import { mapState, mapMutations } from "vuex";
// import Alert from "@/common/vui/components/Alert/index.vue";
// import { printTerminalCount } from "@/api";
// import { ELECTRICITY_CUE } from "@/constant";
// export default {
//   components: {
//     Alert
//   },
//   methods: {
//     ...mapMutations(["SET_IMEI", "SET_VERSION"]),
//     toolbarLeftClick() {
//       if (this.$refs.Page.toolbarLeftClick) {
//         this.$refs.Page.toolbarLeftClick();
//       } else {
//         this.$router.back(-1);
//       }
//     },
//     toolbarRightClick() {
//       if (this.$refs.Page.toolbarRightClick) {
//         this.$refs.Page.toolbarRightClick();
//       }
//     },
//     connectWebViewJavascriptBridge(callback) {
//       if (window.WebViewJavascriptBridge) {
//         callback(WebViewJavascriptBridge);
//       } else {
//         document.addEventListener(
//           "WebViewJavascriptBridgeReady",
//           function() {
//             callback(WebViewJavascriptBridge);
//           },
//           false
//         );
//       }
//     },
//     addPrintPolicyAppNoCount(data) {
//       data.forEach(v => {
//         printTerminalCount({
//           policyAppNo: v
//         });
//       });
//     }
//   },
//   computed: {
//     ...mapState(["toolbarLeftText", "toolbarRightText", "title", "toolbarShow"])
//   },
//   beforeRouteLeave() {
//     console.log("beforeRouteLeave");
//   },
//   mounted() {
//     // setTimeout(() => {
//     //   this.$refs.loading.remove();
//     // }, 1000);
//     // console.log("loading", this.$refs);
//   },
//   data(){
//     return  {
//          electricTip:ELECTRICITY_CUE['001']
//     }
//   },
//   created() {
//     // console.log('ELECTRICITY_CUE',ELECTRICITY_CUE)
//     this.SET_IMEI({
//       content: getStorage("imei")
//     });

//     this.connectWebViewJavascriptBridge(bridge => {
//       bridge.init(function(message, responseCallback) {});

//       this.$bus.$on("logout", function() {
//         bridge.callHandler("logout");
//       });
//       this.$bus.$on("initNFC", function() {
//         bridge.callHandler("submitFromWeb");
//       });

//       this.$bus.$on("print", function(data) {
//         console.log("打印数据", data);
//         bridge.callHandler("print", data);
//       });
//       this.$bus.$on("printBill", function(data) {
//         console.log("打印统计", data);
//         bridge.callHandler("printBill", data);
//       });
//       bridge.registerHandler("printSuccess", (data, responseCallback) => {
//         data = JSON.parse(data);
//         console.log("打印成功=", data);
//         this.addPrintPolicyAppNoCount(data);
//       });
//       bridge.registerHandler("funcJS", (data, responseCallback) => {
//         data = JSON.parse(data);
//         console.log("收到funcJS");
//         // debugger
//         if (data.type == "suc") {
//           this.$bus.$emit("NFC", data);
//         } else if (data.imei) {
//           setStorage("imei", data.imei);

//           this.SET_IMEI({
//             content: data.imei
//           });
//           this.SET_VERSION({
//             content: data.version
//           });
//         } else if (!!data.type) {
//           console.log("收到安卓事件", data.type);
//           this.$bus.$emit(data.type, data);
//         }
//       });
//     });
//   }
// };
</script>

<style lang="less">
@theme: #4491f1;
input {
  border: 0;
  outline: 0;
  font-family: "\5FAE\8F6F\96C5\9ED1";
  // font-family:  "PingFang SC","微软雅黑","Microsoft YaHei",Helvetica,"Helvetica Neue",Tahoma,Arial,sans-serif;
}
.header {
  height: 120px;
  line-height: 120px;
  background: #408ff1;
  text-align: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9;
  font-size: 50px;
  color: white;
  .switch-code {
    display: inline-block;
    position: absolute;
    left: 0;
    height: 120px;
    width: 280px;
    padding-left: 20px;
    line-height: 120px;
    box-sizing: content-box;
  }
  .toolbar-menu {
    right: 0;
  }
  .callback,
  .toolbar-menu {
    display: inline-block;
    position: absolute;

    height: 120px;
    width: 280px;
    padding-left: 0px;
    line-height: 120px;
    box-sizing: content-box;
  }
  .callback {
    left: 0;
    background-image: url("../assets/img/arrow_back20.png");
    background-repeat: no-repeat;
    background-position-x: 30px;
    background-position-y: 30px;
    background-size: 50px 50px;
  }
}
.app {
  padding-top: 120px;
  height: calc(100% - 120px);
}
body {
  box-sizing: border-box;
  // max-width: 1080px;
  // padding-top: 120px;
  margin: 0 auto;
  background-image: url("../assets/img/bg.png");
  background-size: 100%;
  background-position-y: bottom;
  background-repeat: no-repeat;
  background-color: #abd1ff;
  font-family: "\5FAE\8F6F\96C5\9ED1";
  //font-family: "微软雅黑";
  // font-family:"Microsoft YaHei";
  // font-family:  "PingFang SC","微软雅黑","Microsoft YaHei",Helvetica,"Helvetica Neue",Tahoma,Arial,sans-serif;
}
input.down {
  background: url("../assets/img/icon_down.png") no-repeat scroll right center
    transparent; /* 自己的图*/
  padding-right: 66px;
  box-sizing: border-box;
}
select {
  appearance: none; /* 去掉默认图标 */
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  padding: 0 20px 0 5px;
  background: url("../assets/img/icon_down.png") no-repeat scroll right center
    transparent; /* 自己的图*/

  /* 以下是圆角和边框等其他设置： */
  width: 100%;
  // height:28px;
  // line-height:28px;
  border: 0;
  outline: none;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  padding: 0 20px 0 5px;
}
.btn {
  height: 150px;
  line-height: 150px;
  // width:680px;
  // height: 110px;
  text-align: center;
  color: @theme;
  // border: 2px solid @theme;
  border-radius: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  box-sizing: border-box;
  // width: 860px;
  font-size: 36px; /*px*/
}
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
  width: 250px;
  height: 250px;
  border-radius: 20px;
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
  height: 150px;
}
.borderBox > p {
  margin-top: 5px;
  font-size: 34px;
  color: #ececec;
}
</style>
