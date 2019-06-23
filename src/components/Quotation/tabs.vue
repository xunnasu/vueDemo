<template>
  <div class="tabs">
    <div class="tabs-bar">
      <div  class="marketCountItem" :class='tabCls(item)' v-for="(item,index) in navList" :key='index' @click="handleChange(index)">
        {{item.label}}
      </div>
    </div>
    <div class="tabs-content">
      <!-- 这里的slot就是嵌套的pane -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    value: { type: [String, Number] }
  },
  data() {
    return {
      //用于渲染 tabs 的标题
      navList: [],
      //因为不能修改 value，所以复制一份自己维护
      currentValue: this.value
    };
  },
  methods: {
    tabCls(item) {
      return [
        'tabs-tab',
        {
          //给当前选中的tab 加一个 class
          'tabs-tab-active': item.name === this.currentValue
        }
      ];
    },
    // handleChange(index) {
    //   var nav = this.navList[index];
    //   var { name } = nav;
    //   //改变当前选中的tab，并触发下面的 watch
    //   this.currentValue = name;
    //   //触发一个自定义事件，供父级使用
    //   this.$emit('getMarketType', name);
    // },

    handleChange(index) {
      var nav = this.navList[index];
      var { name } = nav;
      this.currentValue = name;
      this.$emit('getMarketType', name);
    },
    getTabs() {
      //通过遍历子组件，得到所有的 pane 组件
      return this.$children.filter(item => {
        return item.$options.name === 'pane';
      });
    },
    updateNav() {
      this.navList = [];
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        });
        //如果没有给 pane 设置 name，默认设置它的索引
        if (!pane.name) pane.name = index;
        //设置当前选中的tab 的索引，
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index;
          }
        }
      });
      this.updateStatus();
    },
    updateStatus() {
      var tabs = this.getTabs();
      tabs.forEach(tab => {
        return (tab.show = tab.name === this.currentValue);
      });
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue() {
      //在当前选中的 tab 发生变化时，更新pane的显示状态
      this.updateStatus();
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
  width: 100%;
  .tabs-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-top: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    box-shadow: 0px 7px 7px -7px #5e5e5e;
    .marketCountItem {
      color: #000;
    }
    .tabs-tab {
    }
    .tabs-tab-active {
      color: #3399ff;
      border-bottom: 2px solid #3399ff;
      height: 25px;
      line-height: 25px;
    }
  }
}
</style>