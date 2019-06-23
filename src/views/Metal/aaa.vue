<template>
  <div class="counter-warp">
    <!-- 顶部轮播图 -->
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
      <swiper-item v-for="(item, index) in goodsImageMore" :key="index">
          <img :src="imgUrl + item" class="slide-image" mode="aspectFill"/>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <div class="goodsInfo" v-if="isShow==true">
      <div class="goodsName">{{goodsName}}</div>
      <div class="goodsPrice red"><span class="yen">¥</span>{{goodsPrice}}</div>
    </div>
    <!-- 商品规格 -->
    <div class="goodsSpecBox clearfix" @click="chooseGoodSpecs" v-if="isShow==true">
      <span>选择：</span>
      <span class="chosenGoodsSpec">{{chosenGoodsSpec}}</span>
      <span class="iconfont icon-liebiao_gengduo"></span>
    </div>
    <!-- 商品规格弹出框 -->
    <div class="specPop" v-if="specPopShow==true">
      <div class="specPopMask" @click="closeSpecPop"></div>
      <div class="specPopContent">
        <div class="specGoodHeader clearfix">
          <img class="goodImage" :src="imgUrl + goodsImage" />
          <ul class="specGoodInfo">
            <li class="goodsName">{{goodsName}}</li>
            <li class="goodsPrice red"><span class="yen">¥</span>{{chooseTotalPrice}}</li>
          </ul>
        </div>
        <div class="specChoose" v-for = "(specvalue_item,specvalue_index) in specvalue" :key="specvalue_index">
          <div class="specTitle">{{specvalue_item.specname}}</div>
          <ul class="specItemUl clearfix">
            <li v-for ="(oItem,index) in specvalue_item.item" :key="index">
              <input type="radio" class="specItemInput" 
                :value="oItem.spValueId" 
                :id="'chooseSpec'+oItem.spValueId" 
                :checked='oItem.isChecked'
                :disabled = 'oItem.isDisabled'
                v-model="pickedSpec">
              <label :for="'chooseSpec'+oItem.spValueId" 
                class="specItem" 
                :class="[oItem.isDisabled?'isDisabled':'',subIndex[specvalue_index] == index?'isChecked':'']"
                @click="chooseGoodSpec(oItem.spSortValueId,specvalue_index,$event,index)">
                {{oItem.spValueName}}
              </label>
            </li>
          </ul>
        </div>
        <div class="chooseGoodNum clearfix">
          <span class="chooseGoodNumTitle">数量：</span> 
          <div class="add_rdc_btn">
            <span class="btn_rdc iconfont icon-jianshao" @click="btn_rdc()">-</span>
            <input type="number" class="the_input" v-model="chooseGoodNum"/>
            <span class="btn_add iconfont icon-zengjia" @click="btn_add()">+</span>
          </div>
        </div>
        <button class="gradient popGotoCart">加入购物车</button>
      </div>
    </div>
    <!-- 商品详情介绍 -->
    <div class="goodDetailPic">
      <ul>
        <li v-for="(item,index) in goodsBody" :key="index">
          <img class="goodsBodyPic" :src="imgUrl + item.value"/>
        </li>
      </ul>
    </div>
    <div class="cartTabbar">
      <ul class="cartTabbar_ul">
        <li class="cartTabbar_li iconfont icon-kefu"></li>
        <li class="cartTabbar_li iconfont" :class="[ hasCollect ? 'icon-shoucang_dianliang red' : 'icon-shoucang_weidianliang' ]" @click="collectGood"></li>
      </ul>
      <button class="gotoCart gradient">加入购物车</button>
    </div>
    <layer ref="layer"></layer>
  </div>
