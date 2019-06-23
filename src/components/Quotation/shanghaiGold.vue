<template>
    <!-- 切记在子组件中，引用完 ， 要记得在这里使用  -->
    <div class="containers">
        <ul v-for="list in marketType1" :key="list.id" class="title">
         <li  v-for="all in list.title" :key="all">{{all}}</li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      marketType1: [
        {
          title: ['名称代码', '最新价', '涨跌额', '涨跌幅'],
          id: 1
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.containers {
  .title {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
