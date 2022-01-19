<template>
  <div class="policy">
    
    <div class="search-bar">
      <input v-model="q" class="search-value" placeholder="请输入姓名/证件号码搜索" value>
    </div>
    <div class="flexbox query-wrap">
        <input maxlength="6" @click="selectStartDate" class="flex query-date" v-model="sDate" readonly >
        <span class="date-line">-</span>
        <input @click="selectEndDate" class="flex query-date" v-model="eDate" readonly >
        <span @click="search" class="btn-query">查询</span>
    </div>
    <div class="policy-list">
      <div
        v-for="(v,i) in list"
        :key="i"
        @click="toDetail(v)"
        ref="sss"
        class="policy-item"
      >
        <div class="policy-item__top">
          <div class="left-label">
            <span :class="[v.checked?'checked':'']" @click.stop="checke(v)" class="checkbox"></span>
          </div>
          <div class="pro-title">
            <span class="insured-name">{{v.insuredName}}</span>
            <span
              :class="[v.status!='5'?'disable-status':'']"
              class="right-label arrow"
            >{{v.createTime|date('yyyy-MM-dd hh:mm:ss')}}</span>
          </div>
        </div>
        <div class="policy-item__bottom">
          <div class="insurance-info">
            {{getProductName(v)}}
            <span class="right-label label-date">{{v|policyStatus}}</span>
          </div>
        </div>
      </div>
      <div v-if="loadDone" class="load-more" @click="loadMore">{{hasMore?'点击加载更多':'没有更多数据'}}</div>
    </div>

    <p class="clear-print"></p>

    <div :class="[qFocus?'tabbar-dn':'tabbar-fixed']" class="bottom-tabbar">
      <div v-if="canCancel" class="btn-retreat" @click="toCancel">退保</div>
      <div  class="btn-print" @click="toPrint">打印凭证</div>
    </div>
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style scoped lang="less">
// @import "../../../../assets/css/fn.less";
.policy {
  .search-bar {
    height: 150px;
    background-color: #408ff1;
    padding: 25px 50px;
    box-sizing: border-box;
    .search-value {
      background-image: url("../../assets/img/search.png");
      background-repeat: no-repeat;
      background-size: 60px 60px;
      background-position: 30px 20px;
      font-size: 34px; /*px*/
      border-radius: 50px;
      box-sizing: border-box;
      padding-left: 100px;
      width: 100%;
      height: 100px;
    }
  }
  .clear-print {
    height: 154px;
  }
  .policy-list {
    background: white;
  }
  .policy-item {
    
    padding: 20px 0 15px 48px;
    &__top{
      display: flex;
      align-items: center;
      .insured-name{
        font-size: 30px; /*px*/ 
        font-weight: 500;
      }
      .pro-title{
        flex: 1;
        .right-label{
          padding-right: 40px
        }
      }
    }
    &__bottom{
      border-bottom: 4px solid #e6e6e6;
      padding-bottom: 25px;
    }
    .left-label {
      width: 100px;
      padding-top: 10px;
      .checkbox {
        background-image: url("../../assets/img/checkbox-0.png");
        background-size: 100% 100%;
        display: inline-block;
        width: 50px;
        height: 50px;
        -webkit-tap-highlight-color: transparent;
        &.checked {
          background-image: url("../../assets/img/checkbox-1.png");
        }
      }
    }
    .pro-title {
      position: relative;
      line-height: 80px; 
      height: 80px;
      overflow: hidden;
      font-size: 30px;  /*px*/
    }
    .insurance-info {
      position: relative;
      height: 80px;
      line-height: 90px;
      font-size: 30px; /*px*/
    }
    .right-label {
      position: absolute;
      top: 2px;
      font-size: 30px; /*px*/
      &.label-date {
        font-size: 30px; /*px*/
      }
      &.arrow {
        background-image: url("../../assets/img/icon_next.png");
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 20px 30px;
      }
      right: 42px;
      &.disable-status {
        color: #818181;
      }
      color: #444444;
    }
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
  .btn-retreat {
    // border-right: 0.5px solid #ccc;/*no*/
    &::after {
      .setRightLine(#fff);
    }
  }
  .btn-print {
    // border-left: 0.5px solid #ccc;/*no*/
    &::after {
      .setLeftLine(#fff);
    }
  }
  .btn-retreat,
  .btn-print {
    position: relative;
    flex: 1;
    height: 150px;
    line-height: 150px;
    font-size: 34px; /*px*/
    // border-radius: 15px;
    text-align: center;
    background: #408ff1;
    color: #fff;
    // margin: 60px;
  }
  .load-more {
    text-align: center;
    height: 150px;
    line-height: 150px;
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
}
</style>
