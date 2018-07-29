import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'
import Home from '@/components/Home'
import CreateCase from '@/components/CreateCase'
import User from '@/components/User'

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
        }
      ]
    },
  ]
})
