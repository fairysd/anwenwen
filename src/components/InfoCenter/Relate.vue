<template>
  <div class="relate">   
      <flexbox class="rel-title">
          <flexbox-item class="">      
              <h4>关联案例</h4>                      
            </flexbox-item>
      </flexbox>  
      <ul class="relcode-box">
          <li><el-input v-model="relCode" placeholder="请输入用户邀请码"></el-input></li>
          <li><el-button type="primary" @click="submitCode">确认</el-button></li>        
      </ul>
      <div v-transfer-dom>
        <alert v-model="show" :title="'请求成功'" > {{ '关联成功'}}</alert>
        </div>
        <div v-transfer-dom>
        <alert v-model="errorshow" :title="'请求失败'" > {{ '关联失败，请联系管理员'}}</alert>
        </div>
  </div>
</template>

<script>
import { Search, Group, Cell, XButton,AlertModule, Alert,  TransferDomDirective as TransferDom  } from "vux";

export default {
  name: "relate",
  directives: {
    TransferDom
  },
  components: { Search, Group, Cell, XButton,AlertModule, Alert,  TransferDom  },
  data() {
    return {
      relCode:"",
      show:false,
      errorshow:false
    };
  },
  mounted(){   
  },
  methods:{  
      submitCode(){
        let userId = this.common.getCookie("userId")
        let token = this.common.getCookie("token")
        let code = this.relCode;
        let url =this.GLOBAL.hostIp;
            this.$http
                .post(url + "/order/BindOrderByVerifyCode", {
                    params: {
                        userId : userId,
                        token:token,
                        verifyCode:code
                    }
                })
                .then(({ data }) => {
                 if (data.code==4) {
                     this.errorshow = true;
                 }else{
                     this.show = true;
                 }
                });
            }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.relate{
  .rel-title{
    margin-bottom: 1rem;
    h4{
      color: #777;
      padding: 1rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #d5d5d6;
      font-weight: normal;
    }
  }
  .relcode-box{
      li{
          display: inline-block;
      }
  }
}
</style>
