<template>
  <div class="create-case">    
      <contentHeader></contentHeader>
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
    <group>
    <flexbox>
      <flexbox-item class="btn submit-btn">
        </flexbox-item>
        <flexbox-item class="btn submit-btn">
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
import {  GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,CheckIcon,Checker, CheckerItem,Popup,TransferDom,XButton   } from "vux";

export default {
  name: "createCase",
  directives: {
    TransferDom
  },
  components: {
    GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,CheckIcon ,Checker, CheckerItem,Popup,XButton ,contentHeader
  },
  data() {
    return {        
      showPopup: false,
      caseType: ['民事'],
      list:[['民事']],
      caseModel:{
        lawyerId:"2eac92d0-ba91-3526-94f0-e5d41d674d21",
        userTel:"",
        userName:"",
        caseType:0,
        remark:"",
        orderPrice:"",
        userId:"U1532356321695SdgZO"
      }
    };
  },
  methods:{     
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
