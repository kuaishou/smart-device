<template>
  <div class="identify">
    <alert width="80%" :show.sync="fail">
      <div class="card-fail-title" v-html="failText">

      </div>
      <div @click="resetNFC" class="alert-btn">重新识别身份证</div>
    </alert> 
     <alert width="80%" :show.sync="vailFail"
     content="该身份证信息与客户信息不符，请核对身份证后重试"
     iconType="icon-tip"
      confirmText="返回" @confirm="back"
     >
      
    </alert> 
    <alert class="progress-box" :show.sync="showProgress" width="80%">
      <p class="progress-title">正在读取，请不要移动身份证</p>
      <p>{{progress}}%</p>
      <div class="progress-content">
        <p ref="progress" class="progress"></p>
      </div>
    </alert>
    <div class="card-region"></div>
    <div class="card-tip">
      <div>将身份证紧贴设备顶部识别区域</div>
      <div>直至身份证读取成功</div>
    </div>
    <div v-if="!isAuthentication">
      <div @click="goEntry" class="btn btn-next">手动录入</div>
    </div>
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style scoped lang="less">
// .progress-box{
//   padding-left: 10px;
//   padding-right: 10px;
// }
.card-fail-title {
  line-height: 80px;
  
  padding-top: 70px;
  padding-bottom: 40px;
  text-align: center; 
  padding-left: 35px;
  &::before {
    content: " ";
    box-sizing: content-box;
    position: absolute;
    // vertical-align: sub;
    top: 84px;
    left: 45px;
    display: inline-block;
    background-image: url("../../assets/img/error.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
   
    // background-position-y:4px;
    width: 80px;
    height: 82px;
  }
}
.progress-content {
  overflow: hidden;
  // overflow: hidden;
  background: #999;
  margin-left: 30px;
  margin-right: 30px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 80px;
  border-radius: 5px; /*no*/
}
.progress-title {
  margin-top: 50px;
  height: 150px;
  line-height: 150px;
}
.progress {
  // margin-top: 10px;
  margin-bottom: 80px;
  width: 20%;
  background: #408ff1;
  height: 100%;
}
.alert-btn {
  border: 1px solid #4491f1; /*no*/
  border-radius: 10px;
  margin: 30px auto 60px;
  width: 380px;
  text-align: center;
  // margin-left: 30px;
  // margin-right: 30px;
  color: #4491f1;
  padding: 15px 80px;
}
.identify {
  padding-top: 55px;
  .btn-next {
    width: 500px;
    border-radius: 12px;/*px*/
    // background-color: #70AEFA;
      background: linear-gradient(
   180deg,
    rgb(152, 196, 247) 0%,
    #70AEF9 50%,
    #70AEFA 100%
  );
  height: 120px;
  line-height: 120px;
    margin: 100px auto 55px;
    color: white;
  }
}
.card-region {
  width: 1035px;
  height: 688px;
  background-image: url("../../assets/img/img_id.png");
  background-size: 100% 100%;
}
.card-tip {
  font-size: 40px; /*px*/
  text-align: center;
  color: #408ff1;
}
</style>
