<template>
  <div class="">
    <divider>{{serviceOrder.serviceName}}</divider>
    <card :header="{title: serviceOrder.title  }"  :footer="{title: '返回',link:link}">
      <p slot="content" class="card-padding price" v-text="serviceOrder.price"></p>
      <p slot="content" class="card-padding">状态: &nbsp;{{serviceOrder.state}}</p>
      <p slot="content" class="card-padding" v-if="serviceOrder.showCode">消费码: &nbsp;{{serviceOrder.code}}<span style='margin-left:30%;' v-text="serviceOrder.useState"></span></p>
    </card>
  </div>
</template>


<script>
  import { Divider, Card } from 'vux'

  export default {
    name:"ServiceDetail",
    components: {
      Card,
      Divider,
    },
    data() {
      return {
        link:"#",
        serviceOrder: {}
      }
    },
    mounted(){


      let urlParam = this.getUrlParam();
      this.link = urlParam.returnLink;
      let id = urlParam.id;
      this. getServiceDetail(id);
    },
    methods: {
      getServiceDetail(oid){
        let url = this.GLOBAL.hostIp;
        this.$http
          .get(url + "/order//ServiceOrderDetail", {
            params: {
              orderId:oid,

            }
          }).then(({ data }) => {

                this.serviceOrder = data.data;


                data.data.title ="<p>订单号:&nbsp;"+data.data.orderNumber+
                  "<span style='margin-left:20%;'>"+data.data.createTime+"</span></p>";
                if(data.data.state == "0") {
                  data.data.showCode = false;

                }
                else if(data.data.state =="1") {
                  data.data.showCode = true;

                }
                data.data.useState =this.setUseState(data.data.useState);
                data.data.state = this.setState(data.data.state);
                console.log(this.serviceOrder);

        });





      },
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

      },
      getUrlParam: function () {
        var name,value;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?");
        str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
          num=arr[i].indexOf("=");
          if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
            console.log(this[name],name);
          }
        }
        return this;
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


</style>
