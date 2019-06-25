<template>
  <div class="containerBox"  v-if="show">
    <div class="container">
      <!-- 选中后的商品规格及属性 -->
      <div class="top" >
        <div class="img">
          <img src="../../assets/img/222.png" alt="">
        </div>
        <div class="right">
          <p>￥{{nowPrice}}</p>
          <p>库存{{stock}}件</p>
          <p v-if="isSelect" >{{size}}</p>
          <p v-else>已选{{select}}</p>
        </div>
      </div>
      <!-- 商品筛选 -->
      <div class="goodsScreen" v-for="(item,index) in keys" :key="index">
        <div class="name">
          <p>{{item.name}}</p>
        </div>
        <input 
          type="button"
          @click="tabInfoChange(index,cindex,citem.id,$event)"
          v-for="(citem,cindex) in item.value"
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
  model: {
    prop: 'show',
    event: 'on-show'
  },
  data() {
    return {
      price: '200',
      stock: '100',
      size: '请选择颜色和尺码',
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
              notClick: false
            },
            {
              id: '2',
              cname: '红色',
              stock: '200',
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
      // /*所有规格*/
      // let orderInfo = this.keys;
      // /*当前点击的规格的所有子属性内容*/
      // let orderInfoChild = this.keys[index].value;
      // //选中自己，兄弟节点取消选中
      // if (orderInfoChild[cindex].notClick !== true) {
      //   if (orderInfoChild[cindex].isActiveC == true) {
      //     orderInfoChild[cindex].isActiveC = false;
      //   } else {
      //     orderInfoChild.forEach(item => {
      //       item.isActiveC = false;
      //     });
      //     orderInfoChild[cindex].isActiveC = true;
      //   }
      // }

      //  console.log('index :', index);
      // console.log('cindex :', cindex);
      // this.keys[index].value.forEach(ele => {
      //   ele.notClick = false;
      // });
      // this.keys[index].value[cindex].notClick = true;
      // this.size = ""
      // for(let i = 0; i < this.keys.length; i++) {
      //   let status = false
      //   for(let j = 0; j < this.keys[i].value.length; j++) {
      //     if(this.keys[i].value[j].notClick && !status) {
      //       console.log('已选:'+this.keys[i].name+'为'+this.keys[i].value[j].cname)
      //       this.size = this.size+'已选:'+this.keys[i].name+'为'+this.keys[i].value[j].cname
      //       status = true;
      //     }
      //   }
      //   if(!status) {
      //     console.log('未选' + this.keys[i].name)
      //     this.size = this.size + '未选' + this.keys[i].name
      //   }
      //   status = false;

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
            this.size = this.size + '已选:' + this.keys[i].value[j].cname;
            status = true;
          }
        }
        if (!status) {
          this.size = this.size + '请选择' + this.keys[i].name;
        }
        status = false;
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
        .changeStatus {
          color: rgb(207, 28, 28);
        }
        .clickStatus {
          color: rgb(10, 120, 223);
        }
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
        background: #e7e4e4;
        color: rgb(31, 28, 28);
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