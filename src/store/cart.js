import axios from 'axios'

export default {
  strict: true,
  state: {
    cart: {}, // 購物車列表
    carts: [],
    cartNum: [],
    lodingItem: ''
  },
  // 非同步 取得遠端 API 資料
  actions: {
    getCart ({ commit }, playload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then((res) => {
        // 購物車內容
        commit('Cart', res.data.data)
        commit('Carts', res.data.data.carts)
      })
    },
    // 移除購物車內容
    removeCart (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      axios.delete(api).then((res) => {
        context.dispatch('getCart')
      })
    },
    // 參數只能使用一個，超過用物件
    addToCar (context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('lodingItem', id, { root: true })
      const cart = {
        product_id: id,
        qty
      }
      axios.post(api, { data: cart }).then((res) => {
        context.commit('lodingItem', '', { root: true })
        context.dispatch('getCart') // 把購物車內購買的商品取得回來(更新購物車)
      })
    }
  },
  getters: {
    cart (state) {
      return state.cart
    },
    carts (state) {
      return state.carts
    }
  },
  // 改變資料狀態
  mutations: {
    Cart (state, playload) {
      state.cart = playload
    },
    Carts (state, playload) {
      state.carts = playload
    }
  }

}
