<template>
  <div class="case-list">
     <contentHeader></contentHeader>
    <search
      :auto-fixed="false"
      top="46px"
      ref="search"></search>
  </div>
</template>

<script>
import contentHeader from '../Content/contentHeader'
import { Search,Group, Cell, XButton } from 'vux'
export default {
    name:"caseList",
  components: {contentHeader,Search,Group, Cell, XButton},
  data() {
    return {
    };
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
</style>
