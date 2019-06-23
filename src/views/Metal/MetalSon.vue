<template>
  <div class="topBox">
    <!-- 头部 -->
    <div class="productBox">
      <ul>
        <li 
          v-for="(color,index) in colorLists"
          @click="handleClick(index)"
          :key="color.id">{{color.name}}</li>
      </ul>
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
    computed: {
      colorLists() {
        return this.shopLists.map((res) => {
          return {
            id: res.id,
            name: res.color,
            key: res.colorIndex
          }
        })
      },
      sizeLists() {
        return this.shopLists.map((res) => {
          return {

          }
        })
      }
    },
    mounted() {
      //fifter过滤,想拿到蓝色
      let arr = this.shopLists.filter((res)=>{
        if(res.colorIndex === 'blue'){
          return true
        }else{
          return false
        }
      })
      console.log(arr)
      // let arr = this.shopLists.filter((item)=> {
      //   if(item.colorIndex === 'blue') {
      //     return true
      //   }else {
      //     return false
      //   }
      // })
      // console.log(arr)
    
      let aa = []
      this.shopLists.forEach((res) => {
        if(res.colorIndex === 'blue') {
          aa.push(res)
        }
      })
      console.log(aa)
    },
    methods: {
      handleClick(key) {
        let item = this.shopLists[key];
        console.log(item)
      }
    }
     
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
