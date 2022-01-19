<template>
  <div class='entry'>
        <div class="entry-form">
            <div class="flexbox ui-row">
               <div class="ui-label">姓名</div>
               <div class="flex">
                 
                 <MInput class="flex-input" v-model="insured.insuredName"  placeholder="请输入姓名"/>
               
               </div>
            </div>
             <!-- <input v-model="insured.insuredName" placeholder="请输入姓名"> -->
            <div class="flexbox ui-row">
               <div class="ui-label">证件类型</div>
               <div class="flex">
                <select
                v-model="insured.idcartType"
                 class="certificates">

                  <option
                   v-for="(v,i) in product.certificates"
                   :key="i"
                   :value="v.code"
                   >
{{v.name}}
                  </option>
                </select>
               </div>
            </div>
            <div class="flexbox ui-row">
               <div class="ui-label">证件号码</div>
               <div class="flex">
                 <!-- <input v-model="insured.idcartNo" placeholder="请输入证件号码"> -->
                  <MInput class="flex-input" maxlength="20"  v-model="insured.idcartNo"  placeholder="请输入证件号码"/>
               </div>
            </div>
             <div v-if="insured.idcartType!='01'" class="flexbox ui-row">
               <div class="ui-label">性别</div>
               <div class="flex">
                 <select  v-model="insured.sex">
                   <option value="">请选择</option>
                   <option value="M">男</option>
                   <option value="F">女</option>
                 </select>
               </div>
            </div>
             <div  v-if="insured.idcartType!='01'" class="flexbox ui-row">
               <div class="ui-label">出生日期</div>
               <div class="flex">
                  <input class="bornDate" @click="selectBornDate" readonly v-model="bornDate" placeholder="请输入出生日期">
               </div>
            </div>
            <div class="flexbox ui-row">
               <div class="ui-label">手机号码<span class="ui-label-desc">(非必填)</span></div>
               <div class="flex">
                 <MInput class="flex-input" type="tel" maxlength="11" v-model="insured.mobile"  placeholder="请输入手机号码"/>
                 <!-- <input type="tel" maxlength="11" v-model="insured.mobile" placeholder="请输入手机号码"> -->
               </div>
            </div>
            <div class="flexbox ui-row">
               <div class="ui-label">电子邮箱<span class="ui-label-desc">(非必填)</span></div>
               <div class="flex">
                  <MInput class="flex-input" v-model="insured.mail"  placeholder="用于接收电子保单"/>
                 <!-- <input v-model="insured.mail" placeholder="用于接收电子保单"> -->
               </div>
            </div>
           
        </div>
        <div>
       <div 
       @click="goConfirm"
       class="btn btn-next">
         确认
       </div>
     </div>
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style lang="less" scoped>
.entry{
  padding-top: 40px;
  .btn-next{ 
     background-color: #70AEFA;
     margin:100px 55px 55px;
     color: white;
  }
}
.entry-form{
  box-sizing: border-box;
  background-color: white;
 
  width: 1014px;
  margin: 0 auto;
  border-radius: 15px;
  padding: 60px;
}
.ui-row {
  height: 147px;
  font-size: 30px;/*px*/
  line-height: 147px;
  border-bottom: 1px solid #DCDCDC;/*no*/
  .ui-label {
    width: 360px;
  } 
 .flex-input{
   margin-top: 40px;
   display: inline-block;
   width: 100%;
 }
 .bornDate{
   padding-left: 18px;
 }
  .ui-label-desc{
    font-size: 26px;/*px*/
    color: #999999;
  }
}
</style>

