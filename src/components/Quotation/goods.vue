<template>
  <div class="containerBox"  v-if="show">
    <div class="container">
      <div class="top">
        <div class="img">
          <img src="../../assets/img/222.png" alt="">
        </div>
        <div class="right">
          <p>￥{{price}}</p>
          <p>{{stock}}件</p>
          <p>{{size}}</p>
        </div>
      </div>
      <div class="sure" @click="handleOk">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'show',
    event: 'on-show'
  },
  data() {
    return {
      price: '200',
      stock: '100',
      size: '请选择尺码'
    };
  },
  methods: {
    handleOk() {
      this.$emit('on-show', false);
    }
  }
};
</script>
<style lang="less">
.containerBox {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  .container {
    width: 100%;
    height: 270px;
    background: #fff;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      left: 10px;
      top: 10px;
      .right {
        margin-left: 20px;
        line-height: 25px;
      }
    }
    .sure {
      width: 100%;
      text-align: center;
      position: absolute;
      // left: 50;
      bottom: 5px;
      background: rgb(235, 129, 8);
      border-radius: 20px;
      line-height: 30px;
    }
  }
}
</style>