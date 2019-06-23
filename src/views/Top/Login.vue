<template>
    <div class="loginBox">
        <div class="login-item">
            <div class="login-top">
                <div class="login-top-item">
                     <p class="welcome-login">欢迎登录</p>
                     <div class="login-pic">
                        <img src="../../../public/imgs/logo.png"/>
                        <el-input v-model="input" placeholder="请输入手机号"></el-input>
                        <el-input v-model="input" placeholder="请输入密码"></el-input>
                        <el-input v-model="input" placeholder="请输入验证码"></el-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
    .loginBox{
        width:100%;
        .login-item {
            width:1200;
            margin:0 auto;
            background:url(../../../public/imgs/logo.png)no-repeat;
            height:700px;
            .login-top{
                width:100%;
                position: relative;
                .login-top-item{
                    width:418px;
                    height:446px;
                    margin:0 auto;
                    padding:20px 26px 30px 26px;
                    position: absolute;
                    top:120px;
                    bottom:120px;
                    left:500px;
                    right:500px;
                    background: rgb(15, 209, 235);
                    .welcome-login{
                        margin-left:350px;
                        margin-bottom:24px;
                    }
                    .login-pic{
                        width:100%;
                        img{
                            width:179px;
                            margin:0 120px;
                        }
                    }
                }  
            }
        }
    }
</style>

