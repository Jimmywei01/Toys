import Vue from 'vue'
import Router from 'vue-router'
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
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/',
          name: 'Page',
          component: () => import('./components/HomePage/Page.vue')
        },
        {
          path: 'shoppinglist',
          name: 'ShoppingList',
          component: () => import('./components/HomePage/ShoppingList.vue')
        },
        {
          path: 'shoppingdetail/:id',
          name: 'ShoppingDetail',
          component: () => import('./components/HomePage/ShoppingDetail.vue')
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('./components/HomePage/Cart.vue')
        },
        {
          path: 'checkorder',
          name: 'CheckOrder',
          component: () => import('./components/HomePage/CheckOrder.vue')
        },
        {
          path: 'checkout/:orderId',
          name: 'CheckOut',
          component: () => import('./components/HomePage/CheckOut.vue')
        }]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    // 後台
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [{
        path: 'products',
        name: 'Products',
        component: () => import('./components/dashboard/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('./components/dashboard/Orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('./components/dashboard/Coupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'customeorders',
        name: 'CustomeOrders/:id',
        component: () => import('./components/dashboard/CustomeOrders.vue')
      },
      {
        path: 'customecheckout/:orderId',
        name: 'CustomeCheckOut',
        component: () => import('./components/dashboard/CustomeCheckOut.vue')
      }]
    }]
})
