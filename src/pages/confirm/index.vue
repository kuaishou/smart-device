<template>
  <div class="confirm">
    <alert
      class="pay-select-alert"
      :maskClose="true"
      :show.sync="paySelectShow"
    >
      <div class="pay-select-box">
        <div class="pay-title">选择支付方式</div>
        <div class="flexbox pay-select">
          <div
            @click="insure.payment.payType = '1'"
            :class="[insure.payment.payType == '1' ? 'pay-selected' : '']"
            class="flex pay-select-btn pay-select-left"
          >
            特殊支付
          </div>
          <div
            @click="insure.payment.payType = '2'"
            :class="[insure.payment.payType == '2' ? 'pay-selected' : '']"
            class="flex pay-select-btn pay-select-right"
          >
            线上支付
          </div>
        </div>
        <div @click="paySelect" class="pay-btn">确定</div>
      </div>
    </alert>
    <!-- <alert 
    content="您已投保成功"
    confirmText="返回首页"
    @confirm="backHome"
    :show.sync="success">
    </alert>-->
    <!-- {{isDelIndex}} -->
    <!-- <alert :show.sync="showDelete">
      <div class="success-tip confirm-tip">是否确定删除？</div>
      <div class="confirm-del flexbox">
        <div @click="del" class="btn-left del-btn flex">确定</div>
        <div @click="isDelIndex = -1" class="btn-right del-btn flex">取消</div>
      </div>
    </alert> -->

    <div class="confirm-list">
      <div v-for="(v, i) in insure.insureds" :key="i" class="holder-box">
        <div class="ui-row flexbox">
          <div class="ui-row-label">姓名</div>
          <div class="flex tar right-label">{{ v.insuredName }}</div>
        </div>
        <div class="ui-row flexbox">
          <div class="ui-row-label">证件类型</div>
          <div class="flex tar right-label">
            {{ v.idcartType | certificates }}
          </div>
        </div>
        <div class="ui-row flexbox">
          <div class="ui-row-label">证件号码</div>
          <div class="flex tar right-label">{{ v.idcartNo }}</div>
        </div>
        <div class="ui-row flexbox">
          <div class="ui-row-label">手机号码(非必填)</div>
          <div class="flex tar right-label">
            <MInput
              textAlign="right"
              maxlength="11"
              class="com-input"
              v-model="v.mobile"
              placeholder="请输入手机号码"
            />
            <!-- <input maxlength="11" class="tar" placeholder="请输入手机号码" v-model="v.mobile"/> -->
          </div>
        </div>
        <div class="ui-row flexbox">
          <div class="ui-row-label">电子邮箱(非必填)</div>
          <div class="flex tar right-label">
            <MInput
              textAlign="right"
              class="com-input"
              v-model="v.mail"
              placeholder="请输入电子邮箱"
            />
            <!-- <input class="tar" placeholder="请输入电子邮箱" v-model="v.mail"/> -->
          </div>
        </div>
        <div v-if="insure.insureds.length > 1" class="oper-row ui-row flexbox">
          <div class="ui-row-label">
            <span @click="del(i)" class="del">删除</span>
          </div>
          <div class="flex tar right-label"></div>
        </div>
      </div>
      <div v-if="isbaojia"  class="checkbox term-wrap">
        <span :class="['checkbox-item', { active: yibao == 1 }]" @click="quotePrice(1)">有医保</span>
        <span :class="['checkbox-item', { active: yibao == 0 }]" @click="quotePrice(0)">无医保</span>
      </div>
      <div class="term-wrap">
        <div class="flexbox ui-row">
          <div class="ui-row-label">保险起期</div>
          <div class="flex">
            <input
              @click="selectStartDate"
              v-model="insuredBgnTime"
              readonly
              class="down tar right-label"
              placeholder
            />
          </div>
        </div>
        <div class="flexbox ui-row">
          <div class="ui-row-label">保险止期</div>
          <div class="flex">
            <input
              v-model="insuredEndTime"
              readonly
              class="right-label tar"
              placeholder
            />
          </div>
        </div>
      </div>

      <div v-if="insure.product.productCode == 'P061702'" class="aviation-wrap">
        <div class="flexbox ui-row">
          <div class="ui-row-label">
            单次航班号
            <span class="red">*</span>
          </div>
          <div class="flex">
            <input
              class="right-label tar"
              hbh
              v-model="insure.riskExt.hbh"
              placeholder="请输入单次航班号"
            />
          </div>
        </div>
        <div class="cj-row flexbox ui-row">
          <div class="ui-row-label">乘机日</div>
          <div class="flex">
            <input
              v-model="boardingDate"
              @click="boarding"
              readonly
              class="down tar"
              placeholder
            />
          </div>
        </div>
      </div>
      <div v-if="!isbaojia" class="holder-box add-box" style="text-align: right">
        <div @click="toAdd" class="btn btn-add">添加同行旅客</div>
      </div>
      <agreement-list
        v-if="switchHS && !$route.query.payApplyNo"
        v-model="agreements.show"
        :isAllRead.sync="agreements.isAllRead"
        :isChecked.sync="agreements.isChecked"
        :agreementList.sync="agreements.list"
        @submit="onAgreementSubmit"
      >
      </agreement-list>
    </div>
    <div v-if="isbaojia" class="tabar">
      <div class="tabar-item">
        <span class="unit">￥</span>
        {{ product.price }}
      </div>
      <div @click="next" class="tabar-item tabar-next">确认投保</div>
    </div>
    <div v-else class="entry-wrap">
      <div @click="next" class="btn btn-next">确认投保</div>
    </div>

  </div>
