<template>
  <div class="lawyer-list">
    <ul class="search-box"> 
          <li class="local"><img src="../../../static/icons/map_03.png" alt="">
            <el-select class="city" v-model="cityValue"  placeholder="选择城市">
              <el-option
                v-for="item in citys"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                >
              </el-option>
            </el-select>
          </li>
          <li class="input-box"><input v-on:input="getAutoData" v-model="searchValue" class="search" type="text" placeholder="请输入关键字搜索咨询"><img @click="getLawyer" src="../../../static/icons/icon_11.png" alt=""></li>
          <li class="search-btn"></li>
      </ul>
       <ul class="auto-data">
          <li v-for="(item,index) in autoData" @click="setSearchValue(item.name.value)" :key="item.id" v-if="index<5">
              <p v-text="item.name.value"></p>
          </li>
      </ul>
      <flexbox class="">
          <flexbox-item class="divider">                            
            </flexbox-item>
      </flexbox>  
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
import { Search, Group, Cell, XButton } from "vux";
import { defaultCipherList } from 'constants';
export default {
  name: "caseList",
  components: { Search, Group, Cell, XButton },
  data() {
    return {
      citys: [],
      pages:0,
      maxPage:0,
      cityValue:'',
      searchValue:this.$route.params.msg,      
      autoData:[],
      cases: [],
      recases:[],
      newsLength:6,//初始载入数组长度
      isBottom:false,
    };
  },
  mounted(){
    let self = this;
    let url =this.GLOBAL.hostIp;
    console.log(this,self)
    let message = this.$route.params.msg;
    let cityCode = this.$route.params.cityCode;
    this.inputContent = message;
    this.cityValue = cityCode;

    this.$http
        .get(url + "/findAttorneyBySpeciality", {
          params: {
            message : message,
            cityCode : cityCode,
            page:this.pages
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.cases = data;
          this.recases = data;
          this.maxPage = data.maxPage;
          for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].title = data[i].title.split(",");
          }
        });
      // 律师页多城市
      this.$http.get(url + "/getCity").then(({ data }) => {
      this.citys = data;
    });

     //律师加载
      window.onscroll = function() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if ((scrollTop + windowHeight).toFixed(0) == scrollHeight) {
        //写后台加载数据的函数
        self.setlawyerLength(self.newsLength);
        //self.getLawyer();
        self.newsLength+=6//每次数组长度加多少
      }
    };
  },
  methods:{
    // 跳转到律师详情页
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
    // 搜索框搜索律师
    getLawyer(){
      let url =this.GLOBAL.hostIp;
      let message = this.searchValue;
      let city = this.cityValue;
      this.$http
        .get(url + "/findAttorneyBySpeciality", {
          params: {
            message : message,
            cityCode:city
          }
        })
        .then(({ data }) => {
          this.cases = data;

          for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].title = data[i].title.split(",");
          }
          this.cases = data.slice(0,this.newsLength);
          this.recases = data;
          this.maxPage = data.maxPage;
          this.isBottom = false;  
        });
    },
    // 加载律师
    setlawyerLength(length) {
      console.log(length,this.recases.length,this.cases.length);
      //当滚动长度 大于数组长度时，新增元素
      if(length > this.recases.length){


        //当前页数大于最大页数时
        console.log(this.maxPage)
        if(this.pages >= this.maxPage ){
          this.isBottom = true;
          return this;
        }

        let url = this.GLOBAL.hostIp;
        let message = this.searchValue;
        let city = this.cityValue;
        this.pages ++;
        this.$http
        .get(url + "/findAttorneyBySpeciality", {
         params: {
            message : message,
            cityCode : city,
            page:this.pages
          }
        })
        .then(({ data }) => {
          console.log(data);
          if (data) {
            //this.newsLength = 1;
            for (let i = 0; i < data.length; i++) {
              data[i].title = data[i].title.split(",");
            }
            for(let i =0;i < data.length ;i++){
                this.recases.push(data[i])
            }
            this.maxPage = data.maxPage;
            this.isBottom = false; 
          //  //截取指定元素
          //  this.newsList = this.newsListClone.slice(0,length)
          }
        });
      
      }
      
      //截取指定元素
      this.cases = this.recases.slice(0,length)
      
      if (this.recases.length <= length) {
        this.isBottom = true;
      }


    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.lawyer-list{
  font-size:0.8rem;
   /deep/ .el-input--suffix .el-input__inner{
    border: none;
    padding: 0;
    width: 4.3rem;
    font-size:0.8rem;
  }
  .divider {
    height: 0.5rem;
    background-color: #f0f0f0;
  }
  .search-box {
    line-height: 2.5rem;
    background: #fff;
    text-align: left;
    color: #a1a2a2;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    li {
      vertical-align: middle;
      display: inline-block;
      * {
        display: inline-block;
      }
    }
    .local {
      padding-left: 0.5rem;
      width:5.5rem;
      img {
        width: 0.8rem;
        vertical-align: middle;
         padding-right: 0.1rem;
        // padding-right: 0.5rem;
      }
      p {
        font-size: 0.8rem;
        vertical-align: middle;
        padding-left: 0.2rem;
      }
    }
    .input-box {
      width:13rem;
      padding-left: 0.5rem;
      background-color: #f5f5f5;
      border-radius: 1.2rem;
      > * {
        display: inline-block;
      }
      input {
        color: #a1a2a2;
        border: none;
        text-align: left;
        width:10.5rem;
        background: transparent;
      }
      input:focus {
        outline: none;
      }
      img {
        width: 1rem;
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
        margin:0.3rem 0;
  }
  .name{
    color: #4d4e50;
    font-weight: 500;
    font-size:0.8rem;
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
    padding: 0.2rem 0.3rem;
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
