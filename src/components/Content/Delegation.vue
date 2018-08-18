<template>
  <div class="delegation">
     <flexbox>
         <flexbox-item class="advantage">
             <p>$99</p>
             <p>24小时内不限次数，不限时长</p>
             <p>立即响应，沟通高效，高性价比</p>
        </flexbox-item>
     </flexbox>
     <flexbox>
         <flexbox-item class="advantage">
             <p>选择预约委托的七大理由</p>
             <p>24小时内不限次数，不限时长</p>
             <p>立即响应，沟通高效，高性价比</p>
        </flexbox-item>
     </flexbox>
     <flexbox class="pay-box">
         <flexbox-item>
             <button @click="payfor">确认支付</button>
        </flexbox-item>
     </flexbox>
     <flexbox class="">
         <flexbox-item class="advantage">
             <p>赔付保障 服务不满意 立即退费</p>
        </flexbox-item>
     </flexbox>
     <flexbox class="">
         <flexbox-item class="advantage">
             <h4>服务流程</h4>
             <p>1.选择您的所在地</p>
             <p>2.选择您要咨询的法律业务</p>
             <p>3.完成支付后立即与律师童话</p>
        </flexbox-item>
     </flexbox>
  </div>
</template>

<script>
export default {
    name:"delegation",
  components: {},
  data() {
    return {
    };
  },
  mounted(){
      document.title = "预约委托"
  },
  //
  methods:{
      payfor(){

      }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.delegation{
    .advantage{
        text-align: center;
    }
    .pay-box{
        text-align: center;
        margin:1rem 0;
        button{
            background-color: #37AEFE;
            border: 1px solid #37AEFE;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            color:#fff;
        }
    }
    
}
</style>
