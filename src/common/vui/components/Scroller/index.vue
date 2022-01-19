<template>
    <div
     
     class="wrapper">
        <slot name="showPullDown">
              <div class="showPullDown" v-if="showPullDown">上拉刷新</div>
        </slot>
       
        <div ref="scroller">
           
               <slot class="scroller">

               </slot>
         </div>
          <slot name="showPullUp">
              <div class="showPullUp" v-if="showPullUp">上拉刷新</div>
        </slot>
       
    </div>
</template>
<script>

export default {

  data() {
    return {
      showPullDown: false,
      showPullUp: false
    };
  },
  mounted() {
      console.log('mounted')
    let yy = 0;
    this.$refs.scroller.addEventListener("touchstart", e => {
      yy = e.changedTouches[0].clientY;
      console.log("touchstart", e);
    });
    this.$refs.scroller.addEventListener("touchmove", e => {
      let y = e.changedTouches[0].clientY - yy;
      y = y > 100 ? 100 : y;
      y = y < -100 ? -100 : y;
      if (y > 0) {
        this.showPullDown = true;
      } else {
        this.showPullUp = true;
      }
      this.$refs.scroller.style.transform = "translateY(" + y + "px)";
      //   console.log("touchmove", e);
    });
    this.$refs.scroller.addEventListener("touchend", e => {
      this.$refs.scroller.style.transform = "translateY(0px)";
      console.log("ontouchend", e);
      this.showPullDown = false;
      this.showPullUp = false;
    });
   
   
  }
};
</script>
<style scoped>
.wrapper {
  overflow: hidden;
}
.showPullDown {
  text-align: center;
}
.showPullUp {
  text-align: center;
}
</style>


