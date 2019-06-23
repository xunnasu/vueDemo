<template>
<!-- import func from './vue-temp/vue-editor-bridge'; -->
  <div class="addressManageBox">
    <div class="addressManage">
      <div class="userName">
        <span class="uesrname">{{userName}}</span>
        <span class="userPhone">{{userPhone}}</span>
      </div>
      <div class="userAdress" style="">
        <ul class="addressInfo clearfloat"  v-for="list in addressList" :key="list.id">
          <li  class="addressItem" v-for="all in list.address" :key="all">{{all}}</li>
        </ul>
      </div>
      <div style="background:red;width: 100%;height: 20px" class="clearfloat">
        <div style="margin-bottom:10px;width: 100%;height: 10px;background: blue">121212</div>
        <div style="margin-top:10px;width: 100%;height: 10px">3433434</div>
      </div>
      <div class="footer">
        <P class="addId">添加地址</P>
      </div>
    </div>
   
  </div>
</template> 
<script>
export default {
  props: {
    massage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userName: '鹏润',
      userPhone: '17704335023',
      addressList: [
        {
          address: ['北京市', '朝阳区', '霄云路'],
          id: 1,
          default: true
        },
        {
          address: ['北京市', '海淀区', '清华路'],
          id: 2,
          default: false
        }
      ]
    };
  },
  created() {},
  mounted() {
    function a(type) {
      if (type === 'add') {
        return function(value) {
          return value + value;
        };
      } else {
        return function(value) {
          return value - value;
        };
      }
    }
    var b = a('add');
    b(10);
  },
  methods: {
    //获取姓名，电话
  }
};
</script>
<style lang="less">
.addressManageBox {
  width: 100%;
  height: 100%;
  .addressManage {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #ccc;
    .userName {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #333;
      > span {
        display: inline;
      }
      .uesrname {
        margin-left: 20px;
      }
      .userPhone {
        margin-left: 15px;
      }
    }
    .userAdress {
      flex: 1;
      width: 100%;
      background: #fff;
      overflow: auto;
      color: #656565;
      font-size: 14px;
      .addressInfo {
        width: 100%;
        .addressItem {
          float: left;
          font-size: 16px;
          color: #666;
          margin: 5px 10px;
          text-align: justify;
          // line-height:34px;
          // height:34px;
          letter-spacing: 0.38px;
          text-align: center;
        }
      }
    }
    .footer {
      height: 44px;
      line-height: 44px;
      text-align: center;
      width: 100%;
      background: rgb(28, 212, 245);
      border-top: 1px solid #d9d9d9;
      .addId {
        display: flex;
        justify-content: center;
        line-height: 43px;
      }
    }
  }
}
</style>
