<template>
  <div class="lawyer-list">
     <contentHeader></contentHeader>
    <search
      v-model="searchValue"
      :auto-fixed="false"
      top="46px"
      @on-submit="getLawyer"
      ref="search"
      v-on:input.native="getAutoData"></search>
      <ul class="auto-data">
          <li v-for="(item,index) in autoData" @click="setSearchValue(item.name.value)" :key="item.id" v-if="index<5">
              <p v-text="item.name.value"></p>
          </li>
      </ul>
      <div class="list-body">
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
import contentHeader from "../Content/contentHeader";
import { Search, Group, Cell, XButton } from "vux";
export default {
  name: "caseList",
  components: { contentHeader, Search, Group, Cell, XButton },
  data() {
    return {
      searchValue:this.$route.params.msg,      
      autoData:[],
      cases: []
    };
  },
  mounted(){
    let url =this.GLOBAL.hostIp;
    let message = this.$route.params.msg;
    this.$http
        .get(url + "/findAttorneyBySpeciality", {
          params: {
            message : message
          }
        })
        .then(({ data }) => {
          this.cases = data;
          for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].title = data[i].title.split(",");
          }
        });
  },
  methods:{
     getDetails(oid){
      this.$router.push({ name: "lawyerDetail", params: { id: oid } });
    },
    getAutoData() {        
      let url = this.GLOBAL.hostIp;
      let value = this.searchValue;
      this.$http
        .get(url + "/tosearchJudgePaper", {
          params: {
            query: value
          }
        })
        .then(({ data }) => {
          this.autoData=data;
        });
    },
    setSearchValue(value){
        this.searchValue = value;
        this.autoData = [];
    },
    getLawyer(){
       let url =this.GLOBAL.hostIp;
    let message = this.searchValue;
    this.$http
        .get(url + "/findAttorneyBySpeciality", {
          params: {
            message : message
          }
        })
        .then(({ data }) => {
          this.cases = data;
          for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].title = data[i].title.split(",");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.lawyer-list{
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
