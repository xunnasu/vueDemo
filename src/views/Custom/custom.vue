<template>
    <!-- 切记在子组件中，引用完 ， 要记得在这里使用  -->
    <div class="containers">
      <div class="cont">
        <div class="img">
          <img src="../../../public/imgs/banner.png" alt="">
        </div>
        <div class="gold">
          <p v-for="item in 30" :key="item">{{gold}}</p>
        </div>
        <div class="footer">
          <p class="add" @click="handleAdd">加入购物车</p>
          <p class="buy">立即购买</p>
        </div>
      </div>
      <!-- 弹出层，去掉父组件的model，就用这个→ → --> 
      <goods :show="VShow"  @on-show="handleShow"></goods> 
      <!-- <goods v-model="VShow"></goods> -->
    </div>
</template>
<script>
import goods from '../../components/Quotation/goods';
export default {
  components: {
    goods
  },
  data() {
    return {
      gold: '足金999',
      VShow: false
    };
  },
  methods: {
    handleAdd() {
      this.VShow = true;
    },
    handleShow() {
      this.VShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.containers {
  width: 100%;
  height: 100%;
  .cont {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  .img {
    width: 100%;
    display: flex;
    justify-content: space-around;
    img {
      width: 100%;
      height: 150px;
    }
  }

  .gold {
    height: 100%;
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    .add {
      background: rgb(24, 192, 235);
      width: 50%;
      text-align: center;
      line-height: 40px;
      border-radius: 20px 0 0 20px;
    }
    .buy {
      background: rgb(240, 205, 6);
      width: 50%;
      text-align: center;
      line-height: 40px;
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>
