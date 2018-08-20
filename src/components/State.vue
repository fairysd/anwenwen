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
    var Request = this.getUrlParam()
    let code = Request.code // 1
    let state =Request.state // Peter
      
    this.$http
      .get(url + "/order/callback", this.qs.stringify({
          code: code,
          state:state
        }))
      .then(({ data }) => {
        this.common.setCookie("userId",data.userId,0.5)
        this.common.setCookie("token",data.token,0.5)
        this.common.setCookie("headimg",data.headimg,0.5)
        this.common.setCookie("nickname",data.nickname,0.5)
        this.$router.push({ name: "home"});
    });
  },
  methods:{    
     getUrlParam: function () {
        var name,value;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?");
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    
        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                name=arr[i].substring(0,num);
                value=arr[i].substr(num+1);
                this[name]=value;
            }
        }
    } 
  }
};
</script>

<style lang="less" scoped>
</style>