</template>
<script lang='ts' src="./index.ts">
</script>
<style  lang="less">
.confirm {
  .pay-select-alert {
    .alert-box {
      bottom: 0;
      border-radius: 0;
      transform: none;
      width: 100% !important;
      top: auto;
      position: absolute;
      padding: 0;
    }
    .alert-content {
      border-radius: 0;
    }
  }
}
</style>
<style lang="less" scoped>
.pay-select-box {
  .pay-title {
    height: 180px;
    line-height: 180px;
    font-size: 34px; /*px*/
    color: #999999;
  }
  .pay-select {
    padding-left: 55px;
    padding-right: 55px;
  }
  .pay-select-right {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-left: 0 !important;
  }
  .pay-select-left {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-right: 0 !important;
  }
  .pay-select-btn {
    box-sizing: border-box;
    height: 200px;
    line-height: 200px;
    border: 1px solid #ccc; /*no*/
    &.pay-selected {
      color: #408ff1;
      border: 1px solid #408ff1 !important; /*no*/
      background-image: url("../../assets/img/pay_selected.png");
      background-repeat: no-repeat;
      background-position: right bottom;
      background-size: 100px 84px;
    }
  }
  .pay-btn {
    height: 140px;
    margin-top: 74px;
    line-height: 140px;
    // border: 4px solid #ccc;
    margin: 55px;
    border-radius: 15px;
    color: white;
    background-color: #408ff1;
  }
}
.confirm-del {
  padding: 10px;
  margin-top: 80px;
  .del-btn {
    border-radius: 15px;
    border: 4px solid #ccc;
    width: 50px;
    color: #4491f1;

    border: 4px solid #4491f1;
  }
  .btn-right {
    margin-left: 20px;
  }
  .btn-left {
    margin-right: 20px;
  }
}

