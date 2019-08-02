import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import logon from '@/components/logon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logon',
      component: logon
    }, {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
