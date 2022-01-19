<template>
  <div v-if="showLogin" class='home'>
     
     <!-- <Picker
    
     /> -->
    
       <div class="login-box">
            <div class="staff-row flexbox">
               <div class="row-lable">工号</div>
               <div  class="flex">
                 <input v-model="promoteCode"  class="staff-code" value="" placeholder="请输入工号" type="tel">
               </div>
            </div>
             <div class="staff-row flexbox">
               <div class="row-lable">密码</div>
               <div  class="flex">
                 <input v-model="promotePassword" class="staff-code" value="" placeholder="请输入密码" type="password">
               </div>
            </div>
            <div>
             <div @click="goNext" class="0disable btn btn-next">
                进入销售
               </div> 
            </div>
       </div>
        <!-- <m-dialog
        :visible="visible"
        >
            <div @click="aaa" slot="header">head</div>
        </m-dialog> -->
    
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style  scoped lang="less">
.home {
  overflow: hidden;
}
.login-box {
  background: white;
  border-radius: 30px;
  box-sizing: border-box;
  width: 986px;
  // height: 586px;
  margin: 342px auto 0;
  padding: 58px;
}
.staff-row{
  border-bottom: 1px solid #DCDCDC;/*no*/
  // height: 168px;
  line-height: 168px;
  // margin-bottom: 100px;
  font-size: 34px;/*px*/
  .row-lable{
    width: 240px;
    padding-left: 27px;
    //  background: yellow;
    box-sizing: border-box;
  }
  .staff-code{
   font-size:34px;/*px*/
   line-height: 60px;
  //  background: red
  }
  
}
.btn-next{
    background-color: #4491F1;
    color: white;
    &.disable{
      background-color: #bcdaff;
    }
}
</style>

