<template>
  <div class="globalHeader-box">

    <div class="header-top-box">
      <div class="header-top clearfloat">
        <p class="back-home">
          返回找建材网首页
        </p>
        <div v-if="!isLogin" class="no-login">
          <span
            class="registerstyle">注册
          </span>&nbsp; | &nbsp;
          <sapn
            class="loginstyle">登录
          </sapn>
        </div>
      </div>
    </div>

    <div class="header-bottom-box">
      <div class="header-bottom">
        <div class="logopic">
          <img src="../../../public/imgs/logo.png">
        </div>
          <div class="searchbox clearfloat" >
            <div class="search">
              <i class="el-icon-search search-icon"/>
              <input
                placeholder="请输入内容"/>
            </div>
            <button
              class="search-btn"
              @click="seachMethod">搜 索</button>
          </div>
          <div
            to="/publish"
            class="freeInfo clearfloat"
          >
            <span class="freerelease">免费发布建材信息</span>
          </div>
          <!-- <div class="freeInfo clear">
            <router-link
              to="/publish"
              class="freerelease">免费发布建材信息</router-link>
          </div> -->
       
      </div>
    </div>
  </div>
</template>
<script>
export default {

  props:{
    value:{
      type:String,
      require:true,
    }
  },
  data() {
    return {
     
    }
  },
  methods:{
    two(){
        this.$emit("aa",4324234)
    },
    
  }
}
</script>
<style scoped lang="less">
  .globalHeader-box {
  width: 100%;
  background: #fff;
  .header-top-box {
    width: 100%;
    background: #fff;
    .header-top {
      width: 1200px;
      background: #fff;
      margin: 0 auto;
      height: 35px;
       line-height: 35px;
      font-size:12px;
      .back-home {
        height: 35px;
        display: inline-block;
        line-height: 35px;
        color: rgb(226, 184, 184);
      }
      .no-login {
        float: right;
        margin-right:40px;
        height: 35px;
        line-height: 35px;
        .loginstyle {
          color: #666666;
          height: 35px;
          line-height: 35px;
        }
        .registerstyle {
          color: #9B9B9B;
          height: 35px;
          line-height: 35px;
        }
      }
      
    }
  }
  .header-bottom-box {
    width: 100%;
    border-top: 1px solid #cecece;
    background: #fff;

    .header-bottom {
      background: #fff;
      width: 1200px;
      margin: 0 auto;
      height: 61px;
      margin-top: 24px;
     padding-left:89px;
      .logopic{
        float: left;
      }
      .searchbox {
        float: left;
        .search {
          display: block;
          float: left;
          border: 2px solid #456fcc;
          // padding: 10px 0 10px 0;
          color: #cecece;
          height: 40px;
          line-height: 40px;
          padding-left: 5px;
          margin-left: 100px;
          
          input {
            padding-left: 20px;
            width: 470px;
            height: 14px;
            font-size: 14px;
            border: none;
           
          }
          .search-icon {
            margin-left: 5px;
          }
        }
        .search-btn {
          display: block;
          border: 1px solid #456fcc;
          float: left;
          width: 90px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          color: #fff;
          background: #456fcc;
          font-size: 16px;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .title-words{
        font-size:20px;
        float: left;
        margin-left:20px;
        padding-left: 21px;
        height:35px;
        line-height:35px;
        position: relative;
        &::before{
          content: "";
          position:absolute;
          width:1px;
          border-left:3px solid #CECECE;
          top: 0;
          bottom: 0;
          margin: auto 0;
          left: 0;

        }
      }
      .freeInfo {
        height: 40px;
        background: #ff9840;
        margin-left: 40px;
        float: left;
        .freerelease {
          font-size: 15px;
          line-height: 40px;
          height: 14px;
          color: #fff;
          margin: 13px 20px;
        }
      }
    }
  }
}
</style>