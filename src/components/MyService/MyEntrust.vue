<template>
  <div class="entrust">
    <flexbox class="case-title">
      <flexbox-item class="">      
          <h4>线下委托</h4>                      
      </flexbox-item>
    </flexbox> 
    <!-- <div  v-for="(item,index) in serviceList" :key="item.id">
        <divider>{{ item.serviceName }}</divider>
        <card :header="{title:item.title }"  :footer="{title: '查看详情',link:'/ServiceDetail?id='+item.id+'&returnLink=MyEntrust'}  ">
          <p slot="content" class="card-padding price" v-text="item.price"></p>
          <p slot="content" class="card-padding">状态:&nbsp;{{item.state}}</p>
          <p slot="content" class="card-padding"  v-if="item.showCode">消费码:&nbsp; {{item.code}}<span style='margin-left:30%;' v-text="item.useState"></span></p>
        </card>
    </div>
   -->
  <flexbox class="case-body" v-for="item in serviceList" :key="item.oid">
      <flexbox-item >      
        <div class="body body-title">
          <p class="order-number">订单号:<span v-text="item.orderNumber"></span></p>
          <p class="order-state">状态:<span v-text="item.state"></span></p>
        </div>       
        <div v-show="item.code" class="body body-body">
          <p class="code">付款码:<span v-text="item.code"></span></p>
        </div>  
        <div class="body body-body">
          <p class="create-time"><span v-text="item.createTime"></span></p>
          <p class="price">价格:<span v-text="item.price"></span></p>
        </div>          
      </flexbox-item>
    </flexbox>
    </div>
</template>


<script>
  import { Divider, Card } from 'vux'

  export default {
    name:"MyEntrust",
    components: {
      Card,
      Divider,
    },
    data() {
      return {
        catagory:"1",
        serviceList: []
      };
    },
    mounted() {
      let url = this.GLOBAL.hostIp;
//      let id = this.$route.params.id;
      let userId = this.common.getCookie("userId")
      this.$http
        .get(url + "/order/findServiceOrderList", {
          params: {
            userId: userId,
            catagory:this.catagory
          }
        })
        .then(({ data }) => {
              this.serviceList = data.data;
             for(let i=0;i<data.data.length;i++){

                  data.data[i].title ="<p>订单号:&nbsp;"+data.data[i].orderNumber+
                    "<span style='margin-left:1rem;'>"+data.data[i].createTime+"</span></p>";
                 if(data.data[i].state == "0") {
                   data.data[i].showCode = false;

                 }
                 else if(data.data[i].state =="1") {

                   data.data[i].showCode = true;

                 }
                 data.data[i].useState =this.setUseState(data.data[i].useState);
               data.data[i].state = this.setState(data.data[i].state);

             }


        });
    },
    methods: {

      setUseState(state){
        if(state == "0")
          return "已使用"
        if(state == "1")
          return "未使用"

      }
      ,setState(state){
          if(state == "0")
              return "未付款"
          if(state == "1")
             return "已支付"

      }


    }

  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .entrust{    
    .case-title{
    }
    .case-body{
      padding: 2%;
      border-bottom: 1px dotted #e3e3e3;
    }
    div{
      width: 95%;
      margin:0 auto;
    }
      div.body>p{        
          display: inline-block;     
          line-height: 1rem;
          vertical-align: middle;
      }    
      p.order-number{
        text-align: left;
        width: 65%;
        font-size: 0.7rem;
      }
      p.order-state{
        width: 30%;
        text-align: right;
        font-size: 0.8rem;
        font-weight: bold;
      }
      p.price{
        text-align: right;
        width: 48%;  
        font-size: 1rem;
      }
      p.create-time{
        font-size: 0.4rem;
        text-align: left;
        width: 48%;
      }
      p.code{
        text-align: left;
        font-size: 0.7rem;
      }
  }
 
 .case-title h4{
    color: #777;
    padding: 1rem;
    font-size: 1.2rem;
    border-bottom: 1px solid #d5d5d6;
    font-weight: normal;
  }


</style>






