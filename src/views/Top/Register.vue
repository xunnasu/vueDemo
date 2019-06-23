<template>
  <div class="registerBox">
        <div class="navWrapper clearfloat">
            <div class="register clearfloat">
               
                <div class="register-title">
                    <img src="../../../public/imgs/logo.png">
                    <span class="register-find">找建材网</span>
                    <h3>请填写以下信息完成注册</h3>
                </div> 
            </div>  
        </div>
        <div class="registerInfo">
            <router-link to="/Register/registerPersion">注册个人信息</router-link>
            <router-link to="/Register/registerCompany">注册企业信息</router-link>
              
           
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">

// .registerBox{
//     width:100%;
//     background: rgb(115, 174, 223);
//     .navWrapper{
//         width:1200px;
//         margin:0 auto;
//         .register{
//             width: 200px;
//             height:100%;
//             line-height:120px;
//             float: left;
//             .register-icon{
//                 float: left;
//                 font-size:35px;
//                 display: block;
//              }
//             .register-title{
//                 margin-top:30px;
//                 margin-left:15px;
//                 float: left;
//                 font-size:25px;
//                 .register-find {
//                     font-size: 30px;
//                 }
//                span{
//                     font-size:12px;
//                     display: block;
//                     line-height: 35px;
//                 }
//             }
           
//         }
//         .writeInfo{
//             width:100%;
//             height:50px;
//             padding-top:50px;
//         }
//         .registerInfo{
//             width:200px;
//             height:100px;
//         } 
//     }
// }
</style>