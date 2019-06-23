<template>
  <div class="registerBox">
       
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">

.registerBox{
    width:100%;
    background: rgb(115, 174, 223);
    .navWrapper{
        width:1200px;
        margin:0 auto;
        .register{
            width: 200px;
            height:100%;
            line-height:120px;
            float: left;
            .register-icon{
                float: left;
                font-size:35px;
                display: block;
             }
            .register-title{
                margin-top:30px;
                margin-left:15px;
                float: left;
                font-size:25px;
                .register-find {
                    font-size: 30px;
                }
               span{
                    font-size:12px;
                    display: block;
                    line-height: 35px;
                }
            }
           
        }
        .writeInfo{
            width:100%;
            height:50px;
            padding-top:50px;
        }
        .registerInfo{
            width:200px;
            height:100px;
        } 
    }
}
</style>