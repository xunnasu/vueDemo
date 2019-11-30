<template>
  <div class="selectAddress"  @click.self="handleClose" :class="{'show':showFlag,'hide':!showFlag}">
    <div class="selectAddressBox">
      455676787
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showFlag: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit('on-show', false);
    }
  }
};
</script>
<style lang="less" scoped>
.hide {
  display: none;
}
.show {
  display: block;
}
.selectAddress {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  .selectAddressBox {
    width: 100%;
    height: 270px;
    background: #fff;
    position: absolute;
    bottom: 0;
  }
}
</style>