</template>
<script>
export default {
   
    data () {
      return {
        isShow:false,//是否显示
        goodsImageMore: [],//滑动图片路径
        goodsImage:'',//商品图片
        goodsName:'', //商品名称
        goodsPrice:0,//商品价格
        chosenGoodsSpec:'型号颜色数量',//已选商品规格默认值
        specPopShow:false,//规格弹出框显示
        specvalue:[],//规格参数
        selectArr: [], //存放被选中的值
        subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
        allOpenSpces:null,//所有规格对应的价格和库存
        chooseGoodNum:1,//已选规格数量,默认为1
        chooseTotalPrice:0,//已选规格总价，默认为0
        goodsBody:[],//详情图片
        hasCollect:false,//是否收藏，默认为false
      }
    },
    mounted () {
      //获取商品信息和规格
      this.getGoodsinfodata();
      //获取商品详情
      this.getGoodsBodydata();
    },
    methods: {
      //获取商品信息和规格
      async getGoodsinfodata(){
        let goodsinfodata = await this.service.httpRequest({
          url:'/yggjshop-front/product/goodsinfodata',
          data:{goodsId:'290086556e7840668ee5e58d06d6b8fd'}
        });
        //是否显示
        this.isShow = true;
        //轮播图片路径
        this.goodsImageMore = goodsinfodata.goods.goodsImageMore.split(",").slice(0,-1);
        //商品图片
        this.goodsImage = goodsinfodata.goods.goodsImage;
        //商品名称
        this.goodsName = goodsinfodata.goods.goodsName;
        //商品价格
        this.goodsPrice = goodsinfodata.goods.goodsPrice;
        //规格名称
        this.specname = goodsinfodata.goodsSpecObj.specname;
        //规格参数对象改成数组，方便后续操作
        var option = [];
        for(var key in goodsinfodata.goodsSpecObj.specvalue){
          var optionObj = {};
          optionObj.specname = goodsinfodata.goodsSpecObj.specname[key];//规格名称
          optionObj.spSortValueId = key;
          optionObj.item = goodsinfodata.goodsSpecObj.specvalue[key];
          option.push(optionObj);
        }
        //规格参数
        this.specvalue = option;
        //所有规格对应的价格和库存
        this.allOpenSpces = JSON.parse(goodsinfodata.goodsSpecObj.allOpenSpces);
        //在所有规格对应的价格和库存中匹配
        this.matchingSpec();
        //计算已选商品总价
        this.totalPrice();
      },
      //获取商品详情
      async getGoodsBodydata(){
        let goodsBodydata = await this.service.httpRequest({
          url:'/yggjshop-front/product/goodsBodydata',
          data:{goodsId:'290086556e7840668ee5e58d06d6b8fd',pageNo: '1'}
        });
        //详情图片显示
        this.goodsBody = JSON.parse(goodsBodydata.attrList.mobileBody);
      },
      //点击商品规格出弹框
      chooseGoodSpecs(){
        //弹出框显示
        this.specPopShow = true;
      },
      //关闭弹框
      closeSpecPop(){
        //弹出框隐藏
        this.specPopShow = false;
      },
      //点击选择规格
      chooseGoodSpec: function (item,specvalue_index,event,index) {
        var self = this;
        if (self.selectArr[specvalue_index] != item) {
          self.selectArr[specvalue_index] = item;
          self.subIndex[specvalue_index] = index;
 
        } else {
          self.selectArr[specvalue_index] = "";
          self.subIndex[specvalue_index] = -1; //去掉选中的颜色 
        }
        self.matchingSpec();
      },
      //在所有规格对应的价格和库存中匹配
      matchingSpec(){
        var self = this;
        var option = self.specvalue;
        var result = [];  //定义数组存储被选中的值
        for (var i in option) {
            result[i] = self.selectArr[i] ? self.selectArr[i] : '';
        }
        for (var i in option) {
            var last = result[i];  //把选中的值存放到字符串last去
            for (var k in option[i].item) {
                result[i] = option[i].item[k].spSortValueId; //赋值，存在直接覆盖，不存在往里面添加spSortValueId值
                option[i].item[k].isDisabled = self.isMay(result); //在数据里面添加字段isDisabled来判断是否可以选择
            }
            result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
        }
        self.$forceUpdate(); //重绘
      },
      isMay: function (result) {
        for (var i in result) { 
          if (result[i] == '') {
            return false; //如果数组里有为空的值，那直接返回false
          }
          var allOpenSpcesKey = '';
          allOpenSpcesKey = result[i-1]+';'+result[i];
        }
        return this.allOpenSpces[allOpenSpcesKey].count == 0 ? true : false; //匹配选中的数据的库存，若不为空返回true反之返回false
      },
      //数量增加
      btn_add() {
        this.chooseGoodNum++;
        this.totalPrice();
      },
      //数量减少
      btn_rdc() {
        var the_num = this.chooseGoodNum;
        if (the_num > 0) {
          this.chooseGoodNum--;
        }
        this.totalPrice();
      },
      //已选规格总额计算
      totalPrice(){
        var chooseTotalPrice = 0;
        chooseTotalPrice = this.chooseGoodNum * this.goodsPrice;//累计总价
        this.chooseTotalPrice = chooseTotalPrice.toFixed(2);
      },
      //点击收藏
      collectGood(){
        this.getSaveFavorite();
      },
      //请求收藏接口
      async getSaveFavorite(){
        let saveFavorite = await this.service.httpRequest({
          url:'/yggjshop-front/Favorite/SaveFavorite',
          data:{goodsId:'290086556e7840668ee5e58d06d6b8fd','favType':'2','storeId':''}
        });
        if(saveFavorite.success){
          this.hasCollect =! this.hasCollect;
        }else{
          let layer = this.$refs.layer
          layer.open({
            type: 1,
            content: saveFavorite.msg,  // 内容
            time:3
          })
        }
      }
    }
  
}
</script>
<style lang="scss" scoped>
.counter-warp {
  text-align: center;
  padding-top: 0;
  background:#f5f5f5;
}
.swiper,.swiper .slide-image{
  width:100%;
  height:16rem;
}
.goodsInfo{
  background: #fff;
}
.goodsInfo .goodsName,.goodsInfo .goodsPrice{
  font-size:.8rem;
  padding:.5rem 1rem;
  text-align:left;
}
.goodsPrice .yen{
  font-size:.5rem;
}
.red{
  color:#ff3849;
}
.goodDetailPic .goodsBodyPic{
  width:100%;
  height:20rem;
}
.goodsSpecBox{
  font-size:.8rem;
  margin:1rem 0;
  padding:1rem;
  background: #fff;
  text-align: left;
}
.icon-liebiao_gengduo{
  float:right;
}
.specPop{
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index: 999;
}
.specPopMask{
  width:100%;
  height:100%;
  position: fixed;
  background: rgba(0,0,0,.5);
}
.specPopContent{
  position: fixed;
  height:70%;
  background: #fff;
  left: 0;
  right: 0;
  bottom: 0;
}
.clearfix::after{
  display: table;
  content: '';
  clear: both;
}
.specGoodHeader .goodImage{
  width:5rem;
  height:5rem;
  float:left;
  margin:.5rem;
}
.specGoodHeader .specGoodInfo{
  padding:1rem 0;
  float:left;
}
.specGoodHeader .goodsName,.specGoodHeader .goodsPrice{
  padding:.5rem;
}
.specPopContent .specChoose{
  padding:0 .5rem;
  text-align:left;
  font-size:.8rem;
}
.specPopContent .specTitle{
  padding: .5rem 0;
}
.specItemUl .specItem{
  float:left;
  padding:.25rem 1rem;
  background:#F7F7F7;
  border-radius:2rem;
  text-align:center;
  margin-right:1rem;
  border:2rpx solid #F7F7F7;
}
.specItemUl .specItem.isChecked{
  background: #fff;
  color:#ff3849;
  border:2rpx solid #ff3849;
}
.specItemUl .specItem.isDisabled{
  opacity: 0.4;
  color: #ccc;
  pointer-events: none;
}
.specItemUl .specItemInput{
  display: none;
}
.chooseGoodNum{
  padding:0 .5rem;
  text-align:left;
  font-size:.8rem;
  line-height:56px;
  margin-top:1rem;
  .chooseGoodNumTitle{
    float:left;
  }
  .add_rdc_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180px;
    float:right;
    .the_input {
      width: 120px;
      height: 56px;
      border: none;
      display: block;
      background: #f5f5f5;
      text-align: center;
      border-radius: 10px;
    }
    .btn_add, .btn_rdc {
      font-size: 56px;
      width: 94px;
      text-align: center;
      line-height: 56px;
    }
  }
}
.popGotoCart{
  position: fixed;
  width:100%;
  bottom: 0;
  height:3rem;
  line-height: 3rem;
  border-radius:0;
}
.gradient{
  background: -webkit-linear-gradient(left, #06FFF8 , #CEFF47); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(right, #06FFF8, #CEFF47); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(right, #06FFF8, #CEFF47); /* Firefox 3.6 - 15 */
	background: linear-gradient(to right, #06FFF8 , #CEFF47); /* 标准的语法 */
}
.cartTabbar {
  height: 3rem;
  width: 100%;
  border: 2px 0 0 0 solid black;
  bottom: 0;
  background: #fff;
  position: fixed;
  bottom: 0;
}
.cartTabbar_ul {
  float: left;
  width: 35%;
}
.cartTabbar_li {
  width:50%;
  text-align:center;
  margin:1rem 0 0 0;
  float:left;
  font-size:45px;
}
.gotoCart{
  float: right;
  width:65%;
  height:100%;
  border-radius:0;
  line-height:3rem;
}
</style>
