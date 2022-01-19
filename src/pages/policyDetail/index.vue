<template>
  <div class='policy-detail'>
      <div class="detail-wrap">
          <div class="row">被保人姓名<span class="right-label">{{policy.insuredName}}</span></div>
          <div class="row">证件类型<span class="right-label">
            {{policy.idcartType|certificates}}
           </span></div>
          <div class="row">证件号码<span class="right-label">{{policy.idcartNo}}</span></div>
          <div class="row">手机号码<span class="right-label">{{policy.mobile?policy.mobile:'--'}}</span></div>
          <div class="row">电子邮箱<span class="right-label">{{policy.mail?policy.mail:'--'}}</span></div>
          <div class="row">保险起期<span class="right-label">{{policy.insuredBgnTime}}</span></div>
          <div class="row">保单号<span class="right-label">{{policy.policyNo}}</span></div>
          <div class="row">保费<span class="right-label">{{policy.prm/100}}元</span></div>
          <div class="row">支付方式<span class="right-label">{{policy.payType|payType}}</span></div>
          <div class="row">保单状态<span class="right-label">{{policy|policyStatus}}</span></div>
      </div> 
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style scoped lang="less">
.policy-detail{
  .detail-wrap{
    background-color: white;
    font-size: 32px;/*px*/
    padding-top: 60px;
    padding-bottom: 60px;
    padding-left: 40px;

    .row{
      line-height:100px;
      height:  100px;
      .right-label{
        position:absolute;
        right: 40px;
       }
    }
  }
}
</style>
