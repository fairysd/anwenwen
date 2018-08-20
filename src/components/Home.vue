<template>
  <div class="home">
    <ul class="search-box"> 
          <li class="local"><img src="../../static/icons/map_03.png" alt=""><p class="city">南京市</p></li>
          <li class="input-box"><input v-on:input="getAutoData" v-model="searchValue" class="search" type="text" placeholder="请输入关键字搜索咨询"><img @click="getLawyer" src="../../static/icons/icon_11.png" alt=""></li>
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
                    <img src="../assets/images/pic/n-slider1.png" alt="">
                </div>                
            </flexbox-item>
      </flexbox>   
      <flexbox class="">
          <flexbox-item class="divider">                            
            </flexbox-item>
      </flexbox>   
        <flexbox class="menu one">
            <flexbox-item @click.native="checkList('婚姻家庭')">
                <div class="case-class">
                    <img src="../../static/icons/1.png" alt="">
                    <p>婚姻家庭</p>
                </div>                
            </flexbox-item>
             <flexbox-item @click.native="checkList('交通事故')">
                <div class="case-class">
                    <img src="../../static/icons/2.png" alt="">
                    <p>交通事故</p>
                </div> 
            </flexbox-item>
             <flexbox-item @click.native="checkList('继承纠纷')">
                <div class="case-class">
                    <img src="../../static/icons/3.png" alt="">
                    <p>继承纠纷</p>
                </div> 
            </flexbox-item>
             <flexbox-item @click.native="checkList('拆迁安置')">
                <div class="case-class">
                    <img src="../../static/icons/4.png" alt="">
                    <p>拆迁安置</p>
                </div> 
            </flexbox-item>
    </flexbox>
        <flexbox class="menu two">
      <flexbox-item @click.native="checkList('劳动仲裁')">
          <div class="case-class">
                    <img src="../../static/icons/5.png" alt="">
                    <p>劳动仲裁</p>
                </div> 
      </flexbox-item>
      <flexbox-item @click.native="checkList('消费权益')">
          <div class="case-class">
                    <img src="../../static/icons/6.png" alt="">
                    <p>消费权益</p>
                </div> 
      </flexbox-item>
      <flexbox-item @click.native="checkList('刑事辩护')">
          <div class="case-class">
                    <img src="../../static/icons/7.png" alt="">
                    <p>刑事辩护</p>
                </div> 
      </flexbox-item>
      <flexbox-item @click.native="checkList('人身损害')">
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
    <tab class="news-class" bar-active-color=""  :line-width="1">
      <tab-item v-for="(item) in newsClass" v-text="item.name" :key="item.code" @on-item-click="getNewsList(item.code)" :selected="item.select"></tab-item>
    </tab>
    <ul class="news-content">
      <li class="content-list" v-for="(item,index) in newsList" :key="item.oid" @click="getNewsDetail(item.oid)">
        <div class="text-part">
          <h4 v-text="item.title"></h4>
          <p v-text="item.content"></p>
        </div>
        <div class="img-part">
          <img v-for="(img,index) in item.imgPath"  :src="img" alt="" v-if="index<1">
        </div>               
      </li>
    </ul>
  </div>
</template>

<script>
import { Panel, Search, Tab, TabItem } from "vux";
export default {
  components: { Panel, Search, Tab, TabItem },
  data() {
    return {
      searchValue: "",
      autoData: [],
      newsClass: [],
      newsList: [],
      isLogin: false
    };
  },
  mounted() {
    let url = this.GLOBAL.hostIp;
    let userid = this.common.getCookie("userId");
    this.$http
      .post(url + "order/CheckLogin",this.qs.stringify({
        userid: userid
      }) )
      .then(({ data }) => {
        if (data.code !== 1) {
          this.$router.push({ name: "login"});
        }
        if (userid) {
          this.isLogin = true;
        }
        if (!this.isLogin) {
          this.$router.push({ name: "login" });
        }
      })
      .then(data => {
        if (this.isLogin) {
          this.$http
            .get(url + "/order/getArticleCategory", {
              params: {
                key: 0
              }
            })
            .then(({ data }) => {
              if (data) {
                this.newsClass = data.data;
                this.newsClass[0].select = true;
                this.getNewsList(1);
              }
            });
        }
      });
    //
  
  },
  methods: {
    checkList(msg) {
      this.$router.push({ name: "lawyerList", params: { msg: msg } });
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
      this.$router.push({ name: "lawyerList", params: { msg: message } });
    },
    getNewsList(code) {
      let url = this.GLOBAL.hostIp;
      this.$http
        .get(url + "/order/getArticeList", {
          params: {
            category: code
          }
        })
        .then(({ data }) => {
          if (data) {
            this.newsList = data.data;
          }
        });
    },
    getNewsDetail(id) {
      this.$router.push({ name: "newsDetail", params: { id: id } });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.home {
  .divider {
    height: 10px;
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
      padding-left: 1.2rem;
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
      padding-left: 1rem;
      padding-right: 1rem;
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
  .address {
    background-position: 0 0.1rem;
    .city {
      font-size: 0.8rem;
    }
  }
  .news-content {
    text-align: left;
    li {
      padding-left: 3%;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e7e7e7;
    }
    li > div {
      display: inline-block;
    }
    .text-part {
      width: 70%;
      vertical-align: middle;
      h4 {
        color: #4d4e50;
        font-weight: 500;
        font-size: 1.2rem;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        color: #b7b8b8;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .img-part {
      width: 25%;
      vertical-align: bottom;
      img {
        display: block;
        margin: auto;
        height: 3.2rem;
      }
    }
  }
  .bgimg {
  }
  .menu.two{
    margin-bottom: 2.0rem;
  }
  .menu p {
    color: #575757;
  }
}
.home img {
  width: 42%;
}
.home .bgimg img {
  width: 100%;
  display: block;
}
.case-class {
  text-align: center;
  color: #2d374b;
}
.menu {
  margin-top: 2.5em;
}
// .menu.one {
//   margin-top: 0;
// }
.news-class {
  margin-top: 0rem;
  border-top: 1px solid #e7e7e7;
  height: 3rem;
  padding-top:0;
}
.weui-panel__hd {
  color: #000 !important;
  font-size: 1.2em !important;
}
.auto-data {
  float: left;
  position: relative;
  text-align: left;
  top: 0;
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
</style>
