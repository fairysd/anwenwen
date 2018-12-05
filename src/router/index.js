import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import State from '@/components/State'
import Content from '@/components/Content'
import Home from '@/components/Home'
import CreateCase from '@/components/CreateCase'
import User from '@/components/User'
import FindLawyer from '@/components/Lawyer/FindLawyer'
import LawyerList from '@/components/Lawyer/LawyerList'
import LawyerDetail from '@/components/Lawyer/LawyerDetail'
import CaseDetail from '@/components/Case/CaseDetail'
import NewsDetail from '@/components/News/NewsDetail'
import Delegation from '@/components/Content/Delegation'
import Offline from '@/components/Content/Offline'
import Collection from '@/components/InfoCenter/Collection'
import Relate from '@/components/InfoCenter/Relate'
import Mycase from '@/components/InfoCenter/Case'
import MyConsult from '@/components/MyService/MyConsult'
import MyEntrust from '@/components/MyService/MyEntrust'
import ServiceDetail from '@/components/MyService/ServiceDetail'
import Footer from '@/components/Footer'
import FooterDetail from '@/components/FooterDetail'


Vue.use(Router) 
Vue.use(LoadingPlugin)
import  { LoadingPlugin } from 'vux'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      components:{
          default:resolve => require(['@/components/Content'], "content"),
          footer1:resolve => require(['@/components/Footer'], "footer"),
      },
      children:
      [
        {
          path:'',
          component:resolve => require(['@/components/Home'], "home"),
          hidden: true
        },
        {
          path:'home',
          name:"home",
          component:resolve => require(['@/components/Home'], "home"),
          hidden: true
        },
        {
          path:'createCase',
          component:resolve => require(['@/components/Case/CaseDetail'], "createcase"),
          hidden: true
        },
        {
          path:'user',
          component:resolve => require(['@/components/User'], "user"),
          hidden: true
        },
        {
          path:'lawyerList',
          name:'lawyerList',
          component:resolve => require(['@/components/Lawyer/LawyerList'], "lawyerlist"),
          hidden: true
        },
        {
          path:'findLawyer',
          name:'findLawyer',
          component:resolve => require(['@/components/Lawyer/FindLawyer'], "findlawyer"),
          hidden: true
        },
        // {
        //   path:'lawyerDetail',
        //   name:'lawyerDetail',
        //   component:LawyerDetail,

        // },
        {
          path:'caseDetail',
          name:'caseDetail',
          component:resolve => require(['@/components/Case/CaseDetail'], "casedetail"),
          hidden: true
        },
        {
          path:'newsDetail',
          name:'newsDetail',
          component:resolve => require(['@/components/News/NewsDetail'], "newsdetail"),
          hidden: true
        },
        {
          path:'delegation',
          name:'delegation',
          component:resolve => require(['@/components/Content/Delegation'], "delegation"),
          meta: {
            title: '委托'
          },
        },
        {
          path:'offline',
          name:'offline',
          component:resolve => require(['@/components/Content/Offline'], "offline"),
        },
        {
          path:'collection',
          name:'collection',
          component:resolve => require(['@/components/InfoCenter/Collection'], "collection"),
        },
        {
          path:'relate',
          name:'relate',
          component:resolve => require(['@/components/InfoCenter/Relate'], "relate"),
        },
        {
          path:'mycase',
          name:'mycase',
          component:resolve => require(['@/components/InfoCenter/Case'], "mycase"),
        },
        {
          path:'MyConsult',
          name:'MyConsult',
          component:resolve => require(['@/components/MyService/MyConsult'], "myconsult"),
        },
        {
          path:'MyEntrust',
          name:'MyEntrust',
          component:resolve => require(['@/components/MyService/MyEntrust'], "myentrust"),
        },
        {
          path:'ServiceDetail',
          name:'ServiceDetail',
          component:resolve => require(['@/components/MyService/ServiceDetail'], "servicedetail"),
        }
      ]
    },
    {
      path:"/login",
      name:"login",
      component:resolve => require(['@/components/Login'], resolve),
    },
    {
      path:"/state",
      name:"state",
      component:resolve => require(['@/components/State'], resolve),
    },{
        path:'/lawyerDetails',
        name:'lawyerDetails',
        components:{
          default:resolve => require(['@/components/Content'], resolve),
          footer1:resolve => require(['@/components/FooterDetail'], resolve),  
        },
        hidden: true,
        children:[
            {
              path:'lawyerDetail',
              name:'lawyerDetail',
              component:resolve => require(['@/components/Lawyer/LawyerDetail'], resolve),
              hidden: true
             }
        ]

    }

  ]
})
