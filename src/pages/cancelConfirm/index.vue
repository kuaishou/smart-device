<template>
  <div class="cancelConfirm-page">
    <!-- <alert :show.sync="cancelFail" content="系统开小差，请重试" confirmText="返回列表" @confirm="backCancel"></alert> -->
    <div class="client-tip">请核对退保客户信息</div>
    <div class="client-wrap">
      <div class="client-box" v-for="(v,i) in cancelPolicy" :key="i">
        <div class="flexbox row-info">
          <div>姓名</div>
          <div class="flex tar">{{v.insuredName}}</div>
        </div>
        <div class="flexbox row-info">
          <div>证件类型</div>
          <div class="flex tar">{{v.idcartType|certificates}}</div>
        </div>
        <div class="flexbox row-info">
          <div>证件号码</div>
          <div class="flex tar">{{v.idcartNo}}</div>
        </div>
        <div v-if="isCashPayment" :class="{verify_done:v.verify}" @click="toAuthentication(v,i)" class="btn-verify">
          <template v-if="!v.verify">{{needVerify(v)?'需验证客户身份证':'确认已收回客户打印凭证'}}</template>
          <template v-else>{{needVerify(v)?'已验证':'已收回客户打印凭证'}}</template>
        </div>
        <!-- <div>确认已收回客户打印凭证</div> -->
      </div>
    </div>
    <div @click="cancel" class="btn btn-theme">退保</div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>

<style scoped lang="less">
.cancelConfirm-page {
  font-size: 34px; /*px*/
  .client-tip {
    color: #3085f0;
    // height: 125px;
    line-height: 126px;
    // background: #eeeeee;
    padding-left: 60px;
  }
  .btn-theme {
    // margin: 42px;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
  .verify_done {
    border: 2px solid rgb(253, 35, 35);
  }
}
.client-wrap {
  // background: white;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 150px;
  .btn-verify {
    text-align: center;
    margin: 20px  auto 0;
    padding:10px 40px ;
    border-radius: 50px;/*no*/
    font-size: 14px ;/*no*/
    width: 560px;
    color: #418FF1;
    border: 1px solid #408EF0;/*no*/
    box-sizing: content-box;
    &.verify_done{
      border: 1px solid #E4E4E4;
      background: #E4E4E4;
      color: #666666;
    }
  }
}
.client-box {
  background: white;
  border-radius: 20px;
  border-bottom: 1px solid #ccc; /*no*/
  // margin-left: 60px;
  margin-bottom: 40px;
  padding-top: 40px;
  padding-left: 40px;
  padding-bottom: 40px;
  color: #808080;
  .row-info:first-child {
    color: black;
    font-weight: bold;
  }
  &:last-child {
    border-bottom: none;
  }
  .row-info {
    height: 100px;
    line-height: 100px;

    // padding-left: 60px;
    padding-right: 60px;
  }
}
</style>
