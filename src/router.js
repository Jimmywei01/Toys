import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

import Products from './components/dashboard/Products.vue'
import Orders from './components/dashboard/Orders.vue'
import Coupons from './components/dashboard/Coupons.vue'
import CustomeOrders from './components/dashboard/CustomeOrders.vue'
import CustomeCheckOut from './components/dashboard/CustomeCheckOut.vue'
import ShoppingDetail from './components/HomePage/ShoppingDetail.vue'
import Cart from './components/HomePage/Cart.vue'
import CheckOrder from './components/HomePage/CheckOrder.vue'
import CheckOut from './components/HomePage/CheckOut.vue'
import Page from './components/HomePage/Page.vue'
import ShoppingList from './components/HomePage/ShoppingList.vue'
Vue.use(Router)

export default new Router({
// 前台
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Page',
          component: Page
        },
        {
          path: 'shoppinglist',
          name: 'ShoppingList',
          component: ShoppingList
        },
        {
          path: 'shoppingdetail/:id',
          name: 'ShoppingDetail',
          component: ShoppingDetail
        },
        {
          path: 'cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: 'checkorder',
          name: 'CheckOrder',
          component: CheckOrder
        },
        {
          path: 'checkout/:orderId',
          name: 'CheckOut',
          component: CheckOut
        }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 後台
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [{
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { requiresAuth: true }
      },
      {
        path: 'customeorders',
        name: 'CustomeOrders/:id',
        component: CustomeOrders
      },
      {
        path: 'customecheckout/:orderId',
        name: 'CustomeCheckOut',
        component: CustomeCheckOut
      }]
    }]
})
