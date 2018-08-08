<template>
  <div class="case-detail">
      <contentHeader></contentHeader>
      <flexbox>      
        <flexbox-item class="btn submit-btn">
            <div style="text-align:left;position:relative;">
                <div v-text="caseModel.title" class="second-title lawyerDetailCaseIntroduce ">
                </div>
                <p style="font-size:0.7rem;color: #a9aaaa" class="ui-nowrap-multi ui-whitespace">
                    <span v-text="caseModel.courtname+' | '" class="blaw"></span>
                    <span v-text="caseModel.issueDate+' | '" id="time" class=""></span>
                    <span v-text="caseModel.number" class=""></span>
                </p>
                <p v-text="'案由：'+caseModel.keyword" style="font-size:0.7rem;color: #a9aaaa" class="ui-nowrap-multi ui-whitespace "></p>
            </div>
        </flexbox-item>
      </flexbox>
      <flexbox>      
        <flexbox-item class="words">
            <div v-html="words"></div>
        </flexbox-item>
      </flexbox>
      <div class="btn-box">
          <button v-show="showloadmore" @click="loadmore" class="load">展开 ▼</button>
          <button v-show="showloadless" @click="loadless" class="load">收起 ▲</button>
      </div>
       <flexbox>
          <flexbox-item>
              <div id="lawyerPie" class="pie-echart" :style="'height:300px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      
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
      showloadmore:true,
      showloadless:false,
      caseModel: {
      },
      words:"",
      lesswords:"",
      morewords:''
    };
  },
  mounted() {
    let url = this.GLOBAL.hostIp;
    let key = this.$route.params.key;
    let echartData = [];
    this.$http
      .get(url + "/getJudgePapertext", {
        params: {
          key: key
        }
      })
      .then(({ data }) => {
        this.caseModel=data[0];
        this.morewords = data[0].words;
      })
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
        data: ["其他婚姻家庭、继承纠纷", "离婚纠纷", "劳动合同纠纷", "民间借贷纠纷", "机动车交通事故责任纠纷"]
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
          data: [
            { value: 6, name: "其他婚姻家庭、继承纠纷" },
            { value: 13, name: "离婚纠纷" },
            { value: 15, name: "劳动合同纠纷" },
            { value: 22, name: "民间借贷纠纷" },
            { value: 26, name: "机动车交通事故责任纠纷" }
          ]
        }
      ]
    };
    myChart.setOption(option_pie);
  },
  methods: {
      loadmore(){
          this.showloadmore = false;
          this.showloadless = true;
          this.words=this.morewords;
      },
      loadless(){
          this.showloadmore = true;
          this.showloadless = false;
          this.words=this.lesswords;
      }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.case-detail {  
  div.lawyerDetailCaseIntroduce {
    word-break: normal;
    white-space: normal;
    overflow: visible;
    }
    .second-title {
        font-size: 1rem;
        padding-left: 0.6rem;
        padding-top: 0.5rem;
        color: #404143;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ui-whitespace {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    box-sizing: border-box;
}
.ui-nowrap-multi {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
}
.words{
    font-size: 0.7rem;
    color: #838485;
    padding: 0.8rem ;
    margin-bottom: 0.5rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
}
.load{
        width: 8rem;
    color: #fa8004;
    border: 1px solid #fa8004;
    border-radius: 3rem;
    margin-right: 0.3rem;
    height: 2rem;
    font-size: 0.9rem;
    background-color: #fff;
}
#lawyerPie{
    background-color: #eee;
}
.btn-box{
        margin-top: 0.8rem;
    margin-bottom: 0.5rem;
}
}
</style>
