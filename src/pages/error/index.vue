<template>
  <div class='error'>
        <PolicyErrorTip
         :code="code"
        />
       <!-- <div class="info-box"> 
            <div class="err-title">出单失败，网络出故障啦！</div>
            <div class="err-tip">请先退现金给客户。如客户扫码支付，需您预付给客户，并简要记录以下客户信息，以便后续退还给您。</div>
       </div> -->
      <div class="info-box insure-info"> 
            <div class="flexbox ui-row  ui-title">
                <div class="flex ">推广员</div>
                <div class="flex2">编号</div>
            </div>
            <div class="flexbox  ui-row">
                <div class="flex">{{insure.policyExt.promoteName}}</div>
                <div class="flex2">{{insure.policyExt.promoteCode}}</div>
            </div>
             <div class="flexbox ui-row ui-title">
                <div class="flex  ">客户姓名</div>
                <div class="flex2">证件号码</div>
            </div>
             <div class="flexbox ui-row" 
             :key="i"
             v-for="(v,i) in insure.insureds">
                <div class="flex">{{v.insuredName}}</div>
                <div class="flex2">{{v.idcartNo}}</div>
            </div>
       </div>
       <div class="oper-box" >
          <div @click="back" class="btn btn-next">
             返回首页
       </div>
       </div>
      
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style  scoped lang="less">

.error {
  
 .oper-box{
    margin: 45px;
 }
  overflow: hidden;
  .info-box {
    background: white;
    border-radius: 20px;
    padding-bottom: 35px;
    margin: 40px;
  }
}
.insure-info{
  .ui-row{
    height: 100px;
    padding-left: 90px;
    line-height: 100px;
    font-size: 32px;/*px*/
    color: #818181;
  }
  .ui-title{
      font-weight: bold;
      padding-top: 40px;
      font-size: 36px;/*px*/
      color: black;
   }
}
.btn-next {
  background-color: #4491f1;
  color: white;
  &.disable {
    background-color: #bcdaff;
  }
}
</style>

