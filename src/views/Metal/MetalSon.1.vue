<template>
  <div class="topBox">
    <!-- 头部 -->
    <div class="productBox">
          <div class="productContent">
            <div class="pictures">{{imgUrl}}</div>
            <div class="priceItem">{{price}}</div>
            <div class="product-delcom" v-for="(productItem,n) in specifications" :key="productItem.id">
              <div class="productItem">{{productItem.name}}</div>
              <span class="choseDefault">{{choseDefault}}</span>
              <span class="iconfont icon-liebiao_gengduo"></span>
              <ul class="product-list clearfix">
                <li v-for="(oItem,index) in productItem.item" 
                  :key="index" 
                  @click="commodityAttribute(oItem,n,$event,index)" 
                  :class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem}}
                </li>
              </ul>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  props:{
    value:{
      type:String,
      required:true
    }
  },
    data () {
      return {
        baseUrl: process.env.BASE_URL,
        differenceInfo:[],

        imgUrl:"",
        price:"",
        choseDefault:"",//默认属性是选第一个
        specifications:[
          { //渲染字段
            "name": "配链",
            "item": []
          },
          { 
            "name": "主石颜色",
            "item": []
          },
        ],
        result:[], //定义数组存储被选中的值
        selectArr: [], //存放被选中的值
        shopItemInfo: {}, //存放要和选中的值进行匹配的数据
        subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
        shopLists: [
          {
            id: 1,
            color: '红色',
            colorIndex: 'red',
            style: "无配链",
            styleIndex: 1,
            num: 10,
            have: true,
          },
          {
            id: 2,
            color: '红色',
            colorIndex: 'red',
            style: "有配链",
            styleIndex: 2,
            num: 0,
            have: false,
          },
           {
            id: 3,
            color: '蓝色',
            colorIndex: 'blue',
            style: "无配链",
            styleIndex: 1,
            num: 102,
            have: true,
          },
          {
            id: 4,
            color: '蓝色',
            colorIndex: 'blue',
            style: "有配链",
            styleIndex: 2,
            num: 100,
            have: true,
          }
        ]
      }
    },
    mounted() {
     axios.get(this.baseUrl+"mock/data.json").then((res)=>{
        console.log(res)
        let data = res.data.differenceInfo
        if(res.status=== 200){
          this.specifications[0].item = data.map(item => item.difference)
          this.specifications[1].item = data.map(item => item.color)
          this.imgUrl = data[0].imgUrl
          this.price= data[0].price
          // this.specifications.forEach((res)=>{
          //   if(res.id === id){

          //   }
          // })

        }
      })
       this.checkItem();
      },
      // let list = this.simulatedDATA.differenceInfo
      // for (let i in list) {
      //   this.shopItemInfo[list[i].difference] = list[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
      // }
      // this.checkItem(); 
      // },
    methods: {
      commodityAttribute (item, n, event, index) {
          if (this.selectArr[n] != item) {
              this.selectArr[n] = item;
              this.subIndex[n] = index;
          } else {
              this.selectArr[n] = "";
              this.subIndex[n] = -1; //去掉选中的颜色 
          }
          this.checkItem();
    },
    checkItem () {
      // var self = this;
      let option = this.specifications;
      // var result = [];  //定义数组存储被选中的值
       for (let i in option) {
        this.result[i] = this.selectArr[i] ? this.selectArr[i] : '';
       }
      for (let i in option) {
        let last = this.result[i];  //把选中的值存放到字符串last去
        for (let k in option[i].item) {
          this.result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].item[k].isShow = this.isMay(this.result); //在数据里面添加字段isShow来判断是否可以选择
        }
       this.result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
      }
      this.$forceUpdate(); //重绘
    },
    isMay (result) {
      for (var i in result) { 
          if (result[i] == '') {
            return true; //如果数组里有为空的值，那直接返回true
          }
      }
      return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    }
  },
}
</script>
<style lang="less">
  .topBox{
    min-height: 100%;
    width: 100%;
    position: relative;
    background: #fff;
    //顶部
       .productBox {
        width: 100%;
        padding: 29px 33px;
        .product-delcom { 
          .productItem,.product-list{
            // display: inline-block;
            display: flex;
            align-items: flex-start;
            font-family: PingFangSC-Regular;
            font-size:28px;
            color: #666;
            text-align: center;
            letter-spacing: 0;
            margin: 14px 0;
            line-height: 50px; 
          }
          .pictures{
            width:76px;
            height:75px;
            img{
              width:100%;
            }
          }
          .product-list li {
            width: 120px;
            height: 60px;
            line-height: 60px;
            border-radius:10px;
            border:1px solid #000;
            color:#000;
            display: inline-block;
            text-align: center;
            margin-right:20px;
          }
          .product-list li.productActive {
            background: #fff;
            border:1px solid #dab45f;
            color: #dab45f;
          }
          .product-list li.noneActive {
            background-color: #ccc;
            border:none;
            opacity: 0.4;
            color: #333;
            pointer-events: none;
            position: relative;
            
            &::before{
              content:"";
              position: absolute;
              top:30px;
              left:0;
              width:100%;
              border-bottom:1px solid ;
            }
          }
        }
      }
  }

</style>
