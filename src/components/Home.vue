<template>
  <div class="home">
      <flexbox>
          <flexbox-item>
                <div class="case-class bgimg">
                    <img src="../assets/images/pic/n-slider1.png" alt="">
                </div>                
            </flexbox-item>
      </flexbox>
        <flexbox class="menu">
            <flexbox-item>
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
import { Panel } from 'vux'
export default {
  components: {Panel},
  data() {
    return {
        pannelTitle:"编辑推荐",
        type: '1',
        list: [{
                src: 'http://somedomain.somdomain/x.jpg',
                fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                title: '标题一',
                desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                url: '/component/cell'
                }, {
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题二',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                    url: {
                    path: '/component/radio',
                    replace: false
                },
                meta: {
                    source: '来源信息',
                    date: '时间',
                    other: '其他信息'
                }
        }],
      footer: {
        title: '更多',
        url: ''
      }

    };
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
.home img {
    width: 80%
}
.home .bgimg img{
    width:100%;
}
.case-class {
  text-align: center;
  color: #2d374b;
}
.menu{
    margin-top: 2.5em;
}
.news-list{
    text-align: left ;
}
.weui-panel__hd{
    color: #000 !important;
    font-size: 1.2em !important;
}
</style>
