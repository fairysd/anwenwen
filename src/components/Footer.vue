<template>
  <div>    
    <tabbar class="page-footer">
      <tabbar-item selected link="/home">        
        <img slot="icon" src="../assets/images/icons/icon_11.png">
        <img slot="icon-active" src="../assets/images/icons/icon_03.png" >
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :link="kefuUrl">        
          <img slot="icon" src="../assets/images/icons/icon_05.png">
          <img slot="icon-active" src="../assets/images/icons/icon_12.png" >
        <span slot="label">法律咨询</span>
      </tabbar-item>
      <tabbar-item link="/findLawyer">        
          <img slot="icon" src="../assets/images/icons/icon_06.png">
          <img slot="icon-active" src="../assets/images/icons/icon_13.png" >
        <span slot="label">找律师</span>
      </tabbar-item>
      <tabbar-item link="/createCase">        
          <img slot="icon" src="../assets/images/icons/icon_07.png" >
          <img slot="icon-active" src="../assets/images/icons/icon_14.png" >
        <span slot="label">案件委托</span>
      </tabbar-item>
      <tabbar-item link="/user">        
          <img slot="icon" src="../assets/images/icons/icon_08.png">
          <img slot="icon-active" src="../assets/images/icons/icon_15.png" >
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
      kefuUrl:"http://kefu.anwenwen.com/wechat/Agent"
    };
  },
  mounted(){
    let userId = this.common.getCookie("userId")
    this.kefuUrl+="?userId="+userId;
  },
  methods:{
     
  }
};
</script>

<style lang="less" scoped>
.page-footer{
  position: fixed;
}
</style>
