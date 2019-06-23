<template>
  <div class="nameTwo">
    <span class="item">
      <span>{{rowData.name}}</span>
      <button v-if="rowData.status==='sale'">可交易</button>
    </span>
    <span class="item">{{rowData.nameCode}}</span>
    
  </div>
</template>
<script>
export default {
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  mounted() {
    // console.log(this.rowData);
  }
};
</script>
<style lang="less">
.nameTwo {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .item {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
}
</style>
