<template>
  <div class="detail-page">
    <img class="banner" :src="product.banner" />
    <div class="duty">
      <div class="row tab-container-header">
        <div class>保障责任</div>
        <span class="text-right">保障金额(元)</span>
      </div>
      <ul class="duty-content">
        <li v-for="(v,i) in product.duty" :key="i" class="duty-row">
          {{v.name}}
          <span v-if="v.amountDay" class="duty-amount">{{v.amountDay}}元/天</span>
          <span v-else class="duty-amount">{{v.amount/10000}}万</span>
        </li>
      </ul>

      <div v-if="product.term" class="term-row">
        保险期限
        <span class="term-date">{{product.term | zdy}}</span>
      </div>
    </div>
    <div class="readNotice">
      <div class>
        更多详情请阅读
        <span @click="readNotice('notice','投保须知')" class="readNotice-content">《投保须知》</span>、
        <span @click="readNotice('clause','保险条款')" class="readNotice-content">《保险条款》</span>和
        <span @click="readNotice('guide','理赔指南')" class="readNotice-content">《理赔指南》</span>
      </div>
    </div>
    <div style="height:15px;background:#eaeaea"></div>
    <div class="tab-wrap">
      <div class="product-tab-wrap tac flexbox">
        <div
          @click="productDetail=true"
          :class="productDetail?'product-tab-select':''"
          class="flex product-tab select-left"
        >产品详情</div>
        <div
          @click="productDetail=false"
          :class="productDetail?'':'product-tab-select'"
          class="flex product-tab select-right"
        >常见问题</div>
      </div>
    </div>
    <div>
      <img
        v-if="productDetail?product.detail:product.question"
        class="img-detail"
        :src="productDetail?product.detail:product.question"
      />
    </div>
    <div style=" height: 60px;"></div>
    <div class="tabar">
      <div class="tabar-item">
        <span class="unit">￥</span>
        {{product.price}}
      </div>
      <div @click="goBuy" class="tabar-item tabar-next">立即投保</div>
    </div>
    <agreement v-model="agreementData.show" :content="agreementData.content" :title="agreementData.title" :footer="false"></agreement>
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style lang="less" scoped>
.detail-page {
  background: white;
  .banner {
    width: 100%;
    height: 500px;
  }
  .duty-content {
    padding-left: 45px;
  }
  .duty-row {
    height: 60px;
    line-height: 60px;
    position: relative;
    .duty-amount {
      position: absolute;
      right: 45px;
    }
  }
  .term-row {
    position: relative;
    border-top: 4px solid #ccc;
    padding-top: 10px;
    margin-top: 10px;
    padding-bottom: 10px;
    padding-left: 45px;
    .term-date {
      position: absolute;
      right: 45px;
    }
  }

  .readNotice {
    padding-left: 45px;
    padding-bottom: 45px;
    .readNotice-content {
      color: #4491f1;
    }
  }
  .tab-container-header {
    height: 100px;
    line-height: 100px;
    position: relative;
    padding-left: 45px;
    color: #666;
    border-bottom: 4px solid #ccc;
    .text-right {
      position: absolute;
      top: 0;
      right: 45px;
    }
  }
  .duty {
    border: 4px solid #ff3f61;
    background: white;
    margin: 45px;
    border-radius: 20px;
  }
  .img-detail {
    width: 100%;
  }
}
.product-tab-wrap {
  background: white;
  border-bottom: 4px solid #ccc;
  .product-tab {
    height: 120px;
    line-height: 120px;
    &.product-tab-select {
      color: #ff3f61;
    }
  }
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
    font-weight: 700;
    color: #ff3f61;
    font-size: 34px; /*px*/
    .unit {
      font-size: 30px; /*px*/
    }
  }
  .tabar-next {
    background: #ff5661;
    color: white;
    font-size: 36px; /*px*/
  }
}
</style>

