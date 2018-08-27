<template>
  <div class="lawyer-detail">
      <div class="list-body">
        <flexbox class="body" v-for="item in cases" :key="item.oid">
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
              <p  v-for="(labels,index) in item.title" :key="index">
                <span class="label" v-text="labels"></span>
              </p>
            </div>            
            <div class="list-item">
              <p class="recent" v-text="item.introduce"></p>
            </div>
          </flexbox-item>
      </flexbox>
      <flexbox class="query">
          <flexbox-item>
              <button @click.stop="gotoPayment('offline',offlineId)" :key="offlineId">线下咨询</button>
          </flexbox-item>
          <flexbox-item>
              <button @click.stop="gotoPayment('delegation', delegateId)" :key="delegateId">委托预约</button>
          </flexbox-item>
      </flexbox>
      <flexbox>
          <flexbox-item>
              <div id="lawyerPie" class="pie-echart" :style="'height:300px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      <flexbox class="case-list" v-for="item in list" :key="item.oid" @click.native="getCaseDetail(item.mapid)">
          <flexbox-item class="case-item">
              <h3 class="title" v-text="item.title"></h3>
              <p class="content" v-html="item.courtname+' | '+item.issueDate+' | '+'</br>'+item.number"></p>
          </flexbox-item>
      </flexbox>
      </div>
  </div>
  
  
</template>

<script>
import contentHeader from "../Content/contentHeader";
import { Search, Group, Cell, XButton, Panel } from "vux";
import { defaultCipherList } from 'constants';
export default {
  name: "lawyerDetail",
  components: { contentHeader, Search, Group, Cell, XButton, Panel },
  data() {
    return {
      searchValue: this.$route.params.msg,
      cases: [],
      type: "1",
      list: [],
      offlineId:'',
      delegateId:''
    };
  },
  mounted() {
    let url = this.GLOBAL.hostIp;
    let oid = this.$route.params.id;
    let echartData = [];
    // 支付
    this.$http
    .post(url+"/order/getProductList",this.qs.stringify({
      category:0,
      page:0
    }))
    .then(({data}) => {
      this.offlineId = data.data[0].id;
      this.delegateId = data.data[1].id;
      // debugger;
    })
    this.$http
      .get(url + "/getOneAttorney", {
        params: {
          id: oid
        }
      })
      .then(({ data }) => {
        this.cases.push(data[0]);
        this.cases[0].title = data[0].title.split(",");
        this.cases[0].title.pop();
        echartData = data[0].data;
        this.list = data[1];
      })
      .then(() => {
        let myChart = this.$echarts.init(document.getElementById("lawyerPie"));
        let option_pie = {
          title: {
            text: "案由",
            x: "left",
            textStyle: {
              //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              fontSize: 20
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: [
            "rgb(86,150,244)",
            "rgb(71,204,127)",
            "rgb(214,54,86)",
            "rgb(253,193,43)",
            "rgb(250,128,4)"
          ],
          legend: {
            orient: "horizontal",
            x: "center",
            y: "bottom",
            data: echartData[0]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["30%", "50%"],
              center: ["50%", "40%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: echartData[2]
            }
          ]
        };
        myChart.setOption(option_pie);
      });
  },
  methods: {
    getCaseDetail(key) {
      this.$router.push({ name: "caseDetail", params: { key: key } });
    },
    gotoPayment(type,n){
        this.$router.push({ name: type, params:{key:n}});
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.lawyer-detail {
  font-size: 0.8rem;
  .query{
    text-align: center;
    padding-bottom: 1rem;
    padding-top:1rem;  
  }
  button{
    background-color: #fff;
    border: 1px solid #848484;
    padding: 0.6rem 2.5rem;
    border-radius: 0.5rem;
  }
  .body {
    border-bottom: 1px dotted #d5d5d6;
    padding-bottom: 0.5rem;
  }
  .name {
    color: #4d4e50;
    font-size:0.8rem;
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
    padding: 0.2rem 0.3rem;
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
  .case-item {
    border-bottom: 1px solid #d5d5d6;
    padding-bottom: 0.5rem;
  }
  .weui-media-box__title {
    font-size: 1rem;
  }
  .weui-media-box__desc {
    font-size: 0.8rem;
    color: #b7b8b8;
  }
  .pie-echart {
    background-color: #eee;
  }
  .weui-panel {
    margin-top: 0;
  }
  .title {
    font-size: 0.8rem;
    padding-left: 0.6rem;
    padding-top: 0.5rem;
    color: #404143;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content {
    font-size: 0.7rem;
    color: #b7b8b8;
    padding-left: 0.6rem;
  }
}
</style>
