<template>
  <div class="create-case">    
    <group label-width="4.5em" label-margin-right="2em" label-align="right">      
      <x-input title="姓名:" placeholder="请输入姓名" v-model="caseModel.userName"></x-input>
      <x-input title="联系方式:" placeholder="请输入联系方式" v-model="caseModel.userTel"></x-input>    
    </group>  
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <popup-picker title="案件类型:" :data="list" v-model="caseType" value-text-align="left" font-size="0.8em"></popup-picker>          
      <x-textarea title="案件描述:" placeholder="请输入案件描述 例如：xxx在xxx市xxx时间的案件" :show-counter="false" :rows="3" v-model="caseModel.remark">       
      </x-textarea>
      <x-input title="标的:" placeholder="请输入具体金额" v-model="caseModel.orderPrice"></x-input>   
    </group>
    <div v-transfer-dom>
      <alert v-model="show" :title="'请求成功'" > {{ '提交成功'}}</alert>
    </div>
    <div v-transfer-dom>
      <alert v-model="errorshow" :title="'请求失败'" > {{ '请检查参数'}}</alert>
    </div>
    
      <flexbox>
        <flexbox-item class="btn cancel-btn">
        </flexbox-item>
        <flexbox-item class="btn submit-btn" @click.native="submitCase">
          <x-button  type="primary" class="submitBtn">提交</x-button>
        </flexbox-item>
        <flexbox-item class="btn cancel-btn">
          <x-button  type="warn" class="dismissBtn">取消</x-button>
        </flexbox-item>
        <flexbox-item class="btn submit-btn">
        </flexbox-item>
    </flexbox>
  
  </div>
</template>
<script>
import contentHeader from './Content/contentHeader'
import {  GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,CheckIcon,Checker, CheckerItem,Popup,XButton,AlertModule, Alert,  TransferDomDirective as TransferDom   } from "vux";

export default {
  name: "createCase",
  directives: {
    TransferDom
  },
  components: {
    GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,CheckIcon ,Checker, CheckerItem,Popup,XButton ,contentHeader,TransferDom,XButton,AlertModule, Alert
  },
  data() {
    return {        
      showPopup: false,
      caseType: ['民事'],
      list:[['民事']],
      show:false,
      errorshow:false,
      caseModel:{
        lawyerId:"2eac92d0-ba91-3526-94f0-e5d41d674d21",
        userTel:"",
        userName:"",
        caseType:1,
        remark:"",
        orderPrice:"",
        userId:"",
        token:""
      }
    };
  },
  mounted(){
    this.caseModel.userId = this.common.getCookie("userId")
    this.caseModel.token = this.common.getCookie("token")
  },
  methods:{     
    submitCase(){
       let url = this.GLOBAL.hostIp;
       let caseModel = this.caseModel
      this.$http
      .post(url + "order/SubmitPreOrder",this.qs.stringify({
        lawyerId:caseModel.lawyerId,
        userTel:caseModel.userTel,
        userName:caseModel.userName,
        caseType:caseModel.caseType,
        remark:caseModel.remark,
        orderPrice:caseModel.orderPrice,
        userId:caseModel.userId,
        token:caseModel.token
      }))
      .then(({ data }) => {
        if (data.code == 4) {
         this.errorshow = true;
        }else{
          this.show =true;
        }
        console.log(data)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.create-case{
  background-color: #fcfcfc;
  // padding-top:1rem;
}
.submitBtn,.dismissBtn{
  padding: 0 1rem;
    line-height: 2;
}
.fontStyle{
  font-size:0.8rem;
}
.create-case .case-calss{
  width: 4.5em;
}
.create-case .btn{
  text-align: center;
}
.demo4-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.demo4-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
.create-case /deep/ .weui-cell{
  padding:1rem 1rem;
  font-size:0.8rem;
}
.create-case /deep/ .weui-cells{
  margin-top:0.5rem;
}
.vux-x-textarea{
  height:7rem;
}
.vux-flex-row{
  padding:1rem 0 1.6rem 0;
}
</style>
