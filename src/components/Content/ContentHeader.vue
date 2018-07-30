<template>
  <div class="content-header">
     <flexbox>
         <flexbox-item>
             <img src="../../assets/images/pic/headlogo.png" alt="">
        </flexbox-item>
     </flexbox>
  </div>
</template>

<script>
export default {
    name:"contentHeader",
  components: {},
  data() {
    return {
    };
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.content-header img{
    width: 100%;
}
</style>
