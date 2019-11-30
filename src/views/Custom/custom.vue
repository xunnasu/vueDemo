<template>
    <!-- 切记在子组件中，引用完 ， 要记得在这里使用  -->
    <div class="containers">
      <div class="cont">
        <div class="img">
          <img src="../../../public/imgs/banner.png" alt="">
        </div>
        <div class="gold">
          <p v-for="item in 20" :key="item">{{gold}}</p>
           <div>{{isName}}</div>
          <div>
            <!-- <p v-for="(item,index) in list" :key="item.id" :class="{'active':changeCount ===index  }" @click="handleClick" >{{item.name}}</p>
            <p v-for="(itemA,index) in listA"  :key="itemA.id"  v-show="index === changeCount" >{{itemA.name}}</p> -->
            <p v-for="(item,index) in list" :key="index.id" @click="handleClick(index)" :class="{'active':index === changeCount}">{{item.name}}</p>
           <P v-for="(itemA,index) in listA" :key="index.id" v-show="changeCount===index">{{itemA.name}}</P>
            <p></p>
          </div>
        </div>
       
        <div class="footer">
          <p class="add" @click="handleAdd">加入购物车</p>
          <p class="buy">立即购买</p>
        </div>
      </div>
      <!-- 弹出层，去掉父组件的model，就用这个→ → --> 
      <goods :show="VShow"  @on-show="handleShow"></goods> 
      <!-- <goods v-model="VShow"></goods> -->
    </div>
</template>
<script>
import goods from '../../components/Quotation/goods';
export default {
  components: {
    goods
  },
  data() {
    return {
      gold: '足金999',
      VShow: false,
      changeCount: -1,
      name: '小花花啊',
      list: [
        {
          name: 'vue',
          id: 1
        },
        {
          name: 'js',
          id: 2
        },
        {
          name: 'react',
          id: 3
        }
      ],
      listA: [
        {
          name: 'AAA',
          id: 4
        },
        {
          name: 'BBB',
          id: 5
        },
        {
          name: 'CCC',
          id: 6
        }
      ]
    };
  },
  computed: {
    isName() {
      let name = this.name.split('');
      name.splice(0, 2, '222');
      return name.join('');
    }
  },
  methods: {
    handleAdd() {
      this.VShow = true;
    },
    handleShow() {
      this.VShow = false;
    },
    // handleClick(index) {
    //   console.log(this.changeCount);
    //   this.changeCount = index;
    // }
    handleClick(index) {
      this.changeCount = index;
    }
  }
};
</script>
<style lang="less" scoped>
.containers {
  width: 100%;
  height: 100%;
  .cont {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  .img {
    width: 100%;
    display: flex;
    justify-content: space-around;
    img {
      width: 100%;
      height: 150px;
    }
  }

  .gold {
    height: 100%;
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    .add {
      background: rgb(24, 192, 235);
      width: 50%;
      text-align: center;
      line-height: 40px;
      border-radius: 20px 0 0 20px;
    }
    .buy {
      background: rgb(240, 205, 6);
      width: 50%;
      text-align: center;
      line-height: 40px;
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>
