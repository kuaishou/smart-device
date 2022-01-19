<template>
  <div class="product">
    <alert width="80%" :show.sync="showAccountSettings">
      <div class="account-settings">
        <div @click="logout" class="btn btn-theme">退出账号</div>
        <div @click="changePassword" class="btn btn-theme">修改密码</div>
        <div @click="showAccountSettings = false" class="btn btn-theme">返回</div>
      </div>
    </alert>
    <div>
      <div
        v-for="(v,i) in shelvesProduct"
        :key="i"
        class="pro-box"
        :class="[v.theme]"
        @click="goBuy(v)"
        :style="{backgroundImage:'url('+v.hot+')'}"
      >
        <img class="badgeImg" :src="v.badgeImg" />
        <div class="pro-info">
          <div class>
            <div class="title">{{v.name}}</div>
            <div :style="{color:v.priceColor}" class="price">
              <span class="unit">￥</span>{{v.price}}
            </div>
          </div>

          <div class="desc">
            {{v.desc}}
            <span class="detail" @click.stop="goProduct(v)">详情</span>
          </div>
        </div>
      </div>
    </div>
    <div class="device-version" v-show="isDev">
      测试版本{{version}}
      <br />不可用于交易
    </div>
    <my-dialog v-model="showDialog" hide-on-blur dialogStyle="width:70%">
      <div class="dialog-pg">
        <img src="../../assets/img/insure_lc.png" alt="">
        <div class="dialog__hd">您已进入华安保险投保流程</div>
        <div class="dialog__desc">为保障您的权益，请仔细阅读相关条</div>
        <div class="dialog__desc">款，您在投保流程的操作将被记录。</div>
        <div class="dialog__ft" @click="showDialog = false">确定</div>
      </div>
    </my-dialog>
  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style scoped lang="less">
.device-version {
  padding: 15px;
  color: white;
  font-size: 35px; /*px*/
  position: fixed;
  bottom: 0;
  left: 0;
  background: red;
}
.product {
  padding-top: 60px;
  padding-bottom: 20px;
  .btn-theme {
    margin: 50px;
  }
}
.pro-box {
  position: relative;
  width: 1006px;
  border-radius: 10px; /*no*/
  margin: 0 auto 70px;
  background-size: 100%;
  background-repeat: no-repeat;
  padding-top: 300px;
  .pro-info {
    position: relative;
    overflow: hidden;
  }
  .badgeImg {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 160px;
    height: 160px;
  }
  .title {
    font-size: 36px; /*px*/
    height: 130px;
    line-height: 130px;
    color: #fff;
    padding-left: 20px;
    opacity: 0.9;
  }
  .price {
    color: #fff;
    font-size: 70px; /*px*/
    position: absolute;
      height: 130px;
    line-height: 130px;
    top: 0;
    right: 20px;
    .unit {
      font-size: 36px; /*px*/
    }
  }
  .desc {
    font-size: 32px; /*px*/
    padding-bottom: 5px;
    color: #666666;
    border-bottom: 1px solid #ccc; /*no*/
    padding-left: 20px;
    height: 118px;
    line-height: 118px;
    background-color: white;
    border-bottom-left-radius: 10px; /*no*/
    border-bottom-right-radius: 10px; /*no*/
  }
  .detail {
    position: absolute;
    right: 10px;
    font-size: 32px; /*px*/
    background-image: url("../../assets/img/icon_next.png");
    background-repeat: no-repeat;
    background-position: right;
    background-size: 30px 45px;
    padding-right: 40px;
  }
}
.pro-img {
  width: 100%;
  height: 318px;
}
.dialog-pg {
  position: relative;
  background-color: #fff;
  border-radius: .12rem;
  text-align: center;
  padding-top: .64rem;
  padding-bottom: .1rem;
  img {
    width: 1.5rem;
  }
  .dialog__hd {
    color: #333;
    font-size: 32px; /*px*/
    font-weight: 600;
    margin: 34px 0 22px; /*px*/
  }
  .dialog__desc {
    color: #9E9E9E;
    font-size: 28px; /*px*/
    line-height: 36px; /*px*/
  }
  .dialog__ft {
    color: #fff;
    background-color: #408FF1;
    margin: 48px; /*px*/
    height: 80px; /*px*/
    line-height: 80px; /*px*/
    border-radius: 12px; /*px*/
    font-size: 36px; /*px*/
  }
}
</style>
<style lang="less" scoped>
// 主题
.default_theme {
  border: 5px solid #408ff1; /*px*/
  .title {
    background: #4491e4;
  }

}
.pink_theme {
  border: 5px solid #ed5f67; /*px*/
  .title {
    background: #f4516c;
  }
  .detail {
    background-image: url("../../assets/img/icon_next1.png");
  }
}
.violet_theme {
  border: 5px solid #d946d8; /*px*/
  .title {
    background: #e256dd;
  }
  .detail {
    background-image: url("../../assets/img/icon_next2.png");
  }
}
</style>

