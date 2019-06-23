<template>
<div class="container">
    <div class="addressTop  clear">
        <div class="arrowImg">
            <img src="../../../public/imgs/more.png" alt="">
        </div>
        <p class="addressManage">地址管理</p>
    </div>
    <div class="Administration">
        <div class="userAddress">
            <p class="userName">赵培林<span class="userPhone">15811228548</span></p>
            <ul class="addressSelect clear">
                <li>北京市</li>
                <li>市辖区</li>
                <li>朝阳区</li>
                <li>慧忠里第二社区</li>
            </ul>
            <span class="edit">
                <img src="../../../public/imgs/u312.png" alt="">
            </span>
        </div>
        <div class="userAddress">
            <p class="userName">赵培林<span class="userPhone">15866666666</span></p>
            <ul class="addressSelect clear">
                <li>北京市</li>
                <li>市辖区</li>
                <li>朝阳区</li>
                <li>慧忠里第二社区</li>
            </ul>
             <span class="edit">
                <img src="../../../public/imgs/u312.png" alt="">
            </span>
        </div>
        <div class="addressAddNew">
            <p @click="addressAddNew">添加新地址</p>
            <div class="addressAddNewBox" v-if="editAddress">
              <div class="goodsDollar">
                <p class="dollars">￥：502.00</p>
                <p class="counts">库存1件</p>
              </div>
             
            </div>
        </div>
    </div>
   
</div>
</template>
<script>
export default {
  
    name: 'cart',
    data() {
      return {
          editAddress:false
      };
    },
    created() {
        document.title='编辑地址';
    },
    methods: {
        addressAddNew(){
            this.editAddress =true
        }
    },
};
</script>
<style lang="less" scoped>
    .container{
        background:#F5F5F5;
        height:100%;
        .addressTop{
            width:374px;
            height:35px;
            border:1px solid #ccc;
            background: #fff;
            .arrowImg{
                float: left;
                margin-left:10px;
                margin-top:5px;
                img{
                   transform: rotateY(180deg); 
                }
            }
            .addressManage{
                float: left;
                font-size: 18px;
                text-align: center;
                margin-left:130px;
                margin-top:5px;
            }
        }
        .Administration{
            .userAddress{
                background: #fff;
                width:350px;
                padding:10px;
                height:70px;
                position: relative;
                margin:15px;
                .userName{
                    font-size:12px;
                    .userPhone{
                        margin-left:15px;
                    }
                }
                .addressSelect li{
                    float: left;
                    font-size:12px;
                    color:#ccc;
                    margin-right:7px;
                    margin-top:10px;
                }
                .edit{
                    position: absolute;
                   top:15px;
                   left:300px;
                   img{
                        margin-left:8px;
                   }
                     &::before {
                        content: "";
                        position: absolute;
                        width: 1px;
                        border-left: 1px solid #ccc;
                        height: 25px;
                        top: 0;
                        bottom: 0;
                        margin: auto 0;
                        left: 0;
                    }
                }
            }
        }
        .addressAddNew{
            width:374px;
            height:38px;
            background: #FF6600;
            color:#fff;
            font-size:16px;
            position: absolute;
            top:629px;
            p{
                text-align: center;
                padding-top:8px;

            }
           .addressAddNewBox{
               width:334px;
               height:300px;
               background: #FF6600;
               position: absolute;
               top:-100px;
           
           }
            

        }
    }
</style>
