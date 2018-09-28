<template>
  <div id="home">
    <ul class="search-box"> 
          <li class="local"><img src="../../static/icons/map_03.png" alt="">
            <!-- <p class="city">南京市</p> -->
            <el-select class="city" v-model="cityValue" :disabled="selected"  placeholder="选择城市" @change="setCityStorage">
              <el-option
                v-for="item in citys"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                >
              </el-option>
            </el-select>
          </li>
          <li class="input-box">
            <input v-on:input="getAutoData" v-model="searchValue" class="search" type="text" placeholder="输入关键字搜索咨询">
            <img @click="getLawyer" src="../../static/icons/icon_11.png">
          </li>
          <li class="search-btn"></li>
      </ul>
       <ul class="auto-data">
          <li v-for="(item,index) in autoData" @click="setSearchValue(item.name.value)" :key="item.id" v-if="index<5">
              <p v-text="item.name.value"></p>
          </li>
      </ul>
      <flexbox class="">
          <flexbox-item>
                <div class="case-class bgimg">
                    <img src="../assets/images/pic/n-slider1.jpg" alt="">
                </div>                
            </flexbox-item>
      </flexbox>   
      <flexbox class="">
          <flexbox-item class="divider">                            
            </flexbox-item>
      </flexbox>   
        <flexbox class="menu one">
            <flexbox-item @click.native="checkList('婚姻家庭',cityValue)">
                <div class="case-class">
                    <img src="../../static/icons/1.png" alt="">
                    <p>婚姻家庭</p>
                </div>                
            </flexbox-item>
             <flexbox-item @click.native="checkList('交通事故',cityValue)">
                <div class="case-class">
                    <img src="../../static/icons/2.png" alt="">
                    <p>交通事故</p>
                </div> 
            </flexbox-item>
             <flexbox-item @click.native="checkList('继承纠纷',cityValue)">
                <div class="case-class">
                    <img src="../../static/icons/3.png" alt="">
                    <p>继承纠纷</p>
                </div> 
            </flexbox-item>
             <flexbox-item @click.native="checkList('拆迁安置',cityValue)">
                <div class="case-class">
                    <img src="../../static/icons/4.png" alt="">
                    <p>拆迁安置</p>
                </div> 
            </flexbox-item>
        </flexbox>
        <flexbox class="menu two">
          <flexbox-item @click.native="checkList('劳动仲裁',cityValue)">
              <div class="case-class">
                        <img src="../../static/icons/5.png" alt="">
                        <p>劳动仲裁</p>
                    </div> 
          </flexbox-item>
          <flexbox-item @click.native="checkList('消费权益',cityValue)">
              <div class="case-class">
                        <img src="../../static/icons/6.png" alt="">
                        <p>消费权益</p>
                    </div> 
          </flexbox-item>
          <flexbox-item @click.native="checkList('刑事辩护',cityValue)">
              <div class="case-class">
                        <img src="../../static/icons/7.png" alt="">
                        <p>刑事辩护</p>
                    </div> 
          </flexbox-item>
          <flexbox-item @click.native="checkList('人身损害',cityValue)">
              <div class="case-class">
                        <img src="../../static/icons/8.png" alt="">
                        <p>人身损害</p>
                    </div> 
          </flexbox-item>
      </flexbox>
    <flexbox class="">
      <flexbox-item class="divider">                            
      </flexbox-item>
    </flexbox>
    <!-- <divider>{{ $t('set bar-active-color')}}</divider> -->
    <tab bar-active-color="#4f88f7" class="news-class" :line-width="1" :custom-bar-width="getBarWidth">
      <tab-item v-for="(item) in newsClass" v-text="item.name" :key="item.code" @on-item-click="getNewsList(item.code)" :selected="item.select"></tab-item>
    </tab>


    <ul class="news-content">
      <li class="content-list" v-for="(item,index) in topNewsList" :key="item.oid" @click="getNewsDetail(item.oid)">
        <div :class="item.imgPath.length>0? 'text-part' : '' ">
          <h4 v-text="item.title"></h4>
          <p v-text="item.content"></p>
        </div>
        <div :class="item.imgPath.length>0? 'img-part' : '' ">
          <img v-for="(img,index) in item.imgPath"  :src="img" alt="" v-if="index<1">
        </div>
      </li>
    </ul>

    <div class="list-body">
      <flexbox class="body" v-for="item in cases" @click.native="getDetails(item.oid)" :key="item.oid">
          <flexbox-item :span="2">
            <div class="list-item photo">
               <img class="lawyer-photo" :src="item.imagepath" style="">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="list-item info">
              <span class="name" v-text="item.name+'  律师'"></span>
              <img src="../assets/images/icons/experienceIcon.png" alt="">
              <span class="workage" v-text="item.workage+'年经验'"></span>
            </div>
            <div class="list-item info">
              <p class="local" v-text="item.lawoffice"></p>
            </div>
            <div class="list-item info">
              <span  v-for="(labels,index) in item.title" v-if="index<3" :key="index">
                <span class="label" v-text="labels"></span>
              </span>
            </div>
            <!-- <div class="list-item">
              <p  v-for="(labels,index) in item.title" v-if="index<3" :key="index">
                <span class="label" v-text="labels"></span>
              </p>
            </div>            
            <div class="list-item">
              <p class="recent" v-text="item.introduce"></p>
            </div> -->
          </flexbox-item>
      </flexbox>
    </div>
    <ul class="news-content">
      <li class="content-list" v-for="(item,index) in newsList" :key="item.oid" @click="getNewsDetail(item.oid)">
        <div :class="item.imgPath.length>0? 'text-part' : '' ">
          <h4 v-text="item.title"></h4>
          <p v-text="item.content"></p>
        </div>
        <div :class="item.imgPath.length>0? 'img-part' : '' " v-if="item.imgPath.length>0">
          <img v-for="(img,index) in item.imgPath"  :src="img" alt="" v-if="index<1">
        </div>
      </li>
      <li v-show="isBottom" style="padding-bottom:1rem;text-align:center;color:#b7b8b8">这是我们共同的底线</li>
    </ul>
  </div>
