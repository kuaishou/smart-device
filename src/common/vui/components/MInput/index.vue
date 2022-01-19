<template>
    <div class="input_wrap">
        <div class="input_box">
            <input 
          :style="inputStyle"
         class="m-input"
         :class="inputClass"
          v-model="currentValue" @blur="blur" @focus="focus" 
          :placeholder="placeholder"
          :type="type"
          :maxlength="maxlength"
          />
        </div>
      
        <span class="clear-icon" @click="clear" v-if="showClear"></span>
    </div>
</template>
<script>
export default {
  props: {
    textAlign: String,
    value: [String, Number],
    placeholder: String,
    maxlength: [String, Number],
    type: String
  },
  data() {
    return {
      currentValue: "",
      showClear: false
    };
  },
  computed: {
    inputClass() {
      return {
        "input-text-right": this.textAlign == "right"
      };
    },
    inputStyle() {
      let style = {};

      this.textAlign && (style.textAlign = this.textAlign);
      if(this.showClear){
         style.paddingRight=10;
      }
      //   this.textAlign == "right" && (style.left = this.textAlign);
      return style;
      //   if (this.textAlign) {
      //     return {
      //       textAlign: this.textAlign
      //     };
      //   }
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(newVal, oldVal) {
      //   console.log('watch-')
      if (newVal) {
        this.showClear = true;
      } else {
        this.showClear = false;
      }
      this.$emit("input", newVal);
      this.$emit("on-change", newVal);
    }
  },
  created() {
    // this.currentValue = 'this.value123456789123456789';
    this.currentValue = this.value;
  },
  methods: {
    clear() {
      //  console.log('clear')
      this.currentValue = "";
    },
    blur() {
      this.$nextTick(() => {
        this.showClear = false;
      });
    },
    focus() {
      if (this.currentValue) {
        this.showClear = true;
      } else {
        this.showClear = false;
      }
    }
  }
};
</script>
<style scoped>
.input_wrap {

  box-sizing: content-box;
  position: relative;
  /* height: 100%; */
  width: 100%;
  overflow: hidden;

}
.input_box{
  /* background: yellow; */
  height: 60px;
  line-height: 60px;
  padding-right: 64px;
}

.m-input {
   display: block;

  height: 100%;


  width: 100%;
  box-sizing: content-box;
  /* background: red; */
}
.clear-icon {
  /* height: 80px; */
  height: 100%;
  position: absolute;
  top: 0;

   right: -10px;
   display: inline-block;
   width: 76px;
   background-color: white;

  background-image: url("./clear.png");
  background-repeat: no-repeat;
  background-position:  20px center;
  background-size: 35px;

}
</style>


