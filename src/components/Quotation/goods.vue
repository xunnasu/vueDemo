<template>
  <div class="containerBox"  v-if="show">
    <div class="container">
      <!-- 选中后的商品规格及属性 -->
      <div class="top" >
        <div class="img">
          <!-- <img src="../../assets/img/222.png" alt=""> -->
          <img :src="`${baseUrl}${image}`">
        </div>
        <div class="right">
          <p>￥{{nowPrice}}</p>
          <p>库存{{stock}}件</p>
          <p v-if="isSelect">{{size}}</p>
          
        </div>
      </div>
      <!-- 商品筛选 -->
      <div class="goodsScreen" v-for="(item,index) in keys" :key="index" >
        <div class="name">
          <p>{{item.name}}</p>
        </div>
        <input 
          type="button"
          v-for="(citem,cindex) in item.value"
          @click="tabInfoChange(index,cindex,citem.id,$event)"
          :class="[citem.notClick?'active':'notClick']"
          :attr_id="citem.id"
          :value="citem.cname"
          :key="citem.id">
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
  // model: {
  //   prop: 'show',
  //   event: 'on-show'
  // },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      price: '200',
      stock: '100',
      size: '请选择颜色和尺码',
      image: 'imgs/111.png',
      isSelect: true,
      selectResult: [], //定义数组存储被选中的值,
      // selectArr: [], //存放被选中的值
      keys: [
        {
          name: '颜色',
          isActive: true,
          value: [
            {
              id: '1',
              cname: '黄色',
              stock: '100',
              image: 'imgs/111.png',
              notClick: false
            },
            {
              id: '2',
              cname: '红色',
              stock: '200',
              image: 'imgs/222.png',
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
              stock: '100',
              notClick: false
            },
            {
              id: '4',
              cname: 'M',
              stock: '200',
              notClick: false
            }
          ]
        }
      ],
      data: {
        '24;12;31': {
          price: 366.0,
          count: 46
        },
        '25;12;32': {
          price: 406,
          count: 66
        }
      },
      skuResult: {},
      nowPrice: '180'
    };
  },
  methods: {
    handleOk() {
      this.$emit('on-show', false);
    },
    tabInfoChange(index, cindex, cid, e) {
      console.log('index :', index);
      console.log('cindex :', cindex);

      this.keys[index].value.forEach(ele => {
        ele.notClick = false;
      });
      this.keys[index].value[cindex].notClick = true;
      this.size = '';
      for (let i = 0; i < this.keys.length; i++) {
        let status = false;
        for (let j = 0; j < this.keys[i].value.length; j++) {
          if (this.keys[i].value[j].notClick && !status) {
            console.log(
              '已选:' + this.keys[i].name + '为' + this.keys[i].value[j].cname
            );
            this.size =
              this.size +
              '已选:' +
              this.keys[i].name +
              '为' +
              this.keys[i].value[j].cname;
            status = true;
          }
        }
        if (!status) {
          console.log('未选' + this.keys[i].name);
          this.size = this.size + '未选' + this.keys[i].name;
        }
        status = false;
      }
      // /*所有规格*/
      // let orderInfo = this.keys;
      // /*当前点击的规格的所有子属性内容*/
      // let orderInfoChild = this.keys[index].value;
      // //选中自己，兄弟节点取消选中
      // if (orderInfoChild[cindex].notClick !== true) {
      //   if (orderInfoChild[cindex].notClick == true) {
      //     orderInfoChild[cindex].notClick = false;
      //   } else {
      //     //  for (let i = 0; i < orderInfoChild.length; i++) {
      //     //   orderInfoChild[i].isActiveC = false;
      //     // }
      //     orderInfoChild.forEach(item => {
      //       item.notClick = false;
      //     });
      //     orderInfoChild[cindex].notClick = true;
      //   }
      // }
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
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 10px;
      margin-left: 10px;
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
        background: rgb(235, 232, 232);
        color: rgb(226, 17, 17);
      }
      .active {
        background: #fff;
        color: rgb(241, 112, 6);
        border: 1px solid rgb(241, 112, 6);
      }
    }
    .sure {
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 5px;
      background: rgb(235, 129, 8);
      border-radius: 20px;
      line-height: 30px;
    }
  }
}
</style>