</template>



<script>
import {
  Panel,
  Search,
  Tab,
  TabItem,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: { Panel, Search, Tab, TabItem },
  data() {
    return {
      cases: [],
      citys: [],
      cityValue: "",
      searchValue: "",
      autoData: [],
      newsClass: [],
      newsList: [],
      topNewsList: [],
      isLogin: false,
      userState: 0,
      newsListClone: [],
      pages: 1,
      selected: false,
      maxPage: 0,
      catagoryCode: "1",
      isLogin: true,
      newsLength: 3, //初始载入数组长度
      isBottom: false,
      officeCode: "",
      getBarWidth: function() {
        return (3 + 1) * 22 + "px";
      }
    };
  },
  created() {},
  mounted() {
    let storage = window.localStorage;
    let self = this;
    // this.cityValue = "320101";
    let url = this.GLOBAL.hostIp;
    let userid = this.common.getCookie("userId");
    // loading
    // this.timer = setInterval(() => {}, 1000);
    let officeCode = this.$route.query.officeCode;
    if (officeCode == ''||officeCode) {
      storage.setItem("officeCode", officeCode);      
      if (officeCode != "") {
        this.selected = true;
        let cityCode = officeCode.substring(0, 4);
       storage.setItem("localCityCode", cityCode);
      } else {
        this.selected = false;
      }
    } else {
      let officeCode = storage.getItem("officeCode");
      if (officeCode != "") {
        this.selected = true;
      } else {
        this.selected = false;
      }
      // storage.setItem("officeCode","");
    }
    this.$http
      .post(
        url + "order/CheckLogin",
        this.qs.stringify({
          userid: userid
        })
      )
      .then(({ data }) => {
        this.userState = data.code;
        if (data.code !== 0) {
          let url = this.GLOBAL.host;
          let callbackurl = this.GLOBAL.callbackurl;
          let debug = this.GLOBAL.isDebugger;

          //location.href =url+"api/order/WeChatLogin?returnUrl="+encodeURIComponent(callbackurl+"state")
          if (!debug) {
            location.href =
              url +
              "api/order/WeChatLogin?returnUrl=" +
              encodeURIComponent(callbackurl + "state");
          } else {
            location.href =
              "http://localhost:8080/#/state?code=081YUQ9t1px6Ic0vBQat1vTV9t1YUQ9c&state=STATE";
          }
        }
        if (userid && this.userState == 0) {
          this.isLogin = true;
        }
        if (!this.isLogin) {
          let url = this.GLOBAL.host;
          let callbackurl = this.GLOBAL.callbackurl;
          let debug = this.GLOBAL.isDebugger;

          //location.href =url+"api/order/WeChatLogin?returnUrl="+encodeURIComponent(callbackurl+"state")
          if (!debug) {
            location.href =
              url +
              "api/order/WeChatLogin?returnUrl=" +
              encodeURIComponent(callbackurl + "state");
          } else {
            location.href =
              "http://localhost:8080/#/state?code=081YUQ9t1px6Ic0vBQat1vTV9t1YUQ9c&state=STATE";
          }
        }
      })
      .then(data => {
        if (this.isLogin) {          
          this.$http
            .get(url + "/order/getArticleCategory", {
              params: {
                key: 0,
                officeCode: officeCode
              }
            })
            .then(({ data }) => {
              if (data) {
                this.newsClass = data.data;
                this.newsClass[0].select = true;
                this.getNewsList(1, this.pages);
                this.getTopNewsList();
                this.getArticleLawyer();
              }
            });
        }
      });
    //
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
        self.setNewsLength(self.newsLength);
        self.newsLength += 3; //每次数组长度加多少
      }
    };

    // 首页多城市
    this.$http.get(url + "/getCity").then(({ data }) => {
      this.citys = data;
    });
    let stroage = window.localStorage;
    let cityCode = stroage.getItem("localCityCode");
    if (cityCode) {
      this.cityValue = cityCode;
    } else {
      this.cityValue = "3201";
    }
    // 获取文章推荐律师

    // 获取置顶文章
  },
  methods: {
    // showLoading () {
    //   this.$vux.loading.show({
    //     text: 'Loading'
    //   })
    //   setTimeout(() => {
    //     this.$vux.loading.hide()
    //   }, 2000)
    // },
    getDetails(oid) {
      this.$router.push({ path: "lawyerDetails/lawyerDetail?id=" + oid });
    },
    checkList(msg, code) {
      this.$router.push({
        name: "lawyerList",
        params: { msg: msg, cityCode: code }
      });
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
          this.autoData = data;
        });
    },
    setSearchValue(value) {
      this.searchValue = value;
      this.autoData = [];
    },
    getLawyer() {
      let message = this.searchValue;

      let city = this.cityValue;
      this.$router.push({
        name: "lawyerList",
        params: { msg: message, cityCode: city }
      });
    },
    // 获取置顶文章
    getTopNewsList() {
      let url = this.GLOBAL.hostIp;
      this.$http
        .get(url + "/order/topArticleList", {
          params: {
            category: this.catagoryCode
          }
        })
        .then(({ data }) => {
          if (data) {
            if (data.data.length > 3) {
              this.topNewsList = data.data.slice(0, 3);
            } else {
              this.topNewsList = data.data;
            }
          }
        });
    },
    // 获取文章推荐律师
    getArticleLawyer() {
      let storage = window.localStorage;
      let url = this.GLOBAL.hostIp;
      let officeCode = storage.getItem("officeCode");
      this.$http
        .get(url + "/order/getLawyerArticleCatalog", {
          params: {
            catalogKey: this.catagoryCode,
            cityCode: this.cityValue,
            officeCode: officeCode
          }
        })
        .then(({ data }) => {
          if (data) {
            this.cases = data.data;
            for (let i = 0; i < this.cases.length; i++) {
              this.cases[i].title = data.data[i].title.split(",");
              // this.cases[i].title.pop();
              // data.data[i].title.split(",").pop();
            }
          }
        });
    },
    getNewsList(code) {
      this.catagoryCode = code;
      this.getTopNewsList();
      this.getArticleLawyer();
      let url = this.GLOBAL.hostIp;

      this.$http
        .get(url + "/order/getArticeList", {
          params: {
            category: code
          }
        })
        .then(({ data }) => {
          if (data) {
            //this.newsLength = 1;
            this.newsList = data.data.slice(0, this.newsLength);
            this.newsListClone = data.data;
            this.maxPage = data.maxPage;
            this.isBottom = false;
          }
        });
    },
    getNewsDetail(id) {
      let stroage = window.localStorage;
      stroage.setItem("articleId", id);
      this.$router.push({ name: "newsDetail", params: { id: id } });
    },

    setNewsLength(length) {
      //当滚动长度 大于数组长度时，新增元素
      if (length > this.newsListClone.length) {
        //当前页数大于最大页数时
        if (this.pages >= this.maxPage) {
          this.isBottom = true;
          return this;
        }

        let url = this.GLOBAL.hostIp;
        this.$http
          .get(url + "/order/getArticeList", {
            params: {
              category: this.catagoryCode,
              page: this.pages
            }
          })
          .then(({ data }) => {
            if (data) {
              //this.newsLength = 1;
              for (let i = 0; i < data.data.length; i++) {
                this.newsListClone.push(data.data[i]);
              }
              this.maxPage = data.maxPage;
              this.isBottom = false;
              //  //截取指定元素
              //  this.newsList = this.newsListClone.slice(0,length)
            }
          });

        this.pages++;
      }
      //截取指定元素
      this.newsList = this.newsListClone.slice(0, length);

      if (this.newsListClone.length <= length) {
        this.isBottom = true;
      }
    },
    setCityStorage() {
      let stroage = window.localStorage;
      let cityCode = this.cityValue;
      stroage.setItem("localCityCode", cityCode);
      this.getArticleLawyer();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
#home {
  font-size: 0.8rem;
  /deep/ .el-input--suffix .el-input__inner {
    border: none;
    padding: 0;
    width: 4.3rem;
    font-size: 0.8rem;
    color: #a1a2a2;
  }
  .scrollable .vux-tab-item[data-v-fed36922] {
    font-size: 0.8rem;
  }
  .scrollable .vux-tab-item[data-v-fed36922] {
    flex: 0 0 22%;
  }
  .xzClass {
    display: block;
    height: 1px;
    left: 0%;
    right: 74%;
  }
  .divider {
    height: 0.5rem;
    background-color: #f0f0f0;
  }
  .search-box {
    line-height: 2rem;
    background: #fff;
    text-align: left;
    color: #a1a1a2;
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
      height: 2.2rem;
      width: 5.5rem;
      img {
        width: 0.7rem;
        padding-right: 0.1rem;
        vertical-align: middle;
      }
      p {
        font-size: 0.8rem;
        vertical-align: middle;
        padding-left: 0.2rem;
      }
    }
    .input-box {
      width: 12rem;
      padding-left: 0.5rem;
      background-color: #f5f5f5;
      border-radius: 1.2rem;
      > * {
        display: inline-block;
      }
      input {
        color: #a1a1a2;
        border: none;
        text-align: left;
        width: 9.5rem;
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
  .address {
    background-position: 0 0.1rem;
    .city {
      font-size: 0.8rem;
    }
  }
  // 律师展示样式
  .photo {
    text-align: center;
  }
  .lawyer-photo {
    width: 3.3rem;
    height: 3.3rem;
    border-radius: 5.5rem;
    margin-top: -0.2rem;
  }
  .body {
    border-bottom: 1px dotted #d5d5d6;
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
    padding-left: 0.8rem;
    padding-bottom: 0.2rem;
  }
  .info {
    padding-left: 1rem;
    line-height: 1rem;
    img {
      width: 0.8rem;
      vertical-align: middle;
    }
  }
  .name {
    color: #000;
    font-weight: 900;
    font-size: 0.8rem;
    padding-bottom: 0.2rem;
    margin-right: 1rem;
  }
  .workage {
    color: #fa7e34;
    font-size: 0.6rem;
    padding-bottom: 0.2rem;
    // margin-left: 0.8rem;
  }
  .local {
    color: #a1a1a2;
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
  // 结束
  .news-content {
    text-align: left;
    li {
      padding-left: 3%;
      padding-right: 3%;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e3e3e6;
    }
    li > div {
      display: inline-block;
      width: 100%;
    }
    .text-part {
      width: 72%;
      vertical-align: middle;
    }
    .content-list h4 {
      color: #000;
      font-weight: 900;
      font-size: 0.86rem;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content-list p {
      color: #a1a1a2;
      font-size: 0.6rem;
      // word-break: keep-all;
      // white-space: nowrap;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .img-part {
      width: 25%;
      vertical-align: middle;
      img {
        display: block;
        margin: auto;
        height: 2.9rem;
        width: 5rem;
      }
    }
  }
  .menu.two {
    margin-bottom: 0.6rem;
  }
  .menu p {
    color: #575757;
    font-size: 0.67rem;
  }

  .vux-tab .vux-tab-item.vux-tab-selected {
    color: #4f88f7;
    border-bottom: 3px solid #4f88f7;
  }
}
#home img {
  width: 42%;
}
#home .bgimg img {
  width: 100%;
  height: 8.26rem;
  display: block;
}
.case-class {
  text-align: center;
  color: #2d374b;
}
.menu {
  margin-top: 0.8em;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #a1a1a2;
}
// .menu.one {
//   margin-top: 0;
// }
.news-class {
  margin-top: 0rem;
  border-top: 1px solid #e3e3e6;
  height: 2.3rem;
  padding-top: 0;
}
.weui-panel__hd {
  color: #000 !important;
  font-size: 1.2em !important;
}
.auto-data {
  float: right;
  margin-right: 0.5rem;
  position: relative;
  text-align: left;
  top: 0;
  height: 0;
  li {
    width: 16rem !important;
    border: 1px solid #e3e3e6;
    background: #fff;
    height: 3rem;
    list-style: none;
    line-height: 3rem;
  }
  p {
    padding-left: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.7rem;
  }
}
// 文章类型样式
.scrollable .vux-tab-item {
  flex: 0 0 26%;
  font-size: 0.87rem;
  color: #7e7e7e;
}
</style>
