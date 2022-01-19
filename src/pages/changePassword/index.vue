<template>
    <div class="changePassword-page">
       <!-- <alert 
    :show.sync="changeSuccess"   
    content="密码修改成功"
    confirmText="重新登录"
     @confirm="backHome"
   >

    </alert> -->
        <div class="change-wrap">
             <div
             class="change-box"
             >
                 <div class="flexbox row-info">
                     <div class="row-label">原密码</div>
                     <div class="flex tar"> <input type="password" v-model="changForm.password" placeholder="请输入原密码" /></div>
                 </div>
                 <div class="flexbox row-info">
                     <div class="row-label">新密码</div>
                     <div class="flex tar">
                       <input type="password" v-model="changForm.newPassword" placeholder="请输入新密码"/>
                     </div>
                 </div>
                 <div class="flexbox row-info">
                     <div class="row-label">确认新密码</div>
                     <div class="flex tar"> <input type="password" v-model="changForm.newConfirmPassword" placeholder="请输入确认新密码"/></div>
                 </div>
             </div>
           
        </div>
        <div @click="changePassword"  class="btn btn-theme">
             确定
       </div>
    </div>
</template>
<script lang="ts" src="./index.ts">
</script>

<style scoped lang="less">
.changePassword-page {
  font-size:34px;/*px*/
  .change-tip {
    color: #999999;
    // height: 125px;
    line-height: 126px;
    background: #eeeeee;
    padding-left: 60px;
  }
  .btn-theme {
    margin: 42px;
  }
}
.change-wrap {
  background: white;
  margin-top: 50px;
}
.change-box {
  border-bottom: 1px solid #ccc;/*no*/
  margin-left: 60px;
  padding-top: 40px;
  padding-bottom: 40px;
  &:last-child{
    border-bottom:none;
  }
  .row-info {
    height: 100px;
    line-height: 100px;
    // padding-left: 60px;
    padding-right: 60px;
    .row-label{
      width: 300px;
    }
    input{
      width: 100%;
      height: 100%;
      font-size:34px;/*px*/
    }
  }
}
</style>
