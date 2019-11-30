<template>
  <div class="tipsBox" v-if="show"   @click.self="handleClick">
    <div class="containers" > 
    <div class="select" @click="handleSelectAdress">
       <p>北京市朝阳区麦子店西街</p>
       <i class="iconRight"></i>
    </div>
      <div class="footer">
        <span class="confirm" @click="confirm">确定</span>
        <span class="cancel" @click="cancel">取消</span>
      </div>
    </div>
    <select-address
      :showFlag='showFlag' 
      @on-show="handleShow"
    ></select-address>
  </div>
</template>
<script>
import SelectAddress from './SelectAddress';
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
  components: {
    SelectAddress
  },
  data() {
    return {
      value1: '',
      value: '',
      showFlag: false,
      options: [],
      subOptions: [],
      selectTity: {
        value: '',
        label: ''
      },
      baseUrl: process.env.BASE_URL
    };
  },
  async created() {
    let res = await this.$http.get(this.baseUrl + 'mock/datass.json');
    this.options = res.data;
  },
  methods: {
    //点击外部盒子并关闭
    handleClick() {
      this.$emit('on-show', false);
    },
    //显示底部弹窗
    handleSelectAdress() {
      this.showFlag = true;
    },
    //点击底部弹窗的遮罩并关闭
    handleShow() {
      this.showFlag = false;
    },
    //点击确定
    confirm() {
      this.$emit('on-show', false);
    },
    //点击取消
    cancel() {
      this.$emit('on-show', false);
    }
  }
};
</script>
<style lang="less" scoped>
.tipsBox {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  .containers {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 200px;
    background: #fff;
    transition: all 0.3s;
    padding: 20px;
    .select {
      margin-bottom: 18px;
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      p {
        width: 100%;
        color: #999999;
        font-size: 14px;
      }
      .iconRight {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-size: 100%;
        background: url('../../../public/imgs/more.png') no-repeat center center;
      }
    }
    .footer {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;
      .confirm {
        background: rgb(250, 213, 4);
        border: 1px solid #ccc;
        border-radius: 15%;
        text-align: center;
        height: 20px;
        line-height: 20px;
        width: 45px;
        height: 25px;
        font-size: 14px;
      }
      .cancel {
        //  background: rgb(250, 213, 4);
        border: 1px solid #ccc;
        font-size: 14px;
        border-radius: 15%;
        text-align: center;
        height: 20px;
        line-height: 20px;
        width: 45px;
        height: 25px;
      }
    }
  }
}
</style>