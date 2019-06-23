<template>
    <div class="navBox">
        <div class="navWrapper clearfloat">
            <div class="logo clearfloat">
                <!-- <div class="logo-icon ">
                    <i class="el-icon-picture"></i>
                </div>
                <div class="logo-title">
                    <span class="logo-zh">找建材网</span>
                    <span>www.zhaojiancai.com</span>
                </div>  -->
            </div>
             <div class="searchbox clearfloat">
                <div  class="search">
                    <i class="el-icon-search"></i>
                    <input type="text" placeholder="请输入搜索内容">
                </div>
                <button class="search-btn">搜 索</button>
            </div>
             <div class="freeInfo clearfloat">
               <el-button type="primary">主要按钮</el-button>
            </div>
        </div>
    </div>
</template>
<script>

export default {

}
</script>
<style lang="less">

.navBox{
    width:100%;
    background: rgb(97, 226, 243);
    .navWrapper{
        width:1200px;
        margin:0 auto;
        .logo{
            width: 200px;
            height: 120px;
            line-height:120px;
            float: left;
            .logo-icon{
                float: left;
                font-size:35px;
                display: block;
             }
            .logo-title{
                margin-top:30px;
                margin-left:15px;
                float: left;
                font-size:25px;
                .logo-zh {
                    font-size: 30px;
                }
                span{
                    font-size:12px;
                    display: block;
                    line-height: 35px;
                }
            }
           
        }
        .searchbox{
            margin-top: 34px;
            float: left;
            .search{
                display: block;
                float: left;
                border: 2px solid #ccc;
                padding: 10px 0 10px 0;
                background: #fff;
                color: #666;
                line-height: 20px;
                padding-left:5px;
                border-radius: 12px 0 0 12px;
                >input {
                    padding-left: 20px;
                    width: 373px;
                    height: 20px;
                    color: #666;
                    font-size: 14px;
                    border: none;
                }
            }
            .search-btn{
                display: block;
                border: 1px solid  #dc0f50;
                float: left;
                width: 90px;
                height: 44px;
                line-height: 44px;
                text-align: center;
                color: #fff;
                background: #dc0f50;
                font-size: 16px; 
            }
            
        }
        .freeInfo{
            margin-top:35px;
            float: left;
            margin-left:30px;
            
        }
    }
   
}

</style>

