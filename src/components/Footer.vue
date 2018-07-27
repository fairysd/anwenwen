<template>
  <div>    
    <tabbar>
      <tabbar-item selected link="/home">        
        <img slot="icon" src="../assets/images/icons/images_9.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>        
          <img slot="icon" src="../assets/images/icons/images_10.png">
          <img slot="icon-active" src="../assets/images/icons/images_11.png" >
        <span slot="label">法律咨询</span>
      </tabbar-item>
      <tabbar-item>        
          <img slot="icon" src="../assets/images/icons/images_11.png">
        <span slot="label">找律师</span>
      </tabbar-item>
      <tabbar-item link="/createCase">        
          <img slot="icon" src="../assets/images/icons/images_12.png" >
        <span slot="label">案件委托</span>
      </tabbar-item>
      <tabbar-item>        
          <img slot="icon" src="../assets/images/icons/images_13.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  name: "wafooter",
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="less" >
</style>
