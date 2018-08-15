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
    if (!this.getCookie("userId")&&!this.getCookie("token")) {    
    //  var  sendurl ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURIComponent(callbackurl)
    //         +"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    //     location.href = sendurl;

    this.$router.push({ name: "state"});
    }
  },
  methods:{
    //获取cookie
    getCookie: function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    }
  }
};
</script>

<style lang="less" scoped>
</style>
