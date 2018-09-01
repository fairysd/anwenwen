<template>
  <div class="case">   
      <flexbox class="case-title">
          <flexbox-item class="">      
              <h4>我的案例</h4>                      
            </flexbox-item>
      </flexbox>
      <div v-if="icase">
          暂无案件
      </div>  
      <div class="list-body" v-for="(item, index) in cases" :key="item.oid" v-if="mcase">
        <flexbox class="body">
          <flexbox-item>
              <p v-text="item.lawyerName+'律师接收案件,案件已在处理中，案件受理法院'+item.courtName"></p>
              <p v-text="'委托人:'+item.userName+';案由:'+item.reasonName"></p>
              <div class="caseBtn">
                <x-button mini plain  @click.native="loadMore(item.id,index)" v-show="!isTrue[index]">展开案件</x-button>
                <x-button mini plain type="primary" @click.native="loadLess(item.id,index)" v-show="isTrue[index]">收起</x-button>
              </div>
          </flexbox-item>
        </flexbox>
        <div v-if="isTrue[index]" >
            <div v-for="(obj,stindex ) in caseProcess">
                  <flow orientation="vertical" v-for = "(caseItem,caindex) in obj" :key="caseItem.id">
                    <flow-state :title="(caseItem.name)"></flow-state>
                    <flow-line :line-span="45"></flow-line>
                    <!-- <flow-state v-if="!caseItem.workTime==null" :title="(caseItem.workTime)"></flow-state> -->                    
                  </flow>  
              </div>
       </div>
      
      </div>
  </div>
</template>

<script>
import { Search, Group, Cell, XButton,Flow, FlowState, FlowLine } from "vux";
export default {
  name: "case",
  components: { Search, Group, Cell, XButton,  Flow,
    FlowState,
    FlowLine },
  data() {
    return {
      searchValue:this.$route.params.msg,      
      autoData:[],
      cases: [],
      icase:false,
      mcase:true,
      caseProcess:[],
      isTrue:[]
    };
  },
  mounted(){
    let userId = this.common.getCookie("userId")
    let token = this.common.getCookie("token")
    let url =this.GLOBAL.hostIp;
    let data ={          
            userid : userId,
            token:token,
            page:0,
            orderState:1          
        }
    this.$http
        .post(url + "/order/CheckUserOrderList",this.qs.stringify( data))
        .then(({ data }) => {
          this.cases = data.data;
          for (let i = 0; i < this.cases.length; i++) {
            this.isTrue.push(false);
          }
          // debugger;
          if(this.cases.length == 0){
            this.mcase = false;
            this.icase = true;
          }
          console.log(this.isTrue);
        });
  },
  methods:{
    
    loadMore:function(id,idx){
      console.log(idx)
      //this.isTrue.push(false);
      //this.expansionCase = false;
      //this.packCase = true;
      this.isTrue.splice(idx,1,true);
      console.log(idx,this.isTrue[idx]);

      console.log(this.isTrue)
      let url =this.GLOBAL.hostIp;
      let userId = this.common.getCookie("userId")
      let token = this.common.getCookie("token")
      this.$http
      .post(url+"/order/CheckCaseProcess",this.qs.stringify({
        id:id,
        userid:userId,
        token:token
      }))
      .then(({ data }) => {
          console.log(data);
         this.caseProcess = data.data;
        });
    },
    loadLess:function(id,idx){
      //this.expansionCase = true;
      //this.packCase = false;
      this.isTrue.splice(idx,1,false);
      console.log(idx,this.isTrue[idx]);

    },
    
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.case{
  .weui-wepay-flow, .weui-wepay-flow-auto{
    padding:0.8rem
  }
  /deep/ .weui-wepay-flow__bd{
    display: block;
  }
  .weui-wepay-flow__li .weui-wepay-flow__state{
    width:10px;
    height:10px;
  }
  .case-title h4{
    color: #777;
    padding: 1rem;
    font-size: 1.2rem;
    border-bottom: 1px solid #d5d5d6;
    font-weight: normal;
  }
  .body{
      width:98%;
      margin:0 auto;
      padding-bottom:0.5rem;
    p{
      font-size:0.8rem;
      color:#737386;
     
    }
    .caseBtn{
      float: right;
      margin-top: -1rem;
      padding-right: 1rem;
      button{
        color:#4f88f7;
        border:1px solid #4f88f7;
      }
    }
  } 

}
</style>
