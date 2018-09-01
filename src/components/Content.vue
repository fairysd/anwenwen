<template>
  <div>
    <div class="vux-demo">
      <router-view></router-view>
      <router-view name="footer1"></router-view>
    </div>

    <!-- <router-view name="footer2"></router-view> -->
    <!-- <wafooter></wafooter> -->
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
