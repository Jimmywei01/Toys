import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './cart'
import productModule from './product'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    loading: false,
    lodingItem: '',
    searchText: ''
  },
  actions: {
    updateLoading (context, playload) {
      context.commit('setLoading', playload)
    },
    changeText (context, name) {
      context.commit('searchText', name)
    }
  },
  mutations: {
    setLoading (state, playload) {
      state.loading = playload // state.loading配合 playload 改變
    },
    lodingItem (state, id) {
      state.lodingItem = id
    },
    searchText (state, playload) {
      state.searchText = playload
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    lodingItem (state) {
      return state.lodingItem
    }
  },
  modules: {
    productModule,
    cartModule
  }
})
