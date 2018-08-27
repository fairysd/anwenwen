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
<<<<<<< HEAD
    //let url = this.GLOBAL.hostIp;
    let url = this.GLOBAL.host;
    let callbackurl =this.GLOBAL.callbackurl;
    let debug =this.GLOBAL.isDebugger;

    if (!debug){
       location.href =url+"api/order/WeChatLogin?returnUrl="+encodeURIComponent(callbackurl+"state")
    }
    else{
       location.href = "http://localhost:8080/#/state?code=081YUQ9t1px6Ic0vBQat1vTV9t1YUQ9c&state=STATE";

=======
    let url = this.GLOBAL.hostIp;
    let callbackurl = url+"#state";
    let appId = "wxbd8754a5fcbba2b5"; 
    if (!this.common.getCookie("userId")&&!this.common.getCookie("token")) {    
     var  sendurl ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURIComponent(callbackurl)
            +"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        location.href = sendurl;
>>>>>>> fd31828072bebdb09b294fbbd9c5a5bb86a2c6bd
    }
  },
  methods:{   
  }
};
</script>

<style lang="less" scoped>
</style>
