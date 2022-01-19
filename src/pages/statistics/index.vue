<template>
  <div class='statistics'>
   
      <div class="flexbox query-wrap">
    
        <input maxlength="6" @click="selectStartDate" class="flex query-date" v-model="sDate" readonly >
        <span class="date-line">-</span>
        <input @click="selectEndDate" class="flex query-date" v-model="eDate" readonly >
        

         
        <span @click="queryTerminalPolicyStat" class="btn-query">查询</span>
      </div>
      <div 
      v-for="(v,i) in list"
      :key="i"
       class="statistics-wrap">
            <div class="statistics-title">{{v.productName}}</div>
            <div 
            
             class="pro-wrap">
                 <div class="pro-title">现金支付</div>
                 <div class="flexbox">
                    <div class="flex3">出单</div>
                    <div class="flex">{{v.totalCount1}}件</div>
                    <div class="flex tar">{{v.totalPremiumAmt1}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">退保</div>
                    <div class="flex">{{v.cancelCount1}}件</div>
                    <div class="flex tar">{{v.cancelPremiumAmt1}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">实收</div>
                    <div class="flex">{{v.actualCount1}}件</div>
                    <div class="flex tar">{{v.actualPremiumAmt1}}元</div>
                 </div>
                 
            </div>
              <div 
            
             class="pro-wrap">
                 <div class="pro-title">在线支付</div>
                <div class="flexbox">
                    <div class="flex3">出单</div>
                    <div class="flex">{{v.totalCount2}}件</div>
                    <div class="flex tar">{{v.totalPremiumAmt2}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">退保</div>
                    <div class="flex">{{v.cancelCount2}}件</div>
                    <div class="flex tar">{{v.cancelPremiumAmt2}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">实收</div>
                    <div class="flex">{{v.actualCount2}}件</div>
                    <div class="flex tar">{{v.actualPremiumAmt2}}元</div>
                 </div>
            </div>
              <div 
            
             class="pro-wrap">
                 <div class="pro-title">合计</div>
               <div class="flexbox">
                    <div class="flex3">出单</div>
                    <div class="flex">{{v.totalCount}}件</div>
                    <div class="flex tar">{{v.totalPremiumAmt}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">退保</div>
                    <div class="flex">{{v.cancelCount}}件</div>
                    <div class="flex tar">{{v.cancelPremiumAmt}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">实收</div>
                    <div class="flex">{{v.actualCount}}件</div>
                    <div class="flex tar">{{v.actualPremiumAmt}}元</div>
                 </div>
            </div>
            
      </div>
      
       <div 
    v-if="totalCashCount"
       class="statistics-wrap">
            <div class="statistics-title">汇总</div>
            <div 
            
             class="pro-wrap">
              
                 <div class="flexbox">
                    <div class="flex3">现金实收</div>
                    <div class="flex">{{totalCashCount}}件</div>
                    <div class="flex tar">{{totalCash}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">线上实收</div>
                    <div class="flex">{{totalElcCount}}件</div>
                    <div class="flex tar">{{totalElc}}元</div>
                 </div>
                   <div class="flexbox">
                    <div class="flex3">合计</div>
                    <div class="flex">{{totalCount}}件</div>
                    <div class="flex tar">{{total}}元</div>
                 </div>
                 
            </div>
       </div>
        <p class="clear-print" ></p>
     
      <div 
    
      class="bottom-tabbar">
          
           <div class="btn-print" @click="toPrint">
           打印
          </div>
      </div>
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style scoped lang="less">
 .clear-print {
    height: 200px;
  
  }
   .bottom-tabbar {
    // height: 200px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #b9d8ff;
    display: flex;
    &.tabbar-dn {
      display: none;
    }
    &.tabbar-fixed {
      position: fixed;
    }
  }
  .btn-print {
    position: relative;
    flex: 1;
    height: 150px;
    line-height: 150px;
    font-size: 34px;/*px*/
    // border-radius: 15px;
    text-align: center;
    background: #408ff1;
    color: #fff;
    // margin: 60px;
  }
.query-wrap{
 padding:50px 20px;
 .date-line{
    line-height: 25px;
    padding: 25px 5px 10px;
    font-size: 30px;

 }
  .btn-query{
    display: inline-block;
    padding: 20px 80px;
    color: #fff;
    background: #408ff1;
    border-radius: 5px;/*px*/
        margin-left: 20px;
  }
 .query-date{
   display: block;
    width: 200px;
    border-radius: 5px;/*px*/
    padding-left: 12px;
 }   
}
.statistics-wrap {

  .statistics-title {
    // height: 124px;
    line-height: 124px;
    padding-left: 20px;
    font-size: 36px;/*px*/
    background-color: #eeeeee;
  }
  .pro-title {
    font-size: 34px;/*px*/

    line-height: 100px;
    // height: 100px;
    color: #444444;
    font-weight: 600;
  }
  .pro-wrap {
    // padding: 40px;
    padding:10px 40px ;
    font-size: 32px;/*px*/
    line-height: 80px;
    background-color: #ffffff;
  }
  .right-label {
    position: absolute;
    width: 400px;
    right: 60px;
    text-align: right;
    .count-label{
      margin-right: 20px;
      position: absolute;
      left: 0;
    }
  }
}
</style>
