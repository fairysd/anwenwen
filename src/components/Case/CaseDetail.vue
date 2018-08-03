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
      searchValue: this.$route.params.key,
      showloadmore:true,
      showloadless:false,
      caseModel: {
        caseContent: null,
        courtCode: null,
        courtname: "江苏省南京市六合区人民法院",
        determineCharges: null,
        introduce: "",
        issueDate: "2017.05.10",
        keyword: "不可抗力,侵权,可以减轻,完全民事行为能力,无效,明知,证明,诉讼请求,陪审",
        mapid: 0,
        number: "(2016)苏0116民初第7265号",
        oid: "pfnl_a25051f3312b07f3e4e49cfd98d22cec909b5824a0ddd527bdfb",
        paperType: "普通案例",
        penalty: null,
        program: "一审",
        reason: "002090116",
        source: null,
        sourceOID: "1970324883041681",
        title: "鲁小文等诉国网江苏省电力公司南京供电公司触电人身损害责任纠纷案",
        writtype: "判决书"
      },
      words:"",
      lesswords:"",
      morewords:
        '<p align="center"><font class="MTitle">鲁小文等诉国网江苏省电力公司南京供电公司触电人身损害责任纠纷案</font></p> <br> <div align="center">江苏省南京市六合区人民法院<br> 民事判决书<br> </div><div align="right">(2016)苏0116民初第7265号</div><br> 　　原告：鲁小文。<br> 　　原告：李某。<br> 　　原告：李有山。<br> 　　原告：许宗琴。<br> 　　四原告共同委托诉讼代理人：李浩，江苏金长城律师事务所律师。<br> 　　被告：国网江苏省电力公司南京供电公司。<br> 　　法定代表人：李斌，该公司总经理。<br> 　　委托诉讼代理人：周飞，江苏圣典律师事务所律师。<br> 　　委托诉讼代理人：石勇。<br> 　　原告鲁小文、李某、李有山、许宗琴诉被告国网江苏省电力公司南京供电公司（以下简称南京供电公司）触电人身损害责任纠纷一案，本院于2016年11月7日立案后，依法适用普通程序，公开开庭进行了审理。原告鲁小文及四原告共同委托诉讼代理人李浩、被告南京供电公司的委托诉讼代理人周飞到庭参加诉讼。本案现已审理终结。<br> 　　原告鲁小文、李某、李有山、许宗琴向本院提出诉讼请求:1、要求被告赔偿医疗费、丧葬费、死亡赔偿金、精神抚慰金、被抚养人生活费、办理丧葬事宜产生的误工费、交通费、住宿费等，合计578001.5元；2、由被告承担本案的诉讼费用。事实和理由：2016年10月5日上午11时20分许，原告亲属李某某在位于南京市六合区××朱营村××附近水沟钓鱼时，不慎触及到附近的高压线，后经抢救无效身亡，被告虽在水沟边设置了“上有高压线、有电危险”的警示牌，但该警示牌有部分被周围生长得草木遮挡，现场并没有“禁止垂钓”的警示牌，且被告架设的高压线高度达不到5.5米的强制性规定，该事故给原告造成重大精神损害和财产损失，原告故而提起诉讼，请求法院依法判决。<br> 　　被告南京供电公司辩称：1、在本案事故发生时，四原告的亲属李某某作为完全行为能力人在明知在高压线下钓鱼具有高度危险的情况下无视警示标志，导致本案事故发生，其本人应当对此次事故承担全部责任。2、关于原告提到的案涉电线距离，被告人员测量的距离为7米以上，符合5.5米的标准。被告估计原告测量的可能是高压线下方的通信电路的高度。请求法院驳回原告的诉讼请求。<br> 　　本院经审理认定事实如下：<br> 　　2016年10月5日上午11时20分许，四原告亲属李某某在位于南京市六合区××朱营村××附近水渠钓鱼时，不慎触及到南京供电公司架设于该水渠附近10千伏的高压电线，后经抢救无效身亡，共花费医疗费708.2元。事故现场，南京供电公司于水渠旁设置了“上有高压线、有点危险”的警示牌，但该警示牌有部分被周围生长的草木遮挡。事故发生后，南京供电公司在事故发生点加设了多个警示标志。<br> 　　另查明，原告鲁小文、李某、李有山、许宗琴分别系死者李某某的妻子、儿子、父亲、母亲。李有山、许宗琴还有一女儿叫李某甲。<br> 　　上述事实，有原、被告的陈述、接处警工作登记表、病历、死亡证明、常住人口登记表、医疗费发票、询问笔录、执法录像、照片等证据在卷佐证，本院予以认定。<br> 　　本院认为：从事高空、高压活动造成他人损害的，经营者应当承担侵权责任，但能够证明损害是因受害人故意或不可抗力造成，不承担责任。被侵权人对损害的发生有过失的，可以减轻经营者的责任。本案中，李某某的死亡不是故意或者不可抗力造成，南京供电公司作为高压电的经营者，应当承担侵权责任。李某某作为完全民事行为能力人，其明知高压电具有高度危险，仍然在高压线下垂钓，是造成其死亡的主要原因，对死亡事故的发生存在重大过失，应当自行承担60%的主要责任，南京供电公司承担40%的次要责任。四原告作为李某某的近亲属，可以作为赔偿权利人要求南京供电公司承担相应的赔偿责任。<br> 　　原告损失认定如下：1、医疗费708.2元，有医疗发票予以证明，本院予以确认；2、精神损害抚慰金，本院酌定为50000元；3、被抚养人生活费，根据法律规定，年赔偿总额累计不超过上一年度居民人均消费性支出额，结合被抚养人、抚养义务人的人数及被抚养人的生活现状，故本院确定为233216元﹛26433×2+14428×[（20-9）+（20-6）]÷2﹜；4、丧葬费确认为33098元（66196元÷12×6）；5、死亡赔偿金确认为803040元（40152×20）；6、处理丧葬事宜的误工费、交通费、住宿费，本院酌定为5000元。综上，以上损失合计1125062.2元，由被告南京供电公司应承担450024.88元（1125062.2元×40%）。据此，依照《中华人民共和国侵权法》第十六条、第十八条、第二十二条、第二十六条、第七十三条，<a href="javascript:SLC(51002,0)" class="alink" onmouseover="AJI(51002,0)">最高人民法院《关于审理人身损害赔偿案件适用法律若干问题的解释</a>》第<a href="javascript:SLC(51002,17)" class="alink" onmouseover="AJI(51002,17)">十七条</a>第三款、第<a href="javascript:SLC(51002,18)" class="alink" onmouseover="AJI(51002,18)">十八条</a>、第<a href="javascript:SLC(51002,19)" class="alink" onmouseover="AJI(51002,19)">十九条</a>、第<a href="javascript:SLC(51002,27)" class="alink" onmouseover="AJI(51002,27)">二十七条</a>、第<a href="javascript:SLC(51002,29)" class="alink" onmouseover="AJI(51002,29)">二十九条</a>，<a href="javascript:SLC(34937,0)" class="alink" onmouseover="AJI(34937,0)">最高人民法院《关于确定民事侵权精神损害赔偿责任若干问题的解释</a>》第<a href="javascript:SLC(34937,1)" class="alink" onmouseover="AJI(34937,1)">一条</a>、第<a href="javascript:SLC(34937,10)" class="alink" onmouseover="AJI(34937,10)">十条</a>，《<a href="javascript:SLC(297379,0)" class="alink" onmouseover="AJI(297379,0)">中华人民共和国民事诉讼法</a>》第<a href="javascript:SLC(297379,39)" class="alink" onmouseover="AJI(297379,39)">三十九条</a>第一款、第<a href="javascript:SLC(297379,142)" class="alink" onmouseover="AJI(297379,142)">一百四十二条</a>之规定，判决如下：<br> 　　一、被告国网江苏省电力公司南京供电公司于本判决生效之日起十日内赔偿原告鲁小文、李某、李有山、许宗琴各项损失合计450024.88元；<br> 　　二、驳回原告鲁小文、李某、李有山、许宗琴的其他诉讼请求。<br> 　　如果未按本判决指定的期间履行给付金钱义务，应当依照《<a href="javascript:SLC(297379,0)" class="alink" onmouseover="AJI(297379,0)">中华人民共和国民事诉讼法</a>》第<a href="javascript:SLC(297379,253)" class="alink" onmouseover="AJI(297379,253)">二百五十三条</a>之规定，加倍支付迟延履行期间的债务利息。<br> 　　案件受理费3290元，由原告鲁小文、李某、李有山、许宗琴负担729元，由被告国网江苏省电力公司南京供电公司负担2561元。<br> 　　如不服本判决，可在判决书送达之日起十五日内，向本院递交上诉状，并按对方当事人的人数提出副本，上诉于江苏省南京市中级人民法院。根据《<a href="javascript:SLC(4356,0)" class="alink" onmouseover="AJI(4356,0)">人民法院诉讼收费办法</a>》，同时应向江苏省南京市中级人民法院预交上诉案件受理费3290元。江苏省南京市中级人民法院的开户行：中国工商银行南京市汉口路支行，帐号：43×××18。<br> <div align="right"><br> 审　判　长　　邹建明<br> 人民陪审员　　黄恩明<br> 人民陪审员　　傅安宝<br> 二〇一七年五月十日<br> 书　记　员　　邵蕊晨<br> </div> '
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
