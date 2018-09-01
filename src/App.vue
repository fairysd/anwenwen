<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <router-view name="footer1"></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
    return {
        reload:this.reload
    }
  },
  data(){
      return {
          isRouterAlive:true
      }
  },
  methods:{
      reload(){
          this.isRouterAlive = false;
          this.$nextTick(function(){
              this.isRouterAlive = true;
          })
      }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fff;

}
@media only screen and (max-width: 1080px), only screen and (max-device-width:1080px) {
    html,body {
        font-size:54px!important;
    }
}
@media only screen and (max-width: 960px), only screen and (max-device-width:960px) {
    html,body {
        font-size:48px!important;
    }
}
@media only screen and (max-width: 800px), only screen and (max-device-width:800px) {
    html,body {
        font-size:40px!important;
    }
}
@media only screen and (max-width: 720px), only screen and (max-device-width:720px) {
    html,body {
        font-size:36px!important;
    }
}
@media only screen and (max-width: 640px), only screen and (max-device-width:640px) {
    html,body {
        font-size:32px!important;
    }
}
@media only screen and (max-width: 600px), only screen and (max-device-width:600px) {
    html,body {
        font-size:30px!important;
    }
}
@media only screen and (max-width: 540px), only screen and (max-device-width:540px) {
    html,body {
        font-size:27px!important;
    }
}
@media only screen and (max-width: 480px), only screen and (max-device-width:480px) {
    html,body {
        font-size:24px!important;
    }
}
@media only screen and (max-width: 414px), only screen and (max-device-width:414px) {
    html,body {
        font-size:20.7px!important;
    }
}
@media only screen and (max-width: 400px), only screen and (max-device-width:400px) {
    html,body {
        font-size:20px!important;
    }
}
@media only screen and (max-width: 375px), only screen and (max-device-width:375px) {
    html,body {
        font-size:18.75px!important;
    }
}
@media only screen and (max-width: 360px), only screen and (max-device-width:360px) {
    html,body {
        font-size:18px!important;
    }
}
@media only screen and (max-width: 320px), only screen and (max-device-width:320px) {
    html,body {
        font-size:16px!important;
    }
}
@media only screen and (max-width: 240px), only screen and (max-device-width:240px) {
    html, body {
        font-size: 12px!important;
    }
div.vux-tab-ink-bar{
    background-color: #4f88f7;
    border-bottom: 2px solid #4f88f7;
}

}
// 移动端禁止出现横向滚动条
html,body{overflow:hidden;overflow-y:auto;}
</style>
