<template>
  <div>    
    <tabbar class="page-footer">
      <tabbar-item selected link="/home">        
        <img slot="icon" src="../assets/images/icons/icon_11.png">
        <img slot="icon-active" src="../assets/images/icons/icon_03.png" >
        <span slot="label" class="spanlineheight">首页</span>
      </tabbar-item>
      <tabbar-item :link="kefuUrl">        
        <img slot="icon" src="../assets/images/icons/icon_05.png">
        <img slot="icon-active" src="../assets/images/icons/icon_12.png" >
        <span slot="label" class="spanlineheight">法律咨询</span>
      </tabbar-item>
       <tabbar-item @on-item-click="collect">        
        <img slot="icon" src="../assets/images/icons/icon_23.png" >
        <img slot="icon-active" src="../assets/images/icons/icon_24.png" >
        <span slot="label" class="spanlineheight">收藏</span>
      </tabbar-item>
      <tabbar-item @on-item-click="share">        
        <img slot="icon" src="../assets/images/icons/icon_21.png" >
        <img slot="icon-active" src="../assets/images/icons/icon_22.png" >
        <span slot="label" class="spanlineheight">分享</span>
      </tabbar-item>
      <tabbar-item link="/createCase">        
        <img slot="icon" src="../assets/images/icons/icon_07.png" >
        <img slot="icon-active" src="../assets/images/icons/icon_14.png" >
        <span slot="label" class="spanlineheight">案件委托</span>
      </tabbar-item>
      <!-- <tabbar-item link="/user">        
        <img slot="icon" src="../assets/images/icons/icon_08.png">
        <img slot="icon-active" src="../assets/images/icons/icon_15.png" >
        <span slot="label" class="spanlineheight">我的</span>
      </tabbar-item> -->
    </tabbar>
    <div v-transfer-dom>
      <alert v-model="show" :title="'收藏成功'"> {{ '已收藏'}}</alert>
    </div>
    <div v-transfer-dom>
      <alert v-model="unshow"> {{ '收藏失败'}}</alert>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem,Alert, TransferDomDirective as TransferDom} from "vux";
import wx from 'weixin-js-sdk'
export default {
   directives: {
    TransferDom
  },
  name: "FooterDetail",
  components: {
    Alert, 
    Tabbar,
    TabbarItem,
    TransferDom
  },
  data() {
    return {
      show:false,
      unshow:false,
      msg:'',
      kefuUrl:"http://kefu.anwenwen.com/wechat/Agent",
      
    };
  },
  mounted(){
    let userId = this.common.getCookie("userId")
    let heading = this.common.getCookie("headimg")
    let nickname = this.common.getCookie("nickname")
    this.kefuUrl+="?userName="+nickname+"&headImg="+heading+"&userId="+userId;
  },
  methods:{
      collect(){
      let url = this.GLOBAL.hostIp;
      //let oid = this.common.getCookie("lawyerOid")
      let oid = this.common.getCookie("lawyerOid")
      let userId =  this.common.getCookie("userId")
      //alert(oid)
      this.$http
      .post(url + "/order/saveLawyer",this.qs.stringify({
        userid:userId,
        lawyerOid:oid
      }))
      .then(({ data }) => {
        if(data.code ==0){
          this.show = true
          //this.msg = data.message;
        }else{
          this.unshow = true
        }
      })
    },
    share(){
       let url = this.GLOBAL.hostIp;
      let lawyerOid = this.$route.query.id;
      let wxConfig={
          title: '',
          desc: '',
          link: '',
          imgUrl: '',
      }
       this.$http
      .get(url + "/getOneAttorney", {
        params: {
          id: lawyerOid
        }
      })
      .then(({ data }) => {   
        let lawyer = data[0];      
        // let title  = lawyer.title.split(",");  
        wxConfig.title = lawyer.name+"律师";
        wxConfig.desc = lawyer.city+" "+lawyer.workage+"年经验 "+lawyer.lawoffice;
        wxConfig.link = location.href;
        wxConfig.imgUrl = lawyer.imagepath;
      })
      .then(()=>{
        this.$http.get(url+"JsApiDo?url="+encodeURIComponent(location.href.split('#')[0]))
          .then(({data})=>{
                    let wxInfo = data.data;
                    wx.config({
                    // debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxdbf1e51061375bb3', // 必填，公众号的唯一标识
                    timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wxInfo.noncestr, // 必填，生成签名的随机串
                    signature: wxInfo.signature,// 必填，签名
                    jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
              })    
              alert("请点击右上角菜单，选择发送给朋友或者分享到朋友圈。")  
        })
      })
      .then(()=>{
       wx.ready(function(){
              wx.onMenuShareAppMessage({                
                title: wxConfig.title,
                desc: wxConfig.desc,
                link: wxConfig.link,
                imgUrl: wxConfig.imgUrl,
                trigger: function (res) {
                  // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                  alert('选择好友分享给他');
                },
                success: function (res) {
                  alert('分享成功');
                },
                cancel: function (res) {
                  alert('取消分享');
                },
                fail: function (res) {
                  console.log(JSON.stringify(res));
                }
              });
              wx.onMenuShareTimeline({                
                title: wxConfig.title,
                desc: wxConfig.desc,
                link: wxConfig.link,
                imgUrl: wxConfig.imgUrl,
                trigger: function (res) {
                  // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回    
                },
                success: function (res) {
                  alert('分享成功');
                },
                cancel: function (res) {
                  alert('取消分享');
                },
                fail: function (res) {
                  console.log(JSON.stringify(res));
                }
              });
           });
    })
     	 
  }
}}
</script>

<style lang="less" scoped>
.page-footer{
  position: fixed;
}
.weui-tabbar{
  background-color: #fff;
  height:3.1rem;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, 
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label span{
  color:#4f88f7;
}
.spanlineheight{
  line-height:2;
  font-size: 0.6rem;
  color:#4d4e50;
}

</style>
