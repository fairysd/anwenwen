<template>
  <div>    
   <h4>登陆中，请稍后</h4>
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
    let url = this.GLOBAL.hostIp;
    let callbackurl = url+"#login";
    let appId = "wxbd8754a5fcbba2b5"; 
    if (!this.common.getCookie("userId")&&!this.common.getCookie("token")) {    
    //  var  sendurl ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURIComponent(callbackurl)
    //         +"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    //     location.href = sendurl;

    this.$router.push({ name: "state"});
    }
  },
  methods:{   
  }
};
</script>

<style lang="less" scoped>
</style>
