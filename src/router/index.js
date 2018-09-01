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
          default:Content,
          footer1:Footer
      },
      children:
      [
        {
          path:'',
          component:Home
        },
        {
          path:'home',
          name:"home",
          component:Home
        },


        {
          path:'createCase',
          component:CreateCase
        },
        {
          path:'user',
          component:User
        },
        {
          path:'lawyerList',
          name:'lawyerList',
          component:LawyerList
        },
        {
          path:'findLawyer',
          name:'findLawyer',
          component:FindLawyer
        },
        // {
        //   path:'lawyerDetail',
        //   name:'lawyerDetail',
        //   component:LawyerDetail,

        // },
        {
          path:'caseDetail',
          name:'caseDetail',
          component:CaseDetail
        },
        {
          path:'newsDetail',
          name:'newsDetail',
          component:NewsDetail
        },
        {
          path:'delegation',
          name:'delegation',
          component:Delegation,
          meta: {
            title: '委托'
          },
        },
        {
          path:'offline',
          name:'offline',
          component:Offline
        },
        {
          path:'collection',
          name:'collection',
          component:Collection
        },
        {
          path:'relate',
          name:'relate',
          component:Relate
        },
        {
          path:'mycase',
          name:'mycase',
          component:Mycase
        },
        {
          path:'MyConsult',
          name:'MyConsult',
          component:MyConsult
        },
        {
          path:'MyEntrust',
          name:'MyEntrust',
          component:MyEntrust
        },
        {
          path:'ServiceDetail',
          name:'ServiceDetail',
          component:ServiceDetail
        }
      ]
    },
    {
      path:"/login",
      name:"login",
      component:Login
    },
    {
      path:"/state",
      name:"state",
      component:State
    },{
        path:'/lawyerDetails',
        name:'lawyerDetails',
        components:{
          default:Content,
          footer1:FooterDetail  
        },
        children:[
            {
              path:'lawyerDetail',
              name:'lawyerDetail',
              component:LawyerDetail,
             }
        ]

    }

  ]
})
