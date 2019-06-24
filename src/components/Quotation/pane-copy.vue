<template>
  <div class="topBox">
    <!-- 头部 -->
    <div class="productBox">
      <div class="productContent">
        <div class="product-delcom" v-for="(ProductItem,n) in simulatedDATA.specifications" :key="ProductItem.id">
            <div class="productItem">{{ProductItem.name}}</div>
            <ul class="product-list clearfix">
              <li v-for="(oItem,index) in ProductItem.item" 
                :key="index" 
                @click="specificationBtn(oItem.name,n,$event,index)" 
                :class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem.name}}
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      simulatedDATA: {
        //模拟后台返回的数据 多规格
        differenceInfo: [
          {
            //所有的规格可能情况都在这个数组里
            id: '19',
            price: '200.00',
            stock: '19',
            difference: '无配链,蓝色'
          },
          {
            id: '20',
            price: '300.00',
            stock: '29',
            difference: '编制配链,蓝色'
          },
          {
            id: '21',
            price: '300.00',
            stock: '10',
            difference: '无配链,黄色'
          },
          {
            id: '22',
            price: '300.00',
            stock: '0',
            difference: '编制配链,黄色'
          }
        ],
        specifications: [
          {
            //这里是要被渲染字段
            name: '配链',
            item: [
              {
                name: '无配链'
              },
              {
                name: '编制配链'
              }
            ]
          },
          {
            name: '主石颜色',
            item: [
              {
                name: '蓝色'
              },
              {
                name: '黄色'
              }
            ]
          }
        ]
      },
      result: [], //定义数组存储被选中的值
      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [] //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
    };
  },
  mounted() {
    let list = this.simulatedDATA.differenceInfo;
    for (let i in list) {
      this.shopItemInfo[list[i].difference] = list[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
    }
    this.checkItem();
  },
  methods: {
    specificationBtn(item, n, event, index) {
      if (this.selectArr[n] != item) {
        this.selectArr[n] = item;
        this.subIndex[n] = index;
      } else {
        this.selectArr[n] = '';
        this.subIndex[n] = -1; //去掉选中的颜色
      }
      this.checkItem();
    },
    checkItem() {
      // var self = this;
      let option = this.simulatedDATA.specifications;
      // var result = [];  //定义数组存储被选中的值
      for (let i in option) {
        this.result[i] = this.selectArr[i] ? this.selectArr[i] : '';
      }
      for (let i in option) {
        let last = this.result[i]; //把选中的值存放到字符串last去
        for (let k in option[i].item) {
          this.result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].item[k].isShow = this.isMay(this.result); //在数据里面添加字段isShow来判断是否可以选择
        }
        this.result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
      }
      this.$forceUpdate(); //重绘
    },
    isMay(result) {
      for (var i in result) {
        if (result[i] == '') {
          return true; //如果数组里有为空的值，那直接返回true
        }
      }
      return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    }
  }
};
</script>
<style lang="less">
.topBox {
  min-height: 100%;
  width: 100%;
  position: relative;
  background: #fff;
  //顶部
  .productBox {
    width: 100%;
    padding: 29px 33px;
    .product-delcom {
      .productItem,
      .product-list {
        // display: inline-block;
        display: flex;
        align-items: flex-start;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #666;
        text-align: center;
        letter-spacing: 0;
        margin: 14px 0;
        line-height: 50px;
      }
      .product-list li {
        width: 120px;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        border: 1px solid #000;
        color: #000;
        display: inline-block;
        text-align: center;
        margin-right: 20px;
      }
      .product-list li.productActive {
        background: #fff;
        border: 1px solid #dab45f;
        color: #dab45f;
      }
      .product-list li.noneActive {
        background-color: #ccc;
        border: none;
        opacity: 0.4;
        color: #333;
        pointer-events: none;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 30px;
          left: 0;
          width: 100%;
          border-bottom: 1px solid;
        }
      }
    }
  }
}
</style>
