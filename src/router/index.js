import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'
import Home from '@/components/Home'
import CreateCase from '@/components/CreateCase'
import User from '@/components/User'
import LawyerList from '@/components/Lawyer/LawyerList'
import LawyerDetail from '@/components/Lawyer/LawyerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'home',
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
          path:'lawyerDetail',
          name:'lawyerDetail',
          component:LawyerDetail
        }
      ]
    },
  ]
})
