<template>
  <div id="findLaywer" class="lawyer-find">
    <div class="search-condition">
      <ul>
        <li>
          <el-select class="city" v-model="cityValue" @change="getLawyer" placeholder="选择城市">
            <el-option
              v-for="item in citys"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              >
            </el-option>
          </el-select>
        </li>
        <li> 
          <el-cascader placeholder="选择案由"
            :options="types"
            v-model="typeValue"
            :popper-class='typepop'
             :show-all-levels="false"
             @change="getLawyer">
          </el-cascader>         
        </li>
        <li>
          <el-select v-model="sortValue" @change="getLawyer" placeholder="智能排序">
            <el-option
              v-for="item in sorts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
      </ul>
      </div>
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
export default {
  name: "lawyerFind",
  components: { Search, Group, Cell, XButton },
  data() {
    return {
      pages:0,
      maxPage:0,
      cases: [],
      recases:[],
      newsLength:6,//初始载入数组长度
      citys: [],
      types:[],
      sorts:[
          {
          value: 'particleyear:desc',
          label: '智能排序'
        }
      ],
      cityValue:'',
      typeValue:[],
      sortValue:'',
      typepop : "typepop",
      //cityName:"南京市"
    };
  },
  mounted() {
    let self = this;
    this.sortValue = "particleyear:desc";
    this.cityValue = "320101";
    let url = this.GLOBAL.hostIp;
    let message = this.$route.params.msg;
    this.$http.get(url + "/getCity").then(({ data }) => {
      this.citys = data;
    });
    this.$http.get(url + "/getReasonType").then(({ data }) => {      
      let datas = data.data;      
      let marray = datas.mainReason;
      let sarray = datas.simpleReason;
      let jarray = [];
      let narray = [];     
      for (let i = 0; i < marray.length; i++) {  
        let carray = [];
         for (let j = 0; j < sarray.length; j++) {    
          if (sarray[j].code.indexOf(marray[i].code) == 0) {
            carray.push({
              value:sarray[j].name,
              label:sarray[j].name
            })
          }      
        }              
        narray.push({
          value:marray[i].code,
          label:marray[i].name,
          children:carray
        })
      }
      this.types = narray;
      this.getLawyer();
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
  methods: {
    getDetails(oid) {
      this.$router.push({ name: "lawyerDetail", params: { id: oid } });
    },
    setSearchValue(value) {
      this.searchValue = value;
      this.autoData = [];
    },
    getLawyer() {
      let url = this.GLOBAL.hostIp;
      let type = this.typeValue[1];
      let city = this.cityValue;
      let sort = this.sortValue;
      if (!type) {
        type='';
      }
      this.$http
        .get(url + "/findAttorneyBySpeciality", {
          params: {
            message:type,
            cityCode: city,
            sortBy:sort
          }
        })
        .then(({ data }) => {
          this.cases = data;
          this.recases = data;
          this.maxPage = data.maxPage;
          for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].title = data[i].title.split(",");
          }
        });
    },

     // 加载律师
    setlawyerLength(length) {
      //console.log(length,this.recases.length,this.cases.length);
      //当滚动长度 大于数组长度时，新增元素
      if(length > this.recases.length){


        //当前页数大于最大页数时
        if(this.pages >= this.maxPage ){
          this.isBottom = true;
          return this;
        }

        let url = this.GLOBAL.hostIp;
        let type = this.typeValue[1];
        let city = this.cityValue;
        this.pages ++;
        this.$http
        .get(url + "/findAttorneyBySpeciality", {
         params: {
            message : type,
            cityCode : city,
            page:this.pages
          }
        })
        .then(({ data }) => {
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

<style lang="less">
@import "~vux/src/styles/1px.less";
#findLaywer {
  font-size: 0.8rem;
  .el-input--suffix .el-input__inner{
    border: none;
    text-align: center;
  }
  .search-condition{
    border-bottom: 1px solid #e7e7e7;
    ul>li{
      display: inline-block;
      width: 32%;
    }
  }
  .body {
    border-bottom: 1px dotted #d5d5d6;
    padding-bottom: 0.5rem;
  }
  .name {
    color: #4d4e50;
    font-weight: 500;
  }
  .workage {
    color: #f9ab13;
    font-size: 0.6rem;
    margin-left: 0.8rem;
  }
  .local {
    color: #7e7e7f;
    font-size: 0.6rem;
  }
  .label {
    display: inline-block;
    padding: 0.2rem 0.3rem;
    border: 1px solid #4f88f7;
    font-size: 0.45rem;
    border-radius: 0.3rem;
    color: #4f88f7;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
    line-height: 0.7rem;
  }
  .recent {
    color: #a1a1a2;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.5rem;
  }
  .body {
    margin: 0.3rem 0;
  }
  .photo {
    text-align: center;
  }
  .lawyer-photo {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 5.5rem;
    margin-top: -0.2rem;
  }
  .auto-data {
    float: left;
    position: relative;
    text-align: left;
    top: 0rem;
    height: 0;
    li {
      width: 18rem !important;
      border: 1px solid #e7e7e7;
      background: #fff;
    }
    p {
      padding: 2px 5px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
