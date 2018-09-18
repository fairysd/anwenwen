<template>
  <div class="case-detail">
      <flexbox>      
        <flexbox-item class="btn submit-btn">
            <div style="text-align:left;position:relative;">
                <div v-text="caseModel.title" class="second-title lawyerDetailCaseIntroduce ">
                </div>
                <p style="font-size:0.7rem;color: #a1a1a2" class="ui-nowrap-multi ui-whitespace">
                    <span v-text="caseModel.courtname+' | '" class="blaw"></span>
                    <span v-text="caseModel.issueDate+' | '" id="time" class=""></span>
                    <span v-text="caseModel.number" class=""></span>
                </p>
                <p v-text="'案由：'+caseModel.keyword" style="font-size:0.7rem;color: #a1a1a2" class="ui-nowrap-multi ui-whitespace "></p>
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
      <!-- 图表展示 -->
      <flexbox>
          <flexbox-item>
              <div id="lawyerPie" class="pie-echart echarts" :style="'height:350px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      <flexbox>
          <flexbox-item>
              <div id="lawyerAddress" class="address-echart echarts" :style="'height:320px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      <flexbox>
          <flexbox-item>
              <div id="main_line" class="year-echart echarts" :style="'height:320px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      <flexbox>
          <flexbox-item>
              <div id="main_routine" class="routime-echart echarts" :style="'height:320px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      <flexbox>
          <flexbox-item>
              <div id="main_book" class="book-echart echarts" :style="'height:320px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      <div class="list-body">
        <flexbox class="body">
          <flexbox-item :span="4">
            <div class="list-item photo">
               <img class="lawyer-photo" src='../../assets/images/icons/lawyer.png'>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="list-item info">
              <span class="name" v-text="'赵子耀'"></span><img src="../../assets/images/icons/experienceIcon.png" alt=""><span class="workage" v-text="'10年经验'"></span><img src="../../assets/images/icons/recommend.png" alt="" class="recommend">
            </div>
            <div class="list-item">
              <p class="local" v-text="'南京市 | 盈科律师事务所'"></p>
            </div>
            <div class="list-item">
              <!-- <p  v-for="(labels,index) in item.title" v-if="index<3" :key="index">
                <span class="label" v-text="labels"></span>
              </p> -->
            </div>            
            <div class="list-item">
              <p class="recent" v-text="'最近办理的案件是刑事案件，在2017年10月23号，法院是苏州人民法院'"></p>
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
      caseModel: {},
      words: "",
      lesswords: "",
      morewords: ""
    };
  },
  mounted() {
    let url = this.GLOBAL.hostIp;
    let key = this.$route.params.key;
    if (!key) {
      let storage = window.localStorage;
      key = storage.getItem("caseKey");
    }
    let hearCourtCount = [];
    let addressCount = [];
    let hearYearCount = [];
    let hearProgramCount = [];
    let paperTypeCount = [];
    this.$http
      .get(url + "/getJudgePapertext", {
        params: {
          key: key
        }
      })
      .then(({ data }) => {
        this.caseModel = data[0];
        this.morewords = data[0].words;
        // hearCourtCount = data[1].hearCourtCount;
        // addressCount = data[1].addressCount;
        // hearYearCount = data[1].hearYearCount;
        // hearProgramCount = data[1].hearProgramCount;
        // paperTypeCount  = data[1].paperTypeCount;
      })
      .then(()=>{
        this.$http
        .get(url + "/countCase", {
        params: {
          key: key
        }
      }).then(({data})=>{
        var data = data.data;
        hearCourtCount = data.hearCourtCount;
        addressCount = data.addressCount;
        hearYearCount = data.hearYearCount;
        hearProgramCount = data.hearProgramCount;
        paperTypeCount  = data.paperTypeCount;
      })
      .then(() => {
        var courtChart = this.$echarts.init(document.getElementById("lawyerPie"));
        var option_court = {
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
          color: hearCourtCount[3],
          legend: {
            orient: "horizontal",
            x: "center",
            y: "bottom",
            bottom:0,
            data: hearCourtCount[0]
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
              data: hearCourtCount[2]
            }
          ]
        };
        courtChart.setOption(option_court);
        //
        //图标分析地域柱状图
        var myChart_area = this.$echarts.init(
          document.getElementById("lawyerAddress")
        );
        var option_area = {
          title: {
            text: "地域"
          },
          color: ["#5696F4"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            left: "5%",
            right: "10%",
            bottom: "3%",
            containLabel: true
          },
          axisLabel: {
            interval: 0
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: "category",
            data: addressCount[0],
            max: 8
          },
          series: [
            {
              barWidth: 20,
              name: "地域",
              type: "bar",
              data: addressCount[1] /*[18, 59, 34, 50, 44, 30]*/,
              barGap: "5%"
            }
          ]
        };
        // 为echarts对象加载数据
        myChart_area.setOption(option_area);
        //图表分析折线图
        var myChart_line = this.$echarts.init(document.getElementById("main_line"));
        var option_line = {
          title: {
            text: "裁判年份"
          },
          tooltip: {
            trigger: "axis"
          },
          grid: {
            left: "5%",
            right: "10%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data:
              hearYearCount[1] /*['2011','2012','2013','2014','2015','2016','2017']*/
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "裁判年份",
              type: "line",
              stack: "总量",
              data: hearYearCount[0] /*[120, 132, 101, 134, 90, 230, 210]*/,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "#FDC12B"
                  }
                }
              }
            }
          ]
        };
        myChart_line.setOption(option_line);
        //图表分析审理程序
        var myChart_routine = this.$echarts.init(
          document.getElementById("main_routine")
        );
         var option_routine = {
          title: {
            text: "审理程序"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: hearProgramCount[3],
          legend: {
            orient: "horizontal",
            x: "center",
            y: "bottom",
            data: hearProgramCount[0] /*['一审','二审']*/
          },
          series: [
            {
              type: "pie",
              selectedMode: "single",
              radius: [0, "30%"],

              label: {
                normal: {}
              },
              labelLine: {}
            },
            {
              type: "pie",
              radius: ["40%", "55%"],
              label: {
                normal: {
                  rich: {
                    a: {
                      color: "#999",
                      lineHeight: 22,
                      align: "center"
                    },

                    hr: {
                      borderColor: "#aaa",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {},
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: hearProgramCount[2]
            }
          ]
        };
        myChart_routine.setOption(option_routine);
        //图表分析文书性质
        var myChart_book = this.$echarts.init(document.getElementById("main_book"));
        var option_book = {
          title: {
            text: "文书性质"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: paperTypeCount[3],
          legend: {
            orient: "horizontal",
            x: "center",
            y: "bottom",
            data: paperTypeCount[0]
          },
          series: [
            {
              type: "pie",
              selectedMode: "single",
              radius: [0, "30%"],

              label: {
                normal: {}
              },
              labelLine: {}
            },
            {
              type: "pie",
              radius: ["40%", "55%"],
              label: {
                normal: {
                  rich: {
                    a: {
                      color: "#999",
                      lineHeight: 22,
                      align: "center"
                    },

                    hr: {
                      borderColor: "#aaa",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {},
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: paperTypeCount[2]
            }
          ]
        };
        myChart_book.setOption(option_book);
      });
      })
    //
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
    color: #000;
    font-weight: 900;
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
    -webkit-line-clamp: 20;
  }
  .info{
    img {
      width: 0.8rem;
      vertical-align: middle;
      margin-left: 0.6rem;
    }
  }
 
  .words {
    font-size: 0.7rem;
    color: #575757;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }
  .load {
    width: 13rem;
    color: #4f88f7;
    border: 1px solid #4f88f7;
    border-radius: 0.5rem;
    height: 2.3rem;
    font-size: 0.9rem;
    background-color: #fff;
  }
  .echarts {
    background-color: #eee;
  }
  .btn-box {
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .body{
        border-bottom: 1px dotted #d5d5d6;
        padding-bottom: 0.5rem;
  }
  .name{
    color: #4d4e50;
    font-weight: 500;
  }
  .workage{
    color: #f9ab13;
    font-size: 0.6rem;
  }
  .local{
    color: #878889;
    font-size: 0.6rem;
  }
  .label{
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
  .recent{
    color: #a1a1a2;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.5rem;
  }
  .body{
    margin:0.3rem 0;
  }
  .photo{
    text-align:center;
  }
  .lawyer-photo{
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 5.5rem;
    margin-top: -0.2rem;
  }
  .list-body{
      border-top: 1px dotted #d5d5d6;
      margin-bottom: 0.3rem;
    margin-top: 0.5rem;
    background-color: #fff;
    img.recommend{
      width:1.5rem;
      display: inline-block;
          position: absolute;
    right: 1rem;
    
    }
  }
}
</style>
