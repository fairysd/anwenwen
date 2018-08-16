<template>
  <div class="news-detail">
      <flexbox>      
        <flexbox-item class="btn submit-btn">
            <div class="content">                
                <h4 v-text="newsModel.title" class=""></h4>                
                <p v-text="newsModel.createTime"></p>
                <img :src="newsModel.images[0]" alt="">
            </div>
        </flexbox-item>
      </flexbox>
      <flexbox>      
        <flexbox-item class="words">
            <div v-html="words"></div>
        </flexbox-item>
      </flexbox>
      <div class="btn-box">
          <button v-show="showloadmore" @click="loadmore" class="load">查看全文 ▼</button>
          <button v-show="showloadless" @click="loadless" class="load">收起 ▲</button>
      </div>
       <flexbox class="consult-box consult-boxone" >
          <flexbox-item :span=6>
              <div class="consultfree">
                  <img src="../../assets/images/icons/icon_05.png" alt="">
                  <p>免费咨询</br><span>免费咨询1分钟响应</span></p>
              </div>
          </flexbox-item>
          <flexbox-item :span=6>
              <a class="consultcall" href="tel:15806213493">
                  <img src="../../assets/images/icons/icon_05.png" alt="">
                  <p style="color:#080808;">电话咨询</br><span>电话沟通更高效</span></p>
              </a>
          </flexbox-item>          
      </flexbox>
       <flexbox class="consult-box" >
          <flexbox-item :span=6>
              <div class="consultfree">
                  <img src="../../assets/images/icons/icon_05.png" alt="">
                  <p>代写文书</br><span>量身定制满意为止</span></p>
              </div>
          </flexbox-item>
          <flexbox-item :span=6>
              <div class="consultcall" href="tel:15806213493">
                  <img src="../../assets/images/icons/icon_05.png" alt="">
                  <p style="color:#080808;">文书模板</br><span>文书模板desc</span></p>
              </div>
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
import contentHeader from "../Content/contentHeader";
import { Search, Group, Cell, XButton, Panel } from "vux";
export default {
  name: "caseDetail",
  components: { contentHeader, Search, Group, Cell, XButton, Panel },
  data() {
    return {
      showloadmore: true,
      showloadless: false,
      newsModel: {
        images: []
      },
      words: "",
      lesswords: "",
      morewords: "",

      cases: []
    };
  },
  mounted() {
    let url = this.GLOBAL.hostIp;
    let id = this.$route.params.id;
    this.$http
      .get(url + "/order/articeDetail", {
        params: {
          id: id
        }
      })
      .then(({ data }) => {
        this.newsModel = data.data;
        this.morewords = data.data.content;
      });
    ////临时数据
    this.$http
      .get(url + "/findAttorneyBySpeciality", {
        params: {
          message: "交通事故"
        }
      })
      .then(({ data }) => {
        this.cases = data;
        for (let i = 0; i < this.cases.length; i++) {
          this.cases[i].title = data[i].title.split(",");
        }
      });
  },
  methods: {
    loadmore() {
      this.showloadmore = false;
      this.showloadless = true;
      this.words = this.morewords;
    },
    loadless() {
      this.showloadmore = true;
      this.showloadless = false;
      this.words = this.lesswords;
    },
    getDetails(oid) {
      this.$router.push({ name: "lawyerDetail", params: { id: oid } });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.news-detail {
  .content {
    padding: 0 1rem 0 1rem;
    h4 {
      padding: 1rem 0 1rem 0;
      font-size: 1.4rem;
      line-height: 1.4rem;
    }
    p {
      padding: 0 0 1rem 0;
    }
    img {
      width: 100%;
    }
  }

  .words {
    font-size: 0.7rem;
    color: #838485;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }
  .load {
    width: 8rem;
    color: #fa8004;
    border: 1px solid #fa8004;
    border-radius: 3rem;
    margin-right: 0.3rem;
    height: 2rem;
    font-size: 0.9rem;
    background-color: #fff;
  }
  .consult-box {
    a {
      display: block;
    }
    .consultfree {
      padding-top: 1rem;
      text-align: center;
      border-right: solid 1px #e7e7e7;
      img {
        width: 20%;
        padding: 5%;
        padding-top: 0;
      }
      p {
        vertical-align: top;
        text-align: left;
        width: 55%;
        font-size: 1rem;
        span {
          font-size: 0.7rem;
        }
      }
    }
    .consultfree > * {
      display: inline-block;
    }
    .consultcall {
      padding-top: 1rem;
      text-align: center;
      img {
        width: 20%;
        padding: 5%;
        padding-top: 0;
      }
      p {
        vertical-align: top;
        text-align: left;
        width: 55%;
        font-size: 1rem;
        span {
          font-size: 0.7rem;
        }
      }
    }
    .consultcall > * {
      display: inline-block;
    }
  }
  .consult-boxone {
    border-bottom: solid 1px #e7e7e7;
  }
  .btn-box {
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
  }
  .list-body {
    padding-top: 1rem;
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
  }
}
</style>
