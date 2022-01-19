<!--
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-13 22:21:42
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 -->
<template>
  <div class="container">
    <div v-if="isgaozi=='1'" class="gaozhi-box">
      <p class="tips">请客户扫一扫二维码</p>
      <p class="tips">通过健康告知后再支付保费</p>
      <img class="gaozhi-img" :src="weixinCodeUrl" alt="投保告知">
      <p class="bottom-tip">本产品仅支持在线支付</p>
    </div>
    <div v-else class="qrcode-box ">
      <div class="qrcode-box-img">
        <img  class="qrcode-img" :src="weixinCodeUrl">
      </div>
    </div>
    <!-- <div class="qrcode-box alipay-qrcode">
      <div class="qrcode-box-img">
       
        <img  v-if="aliPayCodeImg" class="qrcode-img" :src="aliPayCodeImg">
      </div>
    </div> -->
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style scoped>
.container {
  overflow-y: scroll;
  height: 100%;
  /* background-color: white; */
}
.alipay-qrcode {
  background-image: url("../../assets/img/alipay.png");
}

.weixin-qrcode {
  background-image: url("../../assets/img/weixin.png");
}
.pay-tip {
  text-align: center;
  /* margin-top: 160px; */
  /* margin-bottom: 100px; */
  font-weight: bold;
  color: #408ff1;
  font-size: 55px; /*px*/
}
.qrcode-box-img{
  display: inline-block;
  
  margin:0 auto; 
  background-color: white;
  background-image: url('../../assets/img/loading.gif');
  background-position: center center;
  background-repeat: no-repeat;
      width:640px;
      height: 640px;
}
.qrcode-img {
 width: 100%;
 height: 100%;
}
.qrcode-loading{
  width: 150px;
  height: 150px;
 padding-top: 150px;
}
.qrcode-img.qrcode-img-loading{
  margin-top: 200px;
 width: 100px;
 height: 100px;
}
.qrcode-box {

  width: 980px;
  height: 780px;
  padding-top: 200px;
  padding-bottom: 80px;
  text-align: center;
  background-size: 100% 100%;
   background-image: url("../../assets/img/pay-bg.png");
  margin: 120px auto;
}
.scan-tip {
  color: #444444;
  padding-top: 30px;
  font-size: 40px; /*px*/
  height: 150px;
}

.gaozhi-box{
  width: 90%;
  height: 80%;
  border-radius: 12px;
  background-color: #fff;
  margin: 40px auto;
  text-align: center;
  padding-top: 200px;
  font-size: 50px;
  line-height: 70px;
  color: #333333;
}
.gaozhi-img{
    width: 60%;
    margin: 50px auto;
  }
.bottom-tip{  
    color: #999999;
  }
</style>


