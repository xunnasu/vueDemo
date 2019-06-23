<template>
  <div class="about">
    <div  class="Topbox">
      <header-top></header-top>
      <main-head></main-head>
      <nav-list></nav-list>
      <metal></metal>
    </div>
    <router-view/>
  </div>
</template>
<script>
import navList from "@/components/navList/navList"
import headerTop from "@/components/headerTop"
import mainHead from '@/components/mainHead/mainHead'
import metal from '@/views/Metal/Metal'
export default {
  components:{
    mainHead,
    headerTop,
    navList,
    metal
  },
}
</script>
<style lang="less">
.Topbox{
  width:100%;
  margin:0 auto;
  background: #d4d3d3;
}
</style>
