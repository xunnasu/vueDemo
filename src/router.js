import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Home from './views/Home/Home.vue'
import Pipes from './views/Pipes/Pipes.vue'
import Metal from './views/Metal/Metal.vue'
import MetalFather from './views/Metal/MetalFather.vue'
import MetalSon from './views/Metal/MetalSon.vue'
import MetalSis from './views/Metal/MetalSis.vue'
import Login from './views/Top/Login.vue'
import Register from './views/Top/Register.vue'
import Custom from './views/Custom/custom.vue'
import CustomYK from './views/Custom/customYK.vue'
import CustomYKSY from './views/Custom/customYKSY.vue'
import Buyback from './views/Custom/Buyback.vue'
import AddressManage from './views/Metal/AddressManage.vue'
import componentA from '@/components/componentA'
import componentB from '@/components/componentB'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: "/index/home"
    },
    {
      path: '/index',
      component: Index,
      redirect: "/index/home",
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: '/Pipes',
          name: 'Pipes',
          component: Pipes
        },
        {
          path: '/Metal/:nav',
          name: 'Metal',
          component: Metal,
          props: true,
        },
       
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/MetalFather',
      name: 'MetalFather',
      component: MetalFather
    },
    {
      path: '/MetalSon',
      name: 'MetalSon',
      component: MetalSon
    },
    {
      path: '/MetalSis',
      name: 'MetalSis',
      component: MetalSis
    },
    {
      path: '/Custom',
      name: 'Custom',
      component: Custom
    },
    {
      path: '/CustomYK/:appNum',
      name: 'CustomYK',
      component: CustomYK,
    },
    {
      path: '/CustomYKSY',
      name: 'CustomYKSY',
      component: CustomYKSY
    },
    {
      path: '/Buyback',
      name: 'Buyback',
      component: Buyback
    },
    {
      path: '/AddressManage',
      name: 'AddressManage',
      component: AddressManage
    },
    {
      path:'/componentA',
      name:'componentA',
      component:componentA
    },
    {
      path:'/componentB',
      name:'componentB',
      component:componentB
    }
    
    
  ]
})
