<template>
  <div>    
   <h4>登陆中，请稍后</h4>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
import { defaultCipherList } from 'constants';

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
    var Request = this.getUrlParam();
    let state = Request.state // 1
    let debug =this.GLOBAL.isDebugger;

    let id =Request.id // Peter
    this.$http
      .get(url + "/order/getUser",{
        params:{
          state: state,
          id:id
        }
        })
      .then(({ data }) => {
        if(data.code != 0){
          if (debug){
          //debugger;
            data.data={}
            data.data.userId ="U1524915790870FVIJL";
            data.data.token ="13f79dc959c2d15023608226845550c974544256";
            data.data.headimg ="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJm5uXyyRzPniaja6PEVg9pjo6YyrRTbD8LX00chmyOg2VW8gAMTVvWI7tMsLJRDfk9McjKwrHlvvg/132";
            data.data.nickName ="王彦彦";
          }
          // //失败重新登录 
          else
             location.href =this.GLOBAL.host+"/wechatapp";
       
        }
        this.common.setCookie("userId",data.data.userId,30)
        this.common.setCookie("token",data.data.token,30)
        this.common.setCookie("headimg",data.data.headimg,30)
        this.common.setCookie("nickname",data.data.nickName,30)
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
        return this;
    } 
  }
};
</script>

<style lang="less" scoped>
</style>
