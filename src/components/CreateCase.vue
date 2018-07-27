<template>
  <div>    
     <group label-width="4.5em" label-margin-right="2em" label-align="right">      
      <x-input title="姓名"></x-input>
      <x-input title="联系方式"></x-input>      
      <cell :title='"案件类型"' :value="demo4"   is-link @click.native="showPopup=true"></cell>    
        <div v-transfer-dom>
        <popup  class="checker-popup" v-model="showPopup">
            <div style="padding:10px 10px 40px 10px;">
            <p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
            <checker
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
                <checker-item :value="('民事')" @on-item-click="onItemClick"> {{ ('民事') }} </checker-item>
            </checker>
            </div>
        </popup>
        </div>
      <x-textarea title="asd" placeholder="请填写详细信息" :show-counter="false" :rows="3">       
      </x-textarea>
    </group>
  </div>
</template>
<script>
import {  GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,CheckIcon,Checker, CheckerItem,Popup,TransferDom   } from "vux";

export default {
  name: "createCase",
  directives: {
    TransferDom
  },
  components: {
    GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,CheckIcon ,Checker, CheckerItem,Popup
  },
  data() {
    return {
        items1: [{
        key: '1',
        value: 'A'
      }, {
        key: '2',
        value: 'B'
      }, {
        key: '3',
        value: 'C'
      }],
      demo1: '',
      demo1Required: '',
      demo11: null,
      demo12: {key: '2', value: 'B'},
      demo21: null,
      demo22: [{key: '2', value: 'B'}],
      demo23: null,
      demo1Checkbox: [2, 1],
      demo1CheckboxMax: ['2', '3'],
      demo2: '2',
      demo3: '',
      demo4: ('民事'),
      showPopup: false,
      demo5: 1,
      demo6: [2, 3]
    };
  },
  methods:{
      onItemClick (value, disabled) {
      this.demo4 = value;
      if (!this.disabled) {
        this.showPopup = false
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
