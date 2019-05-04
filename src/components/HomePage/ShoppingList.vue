<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="hero_collection">
      <p>英雄集合</p>
    </div>
    <div class="col-md-12 menu">
      <div class="col-md-4 menu-heros" @click.prevent="changeTabe('All Heros')">
        <span>All Heros</span>
      </div>
      <div class="col-md-4 menu-heros" @click.prevent="changeTabe('DC')">
        <span>DC</span>
      </div>
      <div class="col-md-4 menu-heros" @click.prevent="changeTabe('Marvel')">
        <span>Marvel</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="item in filterData" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover;"
            :style="{backgroundImage : `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.origin_price | currency }}</del>
              <div class="h5">特價 {{ item.price | currency }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <router-link to="/shoppingdetail">
              <button type="button" class="btn btn-outline-secondary btn-sm" @click="getOneProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="lodingItem === item.id"></i>
              <i class="fas fa-search" style="padding-right:5px;"></i>詳細內容
            </button></router-link>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCar(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="lodingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoading: false,
      optionNum: '',
      product: {},
      submit: false
    }
  },
  methods: {
    ...mapActions(['getProducts', 'getCart', 'removeCart']),

    // modal取得單一筆資料
    getOneProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$http.get(api).then((res) => {
        // 把 product.id 傳給 shoppingdetail
        vm.$router.push(`/shoppingdetail/${res.data.product.id}`)
      })
    },
    // 加入購物車
    // api 帶入特定參數結構(產品id,預設數量為1)
    // mapActions 不能帶入兩個參數，所以用 {} 代替
    addToCar (id, qty = 1) {
      this.$store.dispatch('addToCar', { id, qty })
    },
    // 切換
    changeTabe (name) {
      this.$store.dispatch('changeText', name)
    }
  },
  computed: {
    filterData (data) {
      const vm = this
      if (vm.$store.state.searchText !== 'All Heros') {
        return vm.products.filter((item) => {
          // console.log(item) // 顯示全部英雄並篩選出相關 category 的英雄 // includes true/false
          const data = item.category.includes(vm.$store.state.searchText)
          return data
        })
      }
      return vm.products
    },
    change () {
      return this.$store.state.change
    },
    ...mapGetters(['products', 'pagination', 'change']),
    ...mapGetters(['lodingItem'])
  },
  created () {
    this.getProducts()
    this.getCart() // 一開始就先取一次購物車回來才會更新
  }
}
</script>

<style lang="scss" scoped>

p {
  margin: 0;
}
.hero_collection{
    border-bottom: solid;
    border-top: solid;
    padding: 0.5rem;
    color: #f4f4f4;
    font-size: 35px;
    font-weight: 700;
    margin: 1.2rem 0 1.2rem 0;
    text-align: center;
}
.hero_collection ::before {
  border: 1px solid black
}

.menu {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
    color: #f4f4f4;
    cursor: pointer;
    .menu-heros {
      margin: 1.5rem auto;
      padding: 0.5rem;
      color: #f4f4f4;
      border: 2px solid;
      border-radius: 3rem;
      max-width: 15%;
    }
}
.menu :hover {
  background-color: #17a2b8;
}

.row {
  max-width: 1200px;
  .col-md-4 {
    margin-bottom: 1.5rem;
  }
}
.card {
  margin: 0 auto;
  height: 300px;
  .card-body {
    padding: 0.2rem;
  }
  .card-footer {
    padding: 0.5rem 1.2rem;
  }
}

.card-title {
  margin-bottom: 0.3rem;
}
.card-text {
  margin-bottom: 0.3rem;
}

@media (max-width: 1024px) {
  .menu {
    font-size: 20px;
  }
}

@media (max-width: 700px) {
  .menu {
    max-width: 100%;
    .menu-heros {
      margin: 1rem 0;
      max-width: 100%;
    }
  }

  .row > .col-md-4 {
    padding: 1.5rem;
    margin-bottom: 0;
  }
}

</style>
