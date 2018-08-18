<template>
  <div class="create-case">    
     <group label-width="4.5em" label-margin-right="2em" label-align="right">      
      <x-input title="姓名" placeholder="请输入姓名"></x-input>
      <x-input title="联系方式" placeholder="请输入联系方式"></x-input>    
      </group>  
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <popup-picker title="案件类型" :data="list" v-model="caseType" value-text-align="left"></popup-picker>          
      <x-textarea title="案件描述" placeholder="请输入案件描述 例如：xxx在xxx市xxx时间的案件" :show-counter="false" :rows="3">       
      </x-textarea>
      <x-input title="标的" placeholder="请输入具体金额"></x-input>   
    </group>
    <div v-transfer-dom>
      <alert v-model="show" :title="'请求成功'" > {{ '提交成功'}}</alert>
    </div>
    <div v-transfer-dom>
      <alert v-model="errorshow" :title="'请求失败'" > {{ '请检查参数'}}</alert>
    </div>
    <group>
    <flexbox>
      <flexbox-item class="btn submit-btn">
        </flexbox-item>
        <flexbox-item class="btn submit-btn" @click.native="submitCase">
          <x-button  type="primary">提交</x-button>
        </flexbox-item>
        <flexbox-item class="btn cancel-btn">
          <x-button  type="warn">取消</x-button>
        </flexbox-item>
        <flexbox-item class="btn submit-btn">
        </flexbox-item>
      </flexbox>
      </group>
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
    this.caseModel.userId =this.common.getCookie("userId")
    this.caseModel.token =this.common.getCookie("token")
  },
  methods:{     
    submitCase(){
       let url = this.GLOBAL.hostIp;
       let caseModel = this.caseModel
      this.$http
      .post(url + "order/SubmitPreOrder", {
        lawyerId:caseModel.lawyerId,
        userTel:caseModel.userTel,
        userName:caseModel.userName,
        caseType:caseModel.caseType,
        remark:caseModel.remark,
        orderPrice:caseModel.orderPrice,
        userId:caseModel.userId,
        token:caseModel.token
      })
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
</style>
