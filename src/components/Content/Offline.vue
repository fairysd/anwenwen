<template>
  <div class="delegation">
     <flexbox class="advantage">
        <flexbox-item>
             <img src="../../../static/payTu/offline.png" class="bg">
        </flexbox-item>
        
        <flexbox-item class="pay-introduce">
            <div class="pay-title">
                <!-- <img src="../../../static/payTu/return.png" alt=""> -->
                <span>线下咨询</span>
            </div>  
            <div class="pay-price">
                <img src="../../../static/payTu/moneyLogo.png" alt="">
                <span v-text="payInfo.price" class="span-price"></span>
                <span>24小时内不限次数、不限时长</span>
            </div>
            <div class="pay-advantage">
                <span>· 立即响应 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;· 沟通高效 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;· 高性价比</span>
            </div>       
        </flexbox-item>
     </flexbox>


    <flexbox class="pay-box">
         <flexbox-item>
             <img src="../../../static/payTu/payBtn.png">
             <button @click="payfor(payInfo.id)">确认支付</button>
        </flexbox-item>
    </flexbox>
  
    <flexbox>
        <flexbox-item class="guarantee">
            <div>
                <img src="../../../static/payTu/payGuarantee.png" alt="">
                <span>赔付保障 服务不满意立即退费</span>
            </div>
        </flexbox-item>
     </flexbox>
     <flexbox>
         <flexbox-item class="progress">
             <h4>服务流程</h4>
             <p>1.选择您的所在地</p>
             <p>2.选择您要咨询的法律业务</p>
             <p>3.完成支付后立即与律师童话</p>
        </flexbox-item>
     </flexbox>
  </div>


 <!-- <flexbox class="pay-box">
         <flexbox-item>
             <button @click="payfor(payInfo.id)">确认支付</button>
             <child :orderid="orderid"></child>
        </flexbox-item>
     </flexbox> -->

  <!-- <p v-text="payInfo.price"></p> -->
</template>

<script>
export default {
    name:"offline",
    components: {},
    data() {
        return {     
            payInfo:[],
            orderid:''
        };
    },
  mounted(){
      //document.title = "预约委托"
       //debugger;

      document.title = "线下咨询";
      let url = this.GLOBAL.hostIp;
      let key = this.$route.params.key;
      
      this.$http
      .post(url+"/order/ProductDetail",this.qs.stringify({
          id:key
      }))
      .then(({data}) => {
        //console.log(data);
        this.payInfo = data.data;

    })
  },
  //
  methods:{
      payfor(msg){
          let url = this.GLOBAL.hostIp;
          let userId = this.common.getCookie("userId");
          let host = this.GLOBAL.host;
          let callbackurl =  this.GLOBAL.callbackurl;
          this.$http
          .post(url+"/order/CreateServiceOrder",this.qs.stringify({
              id:msg,
              userId:userId
          }))
          .then(({data}) => {
              console.log(data);
              if(data.code==0){
                 this.orderid = data.data.id
                //  
                 location.href=url + "order/PayServiceOrder?orderId="+ this.orderid+"&returnUrl="+encodeURIComponent(callbackurl+"ServiceDetail?returnLink=MyConsult");
              } 
           })
      }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.delegation{
    .advantage{
        position: relative;
        background: no-repeat center;
        //background: url(../../../static/delegation.png) no-repeat;
        .bg{
            width:100%;
        }
        .pay-introduce{
            position: absolute;
            width:100%;
            color: #fff;
            text-align: center;
            margin-top:-0.8rem;
            .pay-title{
                text-align: left;
                padding-bottom:1rem;
                img{
                    width:0.6rem;
                }
                span{
                    padding-left:7rem;
                }
            }
            .pay-price{
                padding-bottom:0.6rem;
                font-size:1rem;
                img{
                    width: 1rem;
                }
                .span-price{
                    font-size:2rem;
                }
            }  
            .pay-advantage{
                padding-bottom:1.5rem;
                font-size:0.9rem;
                opacity: 0.7;
            }
        }
        
    }
    .pay-box{
        text-align: center;
        margin-top:1.5rem;
        position: relative;
        img{
            width:90%;
        }
        button{
            background-color: transparent;
            border: none;
            padding: 0.5rem 5rem;
            border-radius: 0.5rem;
            color: #fff;
            position: absolute;
            left: 17%;
            top: 11%;
            font-size: 1rem;
        }
    }
    .guarantee{
        margin-bottom:1rem;
        div{
            text-align: center;
        }
        img{
            width:1rem;
            vertical-align: middle;
        }
        span{
            color:#29a0dc;
            font-size:0.8rem;
        }
    }
    .progress{
        h4{
            background-color: #f0eff4;
            padding: 0.35rem 0 0.35rem 1rem;
            font-size: 1rem;
            margin-bottom:0.5rem;
        }
        p{
            color:#7e7e7e;
            font-size:0.8rem;
            padding: 0.2rem 0 0 1rem;;
        }
    }
    
}
</style>
