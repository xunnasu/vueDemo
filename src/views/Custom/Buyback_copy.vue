<template>
  <div class="container">
    <div class="container-12">
      <div class="tips">
        <p class="count"> 您已累计购回黄金:{{gold}}g,(共{{num}}笔)，收款{{money}}元</p>
      </div>
      <div class="list">
        <buy-list
        v-for="(item,index) in getList" 
        :key="index"
        :image=item.image
        :title=item.title
        :specs=item.specs
        :time=item.time
        :detail=item.detail
        ></buy-list>
      </div>
      <div class="btnQ"> 
      <button class="aaa">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import BuyList from '../../components/Buyback/BuyList';

export default {
  components: {
    BuyList
  },
  data() {
    return {
      gold: '202.33',
      num: '5',
      money: '20255.31',
      getList: [
        {
          image: 'imgs/111.png',
          title: '订单审核中',
          specs: '订单规格',
          time: '2019-5-28 16:44',
          detail: '查看详情'
        },
        {
          image: 'imgs/444.png',
          title: '订单审核中11',
          specs: '订单规格11',
          time: '2019-5-29 16:44',
          detail: '查看详情'
        },
        {
          image: 'imgs/111.png',
          title: '订单审核中',
          specs: '订单规格',
          time: '2019-5-28 16:44',
          detail: '查看详情'
        },
        {
          image: 'imgs/444.png',
          title: '订单审核中11',
          specs: '订单规格11',
          time: '2019-5-29 16:44',
          detail: '查看详情'
        },
        {
          image: 'imgs/111.png',
          title: '订单审核中',
          specs: '订单规格',
          time: '2019-5-28 16:44',
          detail: '查看详情'
        },
        {
          image: 'imgs/111.png',
          title: '订单审核中',
          specs: '订单规格',
          time: '2019-5-28 16:44',
          detail: '查看详情'
        }
      ]
    };
  },
  created() {
    var list = [
      {
        age: 30,
        name: 'a'
      },
      {
        age: 90,
        name: 'c'
      },
      {
        age: 20,
        name: 'b'
      },
      {
        age: 88,
        name: 'd'
      }
    ];
    // var arr2 = list.map(item => {
    // return item;
    // });
    // // console.log(arr2);
    // function arr3(prop) {
    // return function(a, b) {
    // var value1 = a[prop];
    // var value2 = b[prop];
    // return value1 - value2;
    // };
    // }
    var arr2 = list.map(item => {
      return item;
    });
    console.log(arr2);
    function arr3(prop) {
      return function(a, b) {
        var value1 = a[prop];
        var value2 = b[prop];
        return value1 - value2;
      };
    }
    console.log(arr2.sort(arr3('age')));
  }
};
</script>
<style lang="less" scoped>
.container {
width: 100%;
height: 100%;
.container-12 {
width: 100%;
height: 100%;
display: flex;
justify-content: space-around;
flex-direction: column;
}
.tips {
background: #fff;
margin-bottom: 10px;
.count {
margin: 10px;
