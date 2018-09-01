<template>
  <div class="user">
    
      <div class="info">
        <img class="user-pic" :src="nickimg" alt="">
        <p class="user-name" v-text="name"></p>
        <img class="userbg" src="../../static/user/user.png" alt="">
      </div>
  
     <group class="group">
        <cell :title="'我的咨询'" is-link @click.native="goto('MyConsult')"></cell>
        <cell :title="'我的委托'" is-link @click.native="goto('MyEntrust')"></cell>
     </group>
    <flexbox class="">
      <flexbox-item class="divider">                            
      </flexbox-item>
    </flexbox>
     <group class="group">
        <cell :title="'我的案例'" is-link @click.native="goto('mycase')"></cell>
        <cell :title="'关联案例'" is-link @click.native="goto('relate')"></cell>
        <cell :title="'我的收藏'" is-link @click.native="goto('collection')"></cell>
     </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
export default {
    name:"User",
    components: {Group, Cell },
  data() {
    return {
      //name:"username"
      name:"",
      nickimg:""

    };
  },
   mounted(){
      this.common.getCookie("headimg");
      this.common.getCookie("nickName");
      this.name =  this.common.getCookie("nickname");
      console.log("name",this.name)
      this.nickimg = this.common.getCookie("headimg");
      console.log("img",this.nickimg)
   },
  //
  methods:{
    goto(path){
       this.$router.push({ name: path});
    }
    
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
.vux-demo{
  // background-color: #f0eff4;
  padding-bottom:3.5rem;
}
.user{
  .divider {
    height: 0.5rem;
    background-color: #f0f0f0;
  }
  .info{
    background-color: #fff;
    text-align: center;
    height: 10rem;
    padding: 1.5rem 0 0 0 ;
    .user-pic{
      width: 5rem;
      border-radius: 5rem;
    }
    .userbg{
      width:100%;
    }
  }
  // /deep/ .weui-cells{
  //   margin-top:0rem;
  //   padding:0.3rem 0 0.3rem 0;
  //   font-size:0.8rem;
  // }
  .group{
    text-align: left;
  }
}
</style>
