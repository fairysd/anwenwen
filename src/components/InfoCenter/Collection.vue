<template>
  <div class="collection">   
      <flexbox class="col-title">
          <flexbox-item class="">      
              <h4>我的收藏</h4>                      
            </flexbox-item>
      </flexbox>
      <div v-if="clawyer">
        暂无收藏律师
      </div>  
      <div class="list-body" v-if="myclawyer">
        <flexbox class="body" v-for="item in cases" @click.native="getDetails(item.oid)" :key="item.oid">
          <flexbox-item :span="4">
            <div class="list-item photo">
               <img class="lawyer-photo" :src="item.imagepath">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="list-item">
              <span class="name" v-text="item.name"></span><span class="workage" v-text="item.workage+'年经验'"></span>
            </div>
            <div class="list-item">
              <p class="local" v-text="item.city+' | '+item.lawoffice"></p>
            </div>
            <div class="list-item">
              <p  v-for="(labels,index) in item.title" v-if="index<3" :key="index">
                <span class="label" v-text="labels"></span>
              </p>
            </div>            
            <div class="list-item">
              <p class="recent" v-text="item.introduce"></p>
            </div>
          </flexbox-item>
      </flexbox>
      </div>
  </div>
</template>

<script>
import { Search, Group, Cell, XButton } from "vux";
export default {
  name: "collection",
  components: { Search, Group, Cell, XButton },
  data() {
    return {
      searchValue:this.$route.params.msg,      
      autoData:[],
      cases: [],
      myclawyer:true,
      clawyer:false
    };
  },
  mounted(){
    let userId = this.common.getCookie("userId")
    let url =this.GLOBAL.hostIp;
    this.$http
        .get(url + "/findAttorneyBySpeciality", {
          params: {
            userId : userId
          }
        })
        .then(({ data }) => {
          this.cases = data;
          for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].title = data[i].title.split(",");
          }
          if(data.length == 0){
            this.myclawyer = false;
            this.clawyer = true;
          }
        });
  },
  methods:{
     getDetails(oid){
      this.$router.push({ name: "lawyerDetail", params: { id: oid } });
    }, 
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.collection{
  .col-title{
    margin-bottom: 1rem;
    h4{
      color: #777;
      padding: 1rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #d5d5d6;
      font-weight: normal;
    }
  }
  .divider {
    height: 1rem;
    background-color: #f0f0f0;
  }
  .search-box {
    line-height: 2.5rem;
    background: #fff;
    text-align: left;
    color: #a1a2a2;
    margin-bottom: 1rem;
    margin-top: 1.2rem;
    li {
      vertical-align: middle;
      display: inline-block;
      * {
        display: inline-block;
      }
    }
    .local {
      padding-left: 1.5rem;
      img {
        width: 1.2rem;
        vertical-align: middle;
        padding-right: 0.5rem;
      }
      p {
        font-size: 0.8rem;
        vertical-align: middle;
        padding-left: 0.2rem;
      }
    }
    .input-box {
      margin-left: 1rem;
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      background-color: #f5f5f5;
      border-radius: 1.2rem;
      > * {
        display: inline-block;
      }
      input {
        color: #a1a2a2;
        border: none;
        text-align: left;
        padding-right: 2rem;
        background: transparent;
      }
      input:focus {
        outline: none;
      }
      img {
        width: 1.2rem;
        vertical-align: middle;
      }
    }
    .search-btn {
      img {
        width: 1.5rem;
        vertical-align: middle;
      }
      p {
        font-size: 0.9rem;
        vertical-align: middle;
        padding-left: 0.3rem;
      }
    }
  }
  font-size:0.8rem;
  .body{
        border-bottom: 1px dotted #d5d5d6;
        padding-bottom: 0.5rem;
  }
  .name{
    color: #4d4e50;
    font-weight: 500;
  }
  .workage{
    color: #f9ab13;
    font-size: 0.6rem;
    margin-left: 0.8rem;
  }
  .local{
    color: #878889;
    font-size: 0.6rem;
  }
  .label{
    display: inline-block;
    background-color: #2a7af3;
    padding: 0.1rem 0.3rem;
    font-size: 0.5rem;
    border-radius: 0.3rem;
    color: #fff;
    margin-right: 0.2rem;
    margin-bottom: 0.1rem;
    line-height: 0.7rem;
  }
  .recent{
    color: #b7b8b8;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.5rem;
  }
  .body{
    margin:0.3rem 0;
  }
  .photo{
    text-align:center;
  }
  .lawyer-photo{
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 5.5rem;
    margin-top: -0.2rem;
  }
  .auto-data{
    float: left;
    position: relative;
    text-align: left;
    top: 0rem;
    height: 0;
    li{
    width: 18rem!important;
    border: 1px solid #e7e7e7;
    background: #fff;
    }
    p{
            padding: 2px 5px;
    white-space: nowrap;
    overflow: hidden;
    }
}
}
</style>
