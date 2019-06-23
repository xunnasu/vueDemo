<template>
  <div class="father">
    <!-- <metal-son :value="list">
    </metal-son> -->
    <metal-sis :massage="first" @more="handle"></metal-sis>
  </div>
   
</template>
<script>
// import MetalSon from "./MetalSon"
import MetalSis from "./MetalSis"
export default {
    data(){
        return {
          list:"",
          first:""
        }
    },
    methods:{
        // one(res){
        //   console.log(res)
        // },
        handle(res){
          console.log(res)
        }
    },
    components:{
        //  MetalSon,
         MetalSis
    }
}
</script>
<style>
 .father{
   height:100%;
 }
</style>