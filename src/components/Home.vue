<template>
  <div class="home">
      <flexbox>
          <flexbox-item>
                <div class="case-class bgimg">
                    <img src="../assets/images/pic/n-slider1.png" alt="">
                </div>                
            </flexbox-item>
      </flexbox>
      <ul class="search-box"> 
          <li class="local"><img src="/static/icons/map_03.png" alt=""><p class="city">南京市</p></li>
          <li class="input-box"><input class="search" type="text" placeholder="请输入关键字搜索咨询"></li>
          <li class="search-btn"><img src="/static/icons/icon_11.png" alt=""><p class="searchFont">搜索</p></li>
      </ul>
                
               <!-- <flexbox-item class="search">
                <search 
                        v-model="searchValue"
                        :auto-fixed="false"
                        top="46px"
                        ref="search">
                    </search>          
            </flexbox-item>  -->
        <flexbox class="menu one">
            <flexbox-item @click.native="checkList('婚姻家庭')">
                <div class="case-class">
                    <img src="../assets/images/icons/icon_1.png" alt="">
                    <p>婚姻家庭</p>
                </div>                
            </flexbox-item>
             <flexbox-item>
                <div class="case-class">
                    <img src="../assets/images/icons/icon_2.png" alt="">
                    <p>交通事故</p>
                </div> 
            </flexbox-item>
             <flexbox-item>
                <div class="case-class">
                    <img src="../assets/images/icons/icon_3.png" alt="">
                    <p>继承纠纷</p>
                </div> 
            </flexbox-item>
             <flexbox-item>
                <div class="case-class">
                    <img src="../assets/images/icons/icon_4.png" alt="">
                    <p>拆迁安置</p>
                </div> 
            </flexbox-item>
    </flexbox>
        <flexbox class="menu">
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_5.png" alt="">
                    <p>劳动仲裁</p>
                </div> 
      </flexbox-item>
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_6.png" alt="">
                    <p>消费权益</p>
                </div> 
      </flexbox-item>
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_7.png" alt="">
                    <p>刑事辩护</p>
                </div> 
      </flexbox-item>
      <flexbox-item>
          <div class="case-class">
                    <img src="../assets/images/icons/icon_8.png" alt="">
                    <p>人身损害</p>
                </div> 
      </flexbox-item>
    </flexbox>
    <panel class="news-list" :header="pannelTitle" :footer="footer" :list="list" :type="type"></panel>
  </div>
</template>

<script>
import { Panel, Search } from "vux";
export default {
  components: { Panel, Search },
  data() {
    return {
      searchValue: "",
      pannelTitle: "编辑推荐",
      type: "1",
      list: [
        {
          src: "http://somedomain.somdomain/x.jpg",
          fallbackSrc: "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
          title: "标题一",
          desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: "/component/cell"
        },
        {
          src: "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
          title: "标题二",
          desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          url: {
            path: "/component/radio",
            replace: false
          },
          meta: {
            source: "来源信息",
            date: "时间",
            other: "其他信息"
          }
        }
      ],
      footer: {
        title: "更多",
        url: ""
      }
    };
  },
  methods: {
    checkList(msg) {
      this.$router.push({ name: "lawyerList", params: { msg: msg } });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.home {
    .search-box{
        line-height: 3rem;
            position: relative;
    top: -4rem;
    background: #fff;
    width: 88%;
    margin: auto;
    border-radius: 0.2rem;
        li{
            line-height: 3rem;
            vertical-align: middle;
            display: inline-block;
            *{
                display: inline-block;
                line-height: 3rem;
            }
        }
        .local{
            img{
                width: 1rem;
                vertical-align: middle;
            }
            p{
                font-size: 0.8rem;
                vertical-align: middle;
                padding-left: 0.2rem;
            }
        }
        .input-box{
            input{
                border:none;
                text-align: center;                
            }
            input:focus{
                outline:none;
            }
        }
        .search-btn{
            img{
                width: 1.5rem;
                vertical-align: middle;
            }
            p{
                font-size:0.9rem;
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
  .search {
  }
  .searchGlass {
  }
}
.home img {
  width: 80%;
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
.menu.one{
      margin-top: 0;
  }
.news-list {
  text-align: left;
}
.weui-panel__hd {
  color: #000 !important;
  font-size: 1.2em !important;
}
</style>
