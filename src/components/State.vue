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
        this.common.setCookie("userId","U1532356321695SdgZO",0.5)
        this.common.setCookie("token","a67d19ccfc5b6621fb905572d4632b8e2cb8b7ff",0.5)
        this.$router.push({ name: "home"});
    });
  },
  methods:{    
  }
};
</script>

<style lang="less" scoped>
</style>
