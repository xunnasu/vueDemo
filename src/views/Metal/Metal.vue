<template>
   <div>
    金属{{nav}}
      <!-- <router-link to="/MetalFather">练习商品属性</router-link> -->
       <router-link to="/practiceGoods" class="practice">练习商品属性</router-link>
      <router-link to="/Custom" class="newComponnets">各种点击切换</router-link>
       <router-link to="/MetalSis" class="goods">类似黄金td商品属性</router-link>
       <router-link to="/Buyback" class="buyback">回购</router-link>

    <div v-for="item in addressLists" :key="item.id">
      <div v-for="a in item.address" :key="a">{{a}}</div>
    </div>
    <div>
      <!-- <p>起初:{{massage}}</p> -->
      <!-- <p>现在:{{nowMassage}}</p> -->
      <!-- <p>reversed massage:"{{nowMassage()}}"</p> -->
      <h3>{{fullName}}</h3>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['nav'],
  data() {
    return {
      addressLists: [],
      // massage:"abcdabcaadasssssd",
      // massage:["orange","2018","bear"],
      // massage:"18511039169",
      // massage:['a','b','c'],
      massage: [1, 2, 3, 4, 5, 6, 7, 8],
      baseUrl: process.env.BASE_URL,
      firstName: 'su',
      lastName: 'na',
      fullName: 'nana'
    };
  },
  created() {
    this.getAddressList();
    // console.log(this.massage.splice(3,3))
    // console.log(this.massage.join(''))
    // function massage(a,b){
    //     return a-b //这是升序  b-a 是降序
    // }
    // console.log(this.massage.sort(massage))
    // console.log(this.massage .indexOf("."))
    this.massage.forEach((num, index) => {
      return (this.massage[index] = num * 2);
    });
  },
  methods: {
    getAddressList() {
      axios.get(this.baseUrl + 'mock/data.json').then(res => {
        // console.log(res);
        this.addressLists = res.data.addressLists;
      });
    },
    nowMassage() {
      // return this.massage.indexOf("d",5)
      // return this.massage.split('').reverse().join('')
      // return this.massage.replace(/li[0-9]?qing/g, str => str.length < 7 ? "testA" : "testB")
      // return this.massage.substr(3,4)
      // console.log(this.massage.splice(3,6))
      // this.massage.forEach((num,index)=>{
      //   return this.massage[index] = num *2
      // })
      // console.log( this.massage[index] )
    }
  },
  //  computed:{ //计算属性
  //   // nowMassage(){
  //   //  return this.massage.split('').reverse().join('')
  //   // }

  // },
  watch: {
    firstName() {
      this.fullName = this.lastName;
    },
    lastName() {
      this.fullName = this.firstName;
    }
  }
};
</script>
<style>
.practice {
  font-size: 25px;
  color: rgb(11, 160, 230);
}
.newComponnets {
  font-size: 25px;
  color: red;
  margin: 0 20px;
}
.goods {
  font-size: 30px;
  color: rgb(45, 26, 218);
}
.buyback{
  font-size: 30px;
  color: rgb(95, 219, 12);
}
</style>
