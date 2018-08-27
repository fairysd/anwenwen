<template>

  <div>    
   <h4>登录中，请稍后</h4>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  name: "login",
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
    };
  },
  mounted() {
    //let url = this.GLOBAL.hostIp;
    let url = this.GLOBAL.host;
    let callbackurl =this.GLOBAL.callbackurl;
    let debug =this.GLOBAL.isDebugger;

    if (!debug){
       location.href =url+"api/order/WeChatLogin?returnUrl="+encodeURIComponent(callbackurl+"state")
    }
    else{
       location.href = "http://localhost:8080/#/state?code=081YUQ9t1px6Ic0vBQat1vTV9t1YUQ9c&state=STATE";

    }
  },
  methods:{   
  }
};
</script>

<style lang="less" scoped>
</style>
