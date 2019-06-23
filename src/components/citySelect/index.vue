<template>
  <div class="cityBox">
    <div class="handleChangeCity" @click="handleChangeCity">
      <span><i class="el-icon-location-outline"></i></span>
      <span>{{showCity}}</span>
      <span>[切换城市]</span>
    </div>
    <!-- <select-city></select-city> -->
    <div class="citySelect" v-if="modelShow">
      省份:<el-select v-model="value" placeholder="请选择" @change="handleProvince">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
      城市:<el-select v-model="value1" placeholder="请选择" @change="handleCity">
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
import selectCity from './selectCity';
export default {
  data() {
    return {
      value1: '',
      value: '',
      showCity: '北京',
      modelShow: false,
      options: [],
      subOptions: [],
      baseUrl: process.env.BASE_URL,
      selectCity: {
        value: '',
        label: ''
      }
    };
  },
  components: {
    selectCity
  },
  created() {
    this.$http.get(this.baseUrl + 'mock/data.json').then(res => {
      // console.log(res)
      this.options = res.data; //得到json里面的 每一项
    });
  },
  methods: {
    handleChangeCity() {
      this.modelShow = true; //当点击的时候让这个组件显示出来
    },
    handleProvince(value) {
      //省份的值
      this.options.forEach(res => {
        //把每个城市遍历出来
        if (res.value === value) {
          //如果省份的值相等就给他赋值
          this.subOptions = res.children; //然后在给城市赋值
          this.selectCity = res; //2(附加).res首先赋给selectCity ，selectCity 里面有值label。就又赋给了label,label有赋给了showCity,所以就会显示省份了
        }
        console.log(res);
      });
      this.value1 = ''; //这里是把城市的值置为空， 就是第二次选择的时候， 城市那边就为空
    },
    handleCity(value) {
      //城市的值，
      // this.subOptions.forEach((res)=>{
      //   if(res.value===value){
      //     this.selectCity = res  //1.打开这里，就把城市显示出来了
      //   }
      // })
    },
    handleClick() {
      //点击确认
      this.modelShow = false; //点击之后让他隐藏
      this.showCity = this.selectCity.label; //把你选中的城市和省份显示到页面上，
    }
  }
};
</script>
<style scoped lang="less">
.el-icon-location-outline {
  display: inline;
  color: red;
  font-size: 18px;
  margin-right: 10px;
}
.handelChangeCity {
  padding-bottom: 15px;
}
.cityBox {
  position: relative;
}
.citySelect {
  width: 700px;
  height: 100px;
  border: 1px solid #ccc;
  padding-top: 15px;
  position: absolute;
  background: rgb(255, 255, 255);
  z-index: 3;
  top: 30px;
  left: 10px;
}
.confirmBtn {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: 10px;
}
</style>

