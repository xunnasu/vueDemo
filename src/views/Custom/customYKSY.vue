<template>
  <div class="containeryk">
    <div class="mainBox">
      <!-- top -->
      <div class="yika-wrapper" @click="handleClick">
        <div>{{tip}}</div>
      </div>
      <!-- middle -->
      <div class="middleBox">
        <div class="middleIcon">
           <img src="../../assets/img/icon1.png" alt="">
           <img src="../../assets/img/icon2.png" alt="">
           <img src="../../assets/img/icon3.png" alt="">
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      tip: '请珍惜个人信用，养成按时还款的好习惯',
      appNum:'111'
    };
  },
  created(){
    // console.log(this)
    // sessionStorage.setItem('appNum',this.appNum)
  },
  methods:{
    handleClick(){
      console.log(5533);
      this.$router.push({
        // path:`/CustomYK/${this.appNum}`,
        name:'CustomYK',
        params:{
          appNum:this.appNum,
        }
      })
    },
  }
};
</script>
<style lang="less" scoped>
.containeryk {
  width: 100%;
  background: #fff;
  height: 100%;
  .mainBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .yika-wrapper {
      text-align: center;
    }
  }
}
</style>