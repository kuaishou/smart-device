/*
 * @Author: xinghaodong@sinosafe.com.cn 
 * @Date: 2020-09-30 14:51:55 
 * @Last Modified by: xinghaodong@sinosafe.com.cn
 * @Last Modified time: 2020-10-12 09:23:45
 */
 
<template>
  <div class="container">
    <p class="top">因监管要求，请您确认无以下情况再支付订单</p>
    <!-- <div class="word">{{this.html}}</div> -->
    <div class="word" v-html="this.html.default"></div>
    <div class="tabar">
      <div class="tabar-item" @click="alertshow">部分为是</div>
      <div class="tabar-item tabar-next" @click="goPay">本人无上述情况</div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less" scoped>
.container {
  overflow-y: scroll;
  height: 100%;
  /* background-color: white; */
  .word {
    background-color: #fff;
    padding: 0.32rem;
    box-sizing: border-box;
    padding-bottom: 180px;
  }
}
.top {
  height: 90px;
  line-height: 90px;
  padding: 0 20px;
  background: #d9eaff;
  color: #3271bf;
}
.tabar {
  position: fixed;
  display: flex;
  background: white;
  width: 100%;
  max-width: 1080px;
  height: 150px;
  line-height: 150px;
  bottom: 0;
  text-align: center;
  .tabar-item {
    flex: 1;
    color: #408ff1;
    font-size: 30px; /*px*/
  }
  .tabar-next {
    background: #408ff1;
    color: white;
    font-size: 30px; /*px*/
  }
}
.alert-box{
  width: 80%;
}
</style>


