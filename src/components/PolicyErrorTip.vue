<template>
  <div class="info-box">
    <div class="err-title">{{eText.title}}</div>
    <div class="err-tip" v-html="eText.tip"></div>
  </div>
</template>
<script>
const errorText = {
  "001": {
    title: "出单失败，网络出故障啦！",
    tip:
      "请先退现金给客户。如客户扫码支付，需您预付给客户，<br/>并简要记录以下客户信息，以便后续退还给您。"
  },
  "002": {
    title: "抱歉网络超时了，但不用担心，可按下面流程操作",
    tip:
      `1.如客户已经支付，请咨询其手机号，方便系统后续自动出单成功发短信通知客户<br/>
       2.如客户未支付，则无需处理
      `
  }
};
export default {
  props: {
    code: String
  },
  
  data() {
      console.log(errorText[this.code])
    return {
      eText: errorText[this.code] || {}
    };
  }
};
</script>
<style scoped lang="less">
.info-box {
  background: white;
  border-radius: 20px;
  padding-bottom: 35px;
  margin: 40px;
}
.err-title {
  color: #444444;
  font-size: 35px; /*px*/
  padding-top: 72px;
  padding-left: 50px;
  margin-left: 50px;
  text-indent: 90px;
  padding-bottom: 10px;
  font-weight: 600;
  padding-right: 10px;
//   text-align: center;
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    // vertical-align: sub;
    top: 58px;
    left: 35px;
    display: inline-block;
    background-image: url("../assets/img/tip.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // background-position-y:4px;
    width: 90px;
    height: 90px;
  }
}
.err-tip {
  color: #818181;
  padding: 40px 80px;
  font-size: 30px; /*px*/
}
</style>