.red {
  color: red;
}
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9;
  top: 0;
}
.back-home {
  border: 4px solid #4491f1;
  border-radius: 10px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  color: #4491f1;
  padding: 15px;
}
.confirm-tip {
  margin-top: 30px;
}
.success-box {
  border: 20px solid #4491f1;
  border-radius: 15px;
  /* width: 240px;
    height: 130px; */
  width: 550px;
  height: 400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.06rem;
  text-align: center;
  padding-top: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  font-size: 34px; /*px*/
}
.success-ico {
  background-image: url("../../assets/img/icon_success.png");
  // background-image: url('data:image/png;base64,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');
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
  margin: 0 auto 0.1rem;
}
.success-tip {
  color: rgb(114, 106, 106);
  font-size: 50px; /*px*/
}
.confirm-tip {
  margin-top: 80px;
}
.confirm-del {
  padding: 10px;
  margin-top: 80px;
  .del-btn {
    border-radius: 15px;
    border: 4px solid #ccc;
    width: 50px;
    color: #4491f1;

    border: 4px solid #4491f1;
  }
  .btn-right {
    margin-left: 20px;
  }
  .btn-left {
    margin-right: 20px;
  }
}
.confirm {
  padding-top: 46px;
  font-size: 34px; /*px*/
  .cj-row {
    margin-top: 20px;
    input {
      height: 50px !important;
    }
  }
  .holder-box {
    border-top: 4px solid #b9d9ff;
    padding-top: 45px;
    padding-bottom: 20px;
    margin-left: 45px;
    margin-right: 45px;
    .del {
      border: 4px solid #4491f1;
      display: inline-block;
      // margin-top:30px;
      // margin-bottom:50px;
      padding: 0px 100px;
      // padding-right: 100px;
      text-align: center;
      border-radius: 15px;
      color: #4491f1;
    }
    &:first-child {
      // background: red;
      border-top: 0;
    }
  }

  .confirm-list {
    background: white;
    margin: 0 45px 0;
    border-radius: 15px;
    .oper-row {
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .com-input {
      padding-left: 60px;
    }
    .ui-row {
      height: 80px;
      line-height: 80px;
      .right-label {
        font-size: 28px; /*px*/
        padding-right: 66px;
        box-sizing: border-box;
      }
      input {
        width: 100%;
        height: 100%;
      }
    }
    .ui-row-label {
      font-size: 30px; /*px*/
      width: 360px;
    }
    .checkbox {
      padding-left: 40px;
      padding-right: 40px;
      display: flex;
      justify-content: center;
      .checkbox-item {
        flex: 1;
        display: inline-block;
        padding: 20px 40px;
        margin: 0 5px;
        border-radius: 6px;      
        background: #F7F7F7;
      }
      .active {
        background: url("../../assets/img/checkbox-item.png") no-repeat 90% 50%;
        background-size: 80px 80px;
        background-color: #d9eaff;
        color: #3271bf;
      }
    }

    .term-wrap {
      // padding-top: 45px;
      padding: 20px 45px;
      border-top: 1px solid #b9d9ff; /*no*/
    }
    .aviation-wrap {
      border-top: 1px solid #b9d9ff; /*no*/
      padding: 20px 45px 30px;
    }
  }
  .entry-wrap {
    padding: 40px 48px;
  }
  .btn {
    box-shadow: 0px 0px 20px 5px #4491f1;
  }
  .btn-next {
    background-color: white;
    color: #4491f1;
  }
  .add-box {
    padding-top: 20px;
    padding-right: 60px;
    padding-bottom: 20px;
  }
  .btn-add {
    font-size: 30px; /*px*/
    background-image: url("../../assets/img/add.png");
    background-repeat: no-repeat;
    background-size: 50px 50px;
    background-position-y: 15px;
    padding-left: 60px;
    display: inline-block;
    box-shadow: none;
    // width: 300px;
    height: 90px;
    line-height: 81px;
    // margin-top: 55px;
    // margin-bottom: 55px;
    background-color: white;
    //  background-color: red;
    // border: 1px solid #4491f1;/*no*/
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
    color: #408FF1;
    font-size: 34px; /*px*/
    .unit {
      font-size: 30px; /*px*/
    }
  }
  .tabar-next {
    background: #408FF1;
    color: white;
    font-size: 36px; /*px*/
  }
}
</style>

