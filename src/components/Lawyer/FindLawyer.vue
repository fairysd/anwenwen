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
          <el-cascader
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
      cases: [],
      citys: [],
      types:[{
          value: 'minshi',
          label: '民事类',
          children: [{
            value: 'yiban',
            label: '一般民事',            
          }, {
            value: 'hetong',
            label: '合同纠纷',            
          }]
        }
      ],
      sorts:[
          {
          value: 'ai',
          label: '智能排序'
        }, {
          value: 'distance',
          label: '距离'
        },
        ],
        cityValue:'',
        typeValue:[],
        sortValue:'',
        typepop : "typepop"
    };
  },
  mounted() {
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
      for (let j = 0; j < sarray.length; j++) {          
          jarray.push({
            value:sarray[j].code,
            label:sarray[j].name,
          })          
        }  
      for (let i = 0; i < marray.length; i++) {              
        narray.push({
          value:marray[i].code,
          label:marray[i].name,
          children:jarray
        })
      }
      this.types = narray;
    });
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
      console.log(1)
      console.log(type)
      console.log(city)
      console.log(sort)
      // this.$http
      //   .get(url + "/findAttorneyBySpeciality", {
      //     params: {
      //       message: message
      //     }
      //   })
      //   .then(({ data }) => {
      //     this.cases = data;
      //     for (let i = 0; i < this.cases.length; i++) {
      //       this.cases[i].title = data[i].title.split(",");
      //     }
      //   });
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
    color: #878889;
    font-size: 0.6rem;
  }
  .label {
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
  .recent {
    color: #b7b8b8;
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
