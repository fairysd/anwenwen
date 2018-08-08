<template>
  <div class="home">
    <ul class="search-box"> 
          <li class="local"><img src="../../static/icons/map_03.png" alt=""><p class="city">南京市</p></li>
          <li class="input-box"><input v-on:input="getAutoData" v-model="searchValue" class="search" type="text" placeholder="请输入关键字搜索咨询"></li>
          <li class="search-btn" @click="getLawyer"><img src="../../static/icons/icon_11.png" alt=""><p class="searchFont">搜索</p></li>
      </ul>
       <ul class="auto-data">
          <li v-for="(item,index) in autoData" @click="setSearchValue(item.name.value)" :key="item.id" v-if="index<5">
              <p v-text="item.name.value"></p>
          </li>
      </ul>
      <flexbox>
          <flexbox-item>
                <div class="case-class bgimg">
                    <img src="../assets/images/pic/n-slider1.png" alt="">
                </div>                
            </flexbox-item>
      </flexbox>
     
        <flexbox class="menu one">
            <flexbox-item @click.native="checkList('婚姻家庭')">
                <div class="case-class">
                    <img src="../../static/icons/icon_1.png" alt="">
                    <p>婚姻家庭</p>
                </div>                
            </flexbox-item>
             <flexbox-item @click.native="checkList('交通事故')">
                <div class="case-class">
                    <img src="../../static/icons/icon_2.png" alt="">
                    <p>交通事故</p>
                </div> 
            </flexbox-item>
             <flexbox-item @click.native="checkList('继承纠纷')">
                <div class="case-class">
                    <img src="../../static/icons/icon_3.png" alt="">
                    <p>继承纠纷</p>
                </div> 
            </flexbox-item>
             <flexbox-item @click.native="checkList('拆迁安置')">
                <div class="case-class">
                    <img src="../../static/icons/icon_4.png" alt="">
                    <p>拆迁安置</p>
                </div> 
            </flexbox-item>
    </flexbox>
        <flexbox class="menu">
      <flexbox-item @click.native="checkList('劳动仲裁')">
          <div class="case-class">
                    <img src="../../static/icons/icon_5.png" alt="">
                    <p>劳动仲裁</p>
                </div> 
      </flexbox-item>
      <flexbox-item @click.native="checkList('消费权益')">
          <div class="case-class">
                    <img src="../../static/icons/icon_6.png" alt="">
                    <p>消费权益</p>
                </div> 
      </flexbox-item>
      <flexbox-item @click.native="checkList('刑事辩护')">
          <div class="case-class">
                    <img src="../../static/icons/icon_7.png" alt="">
                    <p>刑事辩护</p>
                </div> 
      </flexbox-item>
      <flexbox-item @click.native="checkList('人身损害')">
          <div class="case-class">
                    <img src="../../static/icons/icon_8.png" alt="">
                    <p>人身损害</p>
                </div> 
      </flexbox-item>
    </flexbox>
    <tab class="news-class" bar-active-color=""  :line-width="1">
      <tab-item v-for="item in newsClass" v-text="item.name" :key="item.oid"></tab-item>
    </tab>
    <ul class="news-content">
      <li class="content-list" v-for="item in newsList" :key="item.oid">
        <div class="text-part">
          <h4 v-text="item.title"></h4>
          <p v-text="item.desc"></p>
        </div>
        <div class="img-part">
          <img :src="item.imgSrc" alt="">
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
      newsClass: [
        { name: "分类A", oid: "as" },
        { name: "分类A", oid: "as" },
        { name: "分类A", oid: "as" },
        { name: "分类A", oid: "as" },
        { name: "分类A", oid: "as" }
      ],
      newsList: [{
        oid:"asd",
        title:"title",
        desc:"descafagfsafdgsdfgsdfgsdfg",
        imgSrc:"../../static/icons/icon_8.png"
      },
      {
        oid:"asd",
        title:"title",
        desc:"descafagfsafdgsdfgsdfgsdfg",
        imgSrc:"../../static/icons/icon_8.png"
      },
      {
        oid:"asd",
        title:"title",
        desc:"descafagfsafdgsdfgsdfgsdfg",
        imgSrc:"../../static/icons/icon_8.png"
      }]
    };
  },
  mounted() {},
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.home {
  .search-box {
    line-height: 3rem;
    background: #fff;
    border-radius: 0.2rem;
    li {
      line-height: 3rem;
      vertical-align: middle;
      display: inline-block;
      * {
        display: inline-block;
        line-height: 3rem;
      }
    }
    .local {
      img {
        width: 1rem;
        vertical-align: middle;
      }
      p {
        font-size: 0.8rem;
        vertical-align: middle;
        padding-left: 0.2rem;
      }
    }
    .input-box {
      input {
        border: none;
        text-align: center;
      }
      input:focus {
        outline: none;
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
      h4{
            color: #4d4e50;
    font-weight: 500;
    font-size: 1.2rem;
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
      }
    }
  }
}
.home img {
  width: 70%;
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
  margin-top: 1rem;
  border-top: 1px solid #e7e7e7;
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
