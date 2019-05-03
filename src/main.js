import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './bus'
// loding組件效果
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// 表單驗證 & 中文化
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW'
// filiter
import currency from './filter/currency'
import timestamp from './filter/timestamp'

// VeeValidate.Validator.localize('zh_TW', zhTWValidate)
// Vue.use(VeeValidate)
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.defaults.withCredentials = true

Vue.component('Loading', Loading)
Vue.filter('currency', currency)
Vue.filter('timestamp', timestamp)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 如果從哪個頁面過來都必須要經過驗證
// 現在的執行環境是在 router 下，並不是在 Vue 的元件內，所以無法使用 this.$http.post
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
