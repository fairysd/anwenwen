<template>
  <div class="user-tab">
     <tab>
      <tab-item selected >我的案例</tab-item>
      <tab-item >我的关联</tab-item>
      <tab-item >我的收藏</tab-item>
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
export default {
    name:"User",
  components: {Tab, TabItem },
  data() {
    return {
    };
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
</style>
