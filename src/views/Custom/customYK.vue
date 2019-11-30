<template>
  <div class="containeryk">
    <div class="mainBox">
      <!-- top -->
      <div class="top">
        <p>{{person}}</p>
        <p>{{tips}}</p>
        <p>{{appNum}}</p>
      </div>
      <!-- middle -->
      <div class="middleBox">
        <div class="middle">
          <img src="../../assets/img/banner.png" alt="">
        </div>
        <div class="middleIcon">
          <img src="../../assets/img/icon1.png" alt="">
          <img src="../../assets/img/icon2.png" alt="">
          <img src="../../assets/img/icon3.png" alt="">
        </div>
        <div v-for="item in 5" :key="item">{{box}}</div>
        <div class="middleAction"></div>
        <div class="middleAction2" :class="{'active':selected}" @click="handleClick"></div>
        <div class="middleAction3"></div>
      </div>
      <!-- footer -->
      <div class="footer">
        <p class="sure">确认</p>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  // props:['appNum'],
  data(){
    return{
      person:'请确保**晓花本人操作',
      tips:"请将正脸对准框内,保持光线充足",
      box:"hahahhahaha",
      selected:false,
      appNum:this.$route.params.appNum,
    }
  },
  created(){
    console.log('this.$route.params.appNum, :', this.$route.params.appNum,);
    // this.appNum = sessionStorage.getItem('appNum')
  },
  methods:{
    handleClick(){
      this.selected = !this.selected
    }
  }
}
</script>
<style lang="less" scoped>
  .containeryk{
    background:#fff;
    height:100%;
    width:100%;
    .mainBox{
      // padding-top:15px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
      .top{
        // display:flex;
        // justify-content:center;
        // align-items: center;
        // flex-direction: column;
        text-align: center;
      }
      .middleBox{
        height:100%;
        flex:1;
        overflow: auto;
        display: flex;
        flex-direction:column;
        .middle{
          width:375px;
          height:200px;
        img{
           width:100%;
        }
      }
        .middleIcon{
          display:flex;
          justify-content:space-around;
          align-items: center;
          flex-direction: row;
        }
        .middleAction{
          width:200px;
          height: 100px;
          border:4px solid #ccc;
          background:url('../../assets/img/null_address.png')no-repeat;
          background-origin:content-box;
          background-size:contain;
          background-position:center;
        }
        .middleAction2{
          // width: 30px;
          // box-sizing: border-box;
          // border: 4px solid #f96750;
          // height: 30px;
          // margin: 20px;
          // color: #f96750;
          // padding: 2px;
          // -webkit-transition:width 2s;
          // background-clip: content-box;
          // transition: 0.3s;
          // cursor: pointer;
          // border-radius: 50%; 
          // transform:skew(5deg,8deg);
          // width:100px;
          // height:100px;
          // background:rgb(235, 9, 9);
          // animation:action 5s;
          // -webkit-animation:action 5s;
          
        }
        .middleAction3{
          width:100px;
          height:100px;
          background:red;
          animation:myfirst 5s;
          -moz-animation:myfirst 5s; /* Firefox */
          -webkit-animation:myfirst 5s; /* Safari and Chrome */
          -o-animation:myfirst 5s; /* Opera */
        }
       @keyframes myfirst
        {
          0%   {background: red; left:0px; top:0px;}
          25%  {background: yellow; left:200px; top:0px;}
          50%  {background: blue; left:200px; top:200px;}
          75%  {background: green; left:0px; top:200px;}
          100% {background: red; left:0px; top:0px;}
        }
        @-webkit-keyframes myfirst /* Safari 和 Chrome */
        {
          0%   {background: red; left:0px; top:0px;}
          25%  {background: yellow; left:200px; top:0px;}
          50%  {background: blue; left:200px; top:200px;}
          75%  {background: green; left:0px; top:200px;}
          100% {background: red; left:0px; top:0px;}
        }
        // .middleAction2:hover{
        //   width:300px;
        // }
        .active{
          background-color: currentColor;
        }
      }
      .footer{
        display:flex;
        justify-content:space-around;
        align-items: center;
        .sure{
          width:100%;
          background:rgb(47, 89, 228);
          text-align: center;
          color:#fff;
          border-radius:45px;
        }
      }
    }
  }
</style>