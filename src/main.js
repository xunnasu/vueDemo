import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios";
import "./assets/style/resize.css";
import "element-ui/lib/theme-chalk/index.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import echarts from "echarts";
import "vue-easytable/libs/themes-base/index.css";
import { VTable, VPagination } from "vue-easytable";
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
