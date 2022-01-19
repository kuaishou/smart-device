<template>
  <div class="cancelStatus-page">
    <div class="tac status-wrap">
      <div v-if="errCode==0">
        <i class="status-icon success-icon"></i>
        <p class="status-text">退保成功</p>
        <div class="status-tip">
          <template v-if="payType==1">该保单通过现金支付，请退还现金给客户</template>
          <template v-else>
            该保单通过扫码支付，退款将实时通过微信/支付宝退还至支付账户中，请提醒客户留意退款通知。
            <br />如有问题，请联系华安保险当地工作人员
          </template>
        </div>
      </div>
      <div v-if="errCode==1">
        <i class="status-icon fail-icon"></i>
        <p class="status-text">退保失败</p>
        <div class="status-tip">该保单已过可退保时间，如仍需退保，请先退还现金给客户，并联系华安保险当地工作人员</div>
      </div>
      <div v-if="errCode==2">
        <i class="status-icon error-icon"></i>
        <p class="status-text">退保异常</p>
        <div class="status-tip">系统开小差，如仍需退保，请先退还现金给客户，并联系华安保险当地工作人员</div>
      </div>
    </div>
    <div @click="backCancel" class="btn btn-theme">确定</div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>

<style lang="less" scoped>
.cancelStatus-page {
  .btn-theme {
    margin: 42px;
  }
}

.status-wrap {
  margin: 40px;
  border-radius: 15px;
  //   height: 500px;
  background-image: url("../../assets/img/status-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: white;
  //   background-position: 10px;
  padding-bottom: 100px;
  .status-text {
    color: #eb5a54;
    font-size: 34px; /*px*/
  }
  .status-tip {
    margin-top: 85px;
    font-size: 36px; /*px*/
    color: #818181;
    padding: 0 30px; /*px*/
    box-sizing: border-box;
    text-align: left;
  }
}
.status-icon {
  display: inline-block;
  height: 215px;
  width: 215px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-top: 140px;
}
.error-icon {
  background-image: url("../../assets/img/error.png");
}
.success-icon {
  background-image: url("../../assets/img/success.png");
}
.fail-icon {
  background-image: url("../../assets/img/fail.png");
}
</style>
