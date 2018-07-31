<template>
  <div class="case-list">
     <contentHeader></contentHeader>
    <search
      v-model="searchValue"
      :auto-fixed="false"
      top="46px"
      ref="search"></search>
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
              <p class="local" v-text="item.city+'|'+item.lawoffice"></p>
            </div>
            <div class="list-item">
              <p  v-for="(labels,index) in item.title" v-if="index<3" >
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
import { Search, Group, Cell, XButton } from "vux";
export default {
  name: "caseList",
  components: { contentHeader, Search, Group, Cell, XButton },
  data() {
    return {
      searchValue:this.$route.params.msg,
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
          title:['其他婚姻家庭、继承纠纷','机动车交通事故责任纠纷','民间借贷纠纷,劳动合同纠纷,离婚纠纷'],
          workage: "18"
        },
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
          title:['其他婚姻家庭、继承纠纷','机动车交通事故责任纠纷','民间借贷纠纷,劳动合同纠纷,离婚纠纷'],
          workage: "18"
        },
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
          title:['其他婚姻家庭、继承纠纷','机动车交通事故责任纠纷','民间借贷纠纷,劳动合同纠纷,离婚纠纷'],
          workage: "18"
        },
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
          title:['其他婚姻家庭、继承纠纷','机动车交通事故责任纠纷','民间借贷纠纷,劳动合同纠纷,离婚纠纷'],
          workage: "18"
        },
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
          title:['其他婚姻家庭、继承纠纷','机动车交通事故责任纠纷','民间借贷纠纷,劳动合同纠纷,离婚纠纷'],
          workage: "18"
        },
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
          title:['其他婚姻家庭、继承纠纷','机动车交通事故责任纠纷','民间借贷纠纷,劳动合同纠纷,离婚纠纷'],
          workage: "18"
        }
      ]
    };
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
.case-list{
  font-size:0.8rem;
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
    margin-left: 0.8rem;
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
    color: #b7b8b8;
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
}
</style>
