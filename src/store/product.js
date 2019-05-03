import axios from 'axios'

export default {
  state: {
    products: [],
    pagination: {}
  },
  actions: {
    getProducts (context, page) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      axios.get(api).then(res => {
        context.commit('Products', res.data.products)
        context.commit('Pagination', res.data.pagination)
      })
    }
  },
  mutations: {
    Products (state, payload) {
      state.products = payload
    },
    Pagination (state, payload) {
      state.pagination = payload
    }
  },
  // 計算回傳
  getters: {
    products (state) {
      return state.products
    },
    pagination (state) {
      return state.pagination
    }
  }
}
