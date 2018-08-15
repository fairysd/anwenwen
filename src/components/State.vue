<template>
  <div>    
   <h4>登陆中，请稍后</h4>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  name: "state",
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
    let callbackurl = "http://localhost:8080/?code=011QcNmk1lHGHm03LDnk1yAImk1QcNmR&state=STATE#/lawFirst";
    let code = "011QcNmk1lHGHm03LDnk1yAImk1QcNmR";
    let state="STATE"; 
    
    this.$http
      .get(url + "/order/callback", {
        params: {
          code: code,
          state:state
        }
      })
      .then(({ data }) => {
        this.setCookie("userId","U1532356321695SdgZO",0.5)
        this.setCookie("token","a67d19ccfc5b6621fb905572d4632b8e2cb8b7ff",0.5)
        this.$router.push({ name: "home"});
    });
  },
  methods:{
       //设置cookie
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      console.info(cname + "=" + cvalue + "; " + expires);
      document.cookie = cname + "=" + cvalue + "; " + expires;
      console.info(document.cookie);
    },
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
