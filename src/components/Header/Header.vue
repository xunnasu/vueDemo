<template>
<div>
    <div class="tipsBox" v-if="isShow">
      <div class="container">
          <div class="tips">提示</div>
        <div class="logout" >您的账号在其他终端登录，请重新登录</div>
        <div class="sureBox" >
          <div class="sure" @click="handleKnow">确定</div>
        </div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{title}}</li>
        <li>{{amount}}</li>
        <li>{{date}}</li>
      </ul>
     <p @click="tips">点击</p>
    
    </div>
</div>

</template>
<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  model: {
    prop: 'show',
    event: 'on-show'
  },
  methods: {
    //确定
    handleKnow() {
      this.isShow = false;
      this.$emit('on-show', false);
      // this.$router.push({
      //     path: '/tdlogin'
      //   });
    },
    tips() {
      this.$emit('goClick');
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tipsBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  .container {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    width: 306px;
    // height: 134px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    // position: relative;
    .tips {
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #333;
      text-align: center;
      line-height: 15px;
      margin-top: 22px;
    }
    .icon-close {
      width: 28px;
      height: 28px;
      position: absolute;
      top: 10px;
      right: 30px;
      img {
        width: 100%;
      }
    }
    .logout {
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      color: #333333;
      text-align: center;
      line-height: 25px;
      width: 275px;
      margin: 17px 30px 22px 30px;
    }
    .sureBox {
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #007aff;
      border-top: 0.5px solid #f2f2f2;
      font-size: 16px;
      .sure {
        text-align: center;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-family: PingFangSC-Medium;
        color: #007aff;

        // border-top: 1px solid #e9e9e9;
      }
    }
  }
}
</style>
