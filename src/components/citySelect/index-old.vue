<!--<template>
  <div class="cityBox">
    
    <div class="handelChangeCity" @click="handelChangeCity">
      <span><i class="el-icon-location-outline"></i></span>
      <span>{{showCity}}</span>
      <span>[切换城市]</span>
    </div>
    <div class="citySelect" v-if="modelShow">
      省份:<el-select size="mini" v-model="value" placeholder="请选择" @change="handleProvince">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      城市:<el-select size="mini" v-model="value1" placeholder="请选择" @change="handleCity">
            <el-option
                v-for="item in subOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <div class="confirmBtn">
            <el-button  size="mini"  type="primary" @click="handleClick">确认</el-button>
          </div>
        
    </div>
  </div>
  
</template>
<script>

export default {
  data(){
    return{
      modelShow:false,
      options:[],
      value:"",
      subOptions:[],
      value1:"",
      showCity:"北京",
      selectCity: {
        value: "",
        label: ""
      }
    }
  },
  methods:{
    handelChangeCity(){
      this.modelShow= true
    },
    handleProvince(value){
      this.options.forEach((res)=>{
        if(res['value']===value){
          this. subOptions =res['children']
        }
      })
       this.value1 = ""
    },
    handleCity(value){
      this.subOptions.forEach((res)=>{
        if(res["value"]===value){
          this.selectCity = res
        }
      })
    },
    handleClick(res) {
      this.modelShow = false;
      this.showCity = this.selectCity['label']
    }
  },
  created(){
    this.$http.get("https://www.easy-mock.com/mock/5b9cf844c97c69315f3d7c82/test1807/city")
              .then((res)=>{
               this.options=res.data
              })
  }
}
</script>
<style scoped lang="less">

.el-icon-location-outline{
  display: inline;
  color:red;
  font-size:18px;
  margin-right:10px;
}
.handelChangeCity{
  padding-bottom:15px;
}
.cityBox{
  position: relative;
}
.citySelect{
    width:470px;
    height:100px;
    border:1px solid #ccc;
    padding-top:15px;
    position: absolute;
    background: rgb(255, 255, 255);
    z-index: 3;
    top:30px;
    left:10px;
}
.confirmBtn{
    display: flex;
    justify-content:flex-end;
    margin-right:20px;
    margin-top:10px
}


</style>

