<template>
  <div class="lawyer-detail">
     <contentHeader></contentHeader>
      <div class="list-body">
        <flexbox class="body" v-for="item in cases">
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
              <p  v-for="(labels,index) in item.title">
                <span class="label" v-text="labels"></span>
              </p>
            </div>            
            <div class="list-item">
              <p class="recent" v-text="item.introduce"></p>
            </div>
          </flexbox-item>
      </flexbox>
      <flexbox>
          <flexbox-item>
              <div id="lawyerPie" class="pie-echart" :style="'height:300px;width:100%;'"></div>
          </flexbox-item>
      </flexbox>
      <panel class="case-list" :list="list" :type="type"></panel>
      </div>
  </div>
</template>

<script>
import contentHeader from "../Content/contentHeader";
import { Search, Group, Cell, XButton, Panel } from "vux";
export default {
  name: "caseList",
  components: { contentHeader, Search, Group, Cell, XButton, Panel },
  data() {
    return {
      searchValue: this.$route.params.msg,
      cases: [
        {
          bility: "其他婚姻家庭、继承纠纷:6,机动车交通事故责任纠纷:26,民间借贷纠纷:22,劳动合同纠纷:15,离婚纠纷:13,",
          city: "南京市",
          imagepath: "/static/lawyerPhoto/1517555714.jpg",
          index: "0",
          introduce: "最近受理案件在 2017.09.26 法院是 江苏省南京市浦口区人民法院",
          lawOfficeOid: "",
          lawoffice: "江苏张院生律师事务所",
          name: "张院生",
          oid: "8a4b8c7b-4380-306b-bbcc-2ad1c590ba79",
          reasonCode: "0020203",
          title: ["其他婚姻家庭、继承纠纷", "机动车交通事故责任纠纷", "民间借贷纠纷", "劳动合同纠纷", "离婚纠纷"],
          workage: "18"
        }
      ],
      type: "1",
      list: [
        {
          title: "江苏省南京市浦口区人民法院",
          desc: "江苏省南京市浦口区人民法院|2017.09.26|</br>(2017)苏0111民初3673号",
          url: "/component/cell"
        },
        {
          title: "江苏省南京市浦口区人民法院",
          desc: "江苏省南京市浦口区人民法院|2017.09.26|</br>(2017)苏0111民初3673号",
          url: "/component/cell"
        },
        {
          title: "江苏省南京市浦口区人民法院",
          desc: "江苏省南京市浦口区人民法院|2017.09.26|</br>(2017)苏0111民初3673号",
          url: "/component/cell"
        }
      ]
    };
  },
  mounted() {
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
  methods:{
   
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.lawyer-detail {
  font-size: 0.8rem;
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
  .case-list {
    text-align: left;
  }
  .weui-media-box__title {
    font-size: 1rem;
  }
  .weui-media-box__desc {
    font-size: 0.8rem;
    color: #b7b8b8;
  }
  .pie-echart{
    background-color: #eee;
  }
  .weui-panel{
    margin-top: 0;
  }
}
</style>
