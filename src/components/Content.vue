<template>
  <div>
    <div class="vux-demo">
      <router-view></router-view>
    </div>
    <wafooter></wafooter>
  </div>
</template>

<script>
import wafooter from './Footer'

export default {
  components: {
    wafooter
  },
  data() {
    return {
    };
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
  padding-bottom: 50px;
}
</style>
