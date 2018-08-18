<template>
  <div class="user">
    <group>
      <div class="info">
        <img class="user-pic" src="../assets/images/pic/touxiang.jpg" alt="">
        <p class="user-name">赵子耀律师</p>
      </div>
    </group>
     <group class="group">
        <cell :title="'我的咨询'" is-link></cell>
        <cell :title="'我的委托'" is-link></cell>
     </group>
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
    };
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
.user{
  .info{
    text-align: center;
    padding: 3rem 0;
    img{
      width: 5rem;
      border-radius: 5rem;
    }
  }
  .group{
    text-align: left;
  }
}
</style>
