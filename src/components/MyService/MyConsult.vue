<template>                   
  <div>
    <flexbox class="case-title">
      <flexbox-item class="">      
          <h4>线下咨询</h4>                      
      </flexbox-item>
    </flexbox>       
    <div  v-for="(item,index) in serviceList" :key="item.id">
      <divider>{{ item.serviceName }}</divider>
      <card :header="{title:item.title }"  :footer="{title: '查看详情',link:'/ServiceDetail?id='+item.id+'&returnLink=MyConsult'}  ">
        <p slot="content" class="card-padding price" v-text="item.price"></p>
        <p slot="content" class="card-padding">状态:&nbsp;{{item.state}}</p>
        <p slot="content" class="card-padding"  v-if="item.showCode">消费码:&nbsp; {{item.code}}<span style='margin-left:30%;' v-text="item.useState"></span></p>


      </card>
    </div>
  </div>
</template>


<script>
  import { Divider, Card } from 'vux'

  export default {
    name:"MyConsult",
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

            console.log(this.serviceList);

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
  .newsrc{
    background-color: green;
  }
  .card-padding {
    padding: 15px;
  }
  .price{
    font-size: 2rem;
    text-align: center;
  }
  .case-title h4{
    color: #777;
    padding: 1rem;
    font-size: 1.2rem;
    border-bottom: 1px solid #d5d5d6;
    font-weight: normal;
  }


</style>






