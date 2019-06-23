<template>
  <div id='page-box' ref='pageBox'>
    <div class='tabs'>
        <div class='tab-child' @click='handleClick(0)'>分时</div>
        <div class='tab-child' @click='handleClick(1)'>日K</div>
        <div class='tab-child' @click='handleClick(2)'>周K</div>
        <div class='tab-child' @click='handleClick(3)'>月K</div>
    </div>
    <div id='time-share-diagran' ref='Home' v-show='type === 0'></div>
    <div id='K-line' ref='KLine' v-show='type === 1'></div> 
  </div>
</template>
<script>
import allData from '@/assets/js/tmpData';
import { initMOption, initKOption } from '@/assets/js/k-line';
import $ from '@/assets/js/jquery-3.3.1.min';
export default {
  data() {
    return {
      type: 1,
      timeArr: [
        ['1101', 33.02, 33.055, 8300],
        ['1102', 33.01, 33.055, 200],
        ['1103', 33.06, 33.055, 2900],
        ['1104', 33.18, 33.056, 11500],
        ['1105', 33.22, 33.058, 5300],
        ['1106', 33.27, 33.06, 5600],
        ['1107', 33.2, 33.061, 4700],
        ['1108', 33.23, 33.063, 11500],
        ['1109', 33.21, 33.064, 5900],
        ['1110', 33.21, 33.066, 1700],
        ['1111', 33.09, 33.066, 700],
        ['1112', 33.19, 33.067, 1700],
        ['1113', 33.1, 33.068, 3100],
        ['1114', 33.06, 33.068, 2700],
        ['1115', 33.19, 33.069, 5400],
        ['1116', 33.19, 33.07, 4200],
        ['1117', 33.19, 33.071, 0],
        ['1118', 33.18, 33.072, 3400],
        ['1119', 33.13, 33.072, 1200],
        ['1120', 33.12, 33.073, 3000]
      ],
      klineArr: [
        ['2016-05-27', 17.77, 17.66, 17.62, 17.77, 7.0, 0, 0.03, 0.1, 0.09],
        ['2016-05-30', 17.75, 17.84, 17.62, 17.87, 20.0, 0, 0.08, 0.12, 0.08],
        ['2016-05-31', 17.88, 18.0, 17.81, 18.03, 41.0, 0, 0.1, 0.12, 0.07],
        ['2016-06-01', 18.09, 17.83, 17.73, 18.09, 22.0, 0, 0.08, 0.1, 0.06],
        ['2016-06-02', 17.82, 17.73, 17.66, 17.88, 10.0, 0, 0.07, 0.08, 0.05],
        ['2016-06-03', 17.8, 17.78, 17.71, 17.83, 9.0, 0, 0.08, 0.08, 0.04],
        ['2016-06-06', 17.73, 17.64, 17.56, 17.83, 12.0, 0, 0.07, 0.06, 0.03],
        ['2016-06-07', 17.76, 17.8, 17.59, 17.87, 11.0, 0, 0.08, 0.06, 0.02],
        ['2016-06-08', 17.75, 17.77, 17.65, 17.84, 9.0, 0, 0.04, 0.03, 0.01],
        ['2016-06-13', 17.58, 17.32, 17.29, 17.79, 16.0, 0, -0.02, -0.01, 0.0],
        ['2016-06-14', 17.33, 17.38, 17.29, 17.5, 10.0, 0, -0.01, 0.0, 0.0],
        ['2016-06-15', 17.25, 17.39, 17.25, 17.46, 18.0, 0, 0.0, 0.01, 0.0],
        ['2016-06-16', 17.26, 17.4, 17.26, 17.46, 22.0, 0, 0.01, 0.01, 0.0],
        ['2016-06-17', 17.38, 17.5, 17.37, 17.67, 13.0, 0, 0.03, 0.02, 0.0],
        ['2016-06-20', 17.62, 17.51, 17.42, 17.63, 15.0, 0, 0.03, 0.01, -0.0],
        ['2016-06-21', 17.53, 17.54, 17.5, 17.7, 11.0, 0, 0.02, 0.0, -0.01],
        ['2016-06-22', 17.5, 17.5, 17.46, 17.6, 10.0, 0, -0.01, -0.01, -0.01]
      ]
    };
  },
  mounted() {
    let width = this.$refs.pageBox.offsetWidth;
    this.$refs.Home.style.width = width + 'px';
    this.$refs.KLine.style.width = width + 'px';
    const timeChart = this.$echarts.init(this.$refs.Home);
    const KChart = this.$echarts.init(this.$refs.KLine);
    //分时图
    // setInterval(() => {
    allData.mdata['data'].push(this.timeArr[Math.round(Math.random() * 10)]);
    timeChart.setOption(initMOption(allData.mdata, 'us'));
    // }, 1000);
    //K线图
    // setInterval(() => {
    let num = JSON.parse(JSON.stringify(allData.kdata));
    allData.kdata.push(this.klineArr[Math.round(Math.random() * 10)]);
    KChart.setOption(initKOption(num, 'k-content'));
    // }, 1000);
    window.onresize = function() {
      timeChart.resize();
      KChart.resize();
    };
  },
  components: {},
  methods: {
    handleClick(type) {
      this.type = type;
    }
  }
};
</script>

<style scoped>
#page-box {
  width: 100%;
}
#K-line {
  width: 100%;
  height: 500px;
}
#time-share-diagran {
  width: 100%;
  height: 500px;
}
.tabs {
  width: 100%;
  height: 50px;
}
.tab-child {
  float: left;
  padding: 20px;
}
</style>
