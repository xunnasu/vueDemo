<template>
  <div class="containerBox"  v-if="show">
    <div class="container">
      <!-- 选中后的商品规格及属性 -->
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
      <!-- 商品筛选 -->
      <div class="goodsScreen" v-for="(item,index) in goodList" :key="index">
        <div class="name">
          <p>{{item.name}}</p>
        </div>
        <input 
          type="button"
          class="sku"
          @click="tabInfoChange(index,cindex,citem.id,$event)"
          v-for="(citem,cindex) in item.value"
          :class="{notClick:citem.notClick,active:citem.isActiveC}"
          :attr_id="citem.id"
          :value="citem.cname"
          :key="citem.id"
        >

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
      size: '请选择尺码',
      goodList: [
        {
          name: '颜色',
          isActive: true,
          value: [
            {
              id: '1',
              cname: '黄色',
              isActiveC: false,
              notClick: false
            },
            {
              id: '2',
              cname: '红色',
              isActiveC: false,
              notClick: false
            }
          ]
        },
        {
          name: '尺码',
          isActive: false,
          value: [
            {
              id: '3',
              cname: 'S',
              isActiveC: false,
              notClick: false
            },
            {
              id: '4',
              cname: 'M',
              isActiveC: false,
              notClick: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOk() {
      this.$emit('on-show', false);
    },
    tabInfoChange(index, cindex, cid, e) {
      /*所有规格*/
      let orderInfo = this.goodList;
      /*当前点击的规格的所有子属性内容*/
      let orderInfoChild = this.goodList[index].value;
      //选中自己，兄弟节点取消选中
      if (orderInfoChild[cindex].notClick !== true) {
        if (orderInfoChild[cindex].isActiveC == true) {
          orderInfoChild[cindex].isActiveC = false;
        } else {
          for (let i = 0; i < orderInfoChild.length; i++) {
            orderInfoChild[i].isActiveC = false;
          }
          orderInfoChild[cindex].isActiveC = true;
        }
      }
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
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 10px;
      margin-left: 10px;
      // position: absolute;
      // left: 10px;
      // top: 10px;
      .right {
        margin-left: 20px;
        line-height: 25px;
      }
    }
    .goodsScreen {
      margin-left: 18px;
      .name {
        margin-left: 5px;
        margin-top: 5px;
      }
      input {
        background: none;
        border: none;
        padding: 2px 10px;
        margin: 5px;
        border-radius: 5px;
        background: rgb(233, 232, 232);
      }
      .notClick {
        background: #999999;
        color: rgb(226, 17, 17);
      }
      .active {
        background: rgba(217, 218, 214, 0.3);
        color: rgb(241, 112, 6);
        border: 1px solid rgb(241, 112, 6);
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