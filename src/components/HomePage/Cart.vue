<template>
  <div class="container">
      <div class="hero_collection">
        <p>英雄訂單</p>
      </div>
      <div class="col-md-12 cart-row">
        <div class="col-md-8 cart-row-product">
          <div class="text-center h3 mt-4 text-secondary text-danger" v-if="carts.length == 0">
                目前尚未選購商品
          </div>
          <div class="list-item row" v-for="(item, index) in carts" :key="index">
            <div class="cart-row-product_img col-md-6">
              <div class="img-item" :style="`background-image: url(${item.product.imageUrl})`"></div>
              <div class="cart-row-product_description d-inline-block">
                <p class="cart-row-product_title h5 text-light">{{item.product.title}}</p>
                <p class="cart-row-product_qty h5 text-light">{{item.qty}}件</p>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="ml-auto">
                <div class="d-inline-block h5 text-light">
                  NT {{item.total|currency}}
                </div>
                <button type="button" class="btn btn-outline-danger btn-sm ml-3" @click="removeCart(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 cart-row-order">
          <h3 class="myTitle">訂單摘要</h3>
            <div class="d-flex justify-content-between my-3">
              <span>小計</span>
              <span>NT {{cart.total | currency}}</span>
            </div>
            <div class="d-flex justify-content-between my-4">
              <span>折扣</span>
              <span v-if="cart.total == cart.final_total">請在下面輸入優惠碼</span>
              <span v-else>NT {{cart.total - cart.final_total |currency}}</span>
            </div>
            <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
              <div class="input-group-append">
                <button class="btn btn-info" type="button" @click="addCouponCode">
                  套用優惠碼
                </button>
              </div>
            </div>
            <div class="alert alert-info" role="alert">
              目前可用優惠碼<br>
              coupon<br>
              clay
            </div>
            <div class="d-flex justify-content-between my-4">
              <span class="h4">總計</span>
              <span class="h4">NT {{cart.final_total |currency}}</span>
            </div>
            <div class="text-right pb-6">
              <button type="button" class="btn btn-info" style="width:100%;" @click="goCheckout">進行結算</button>
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
      coupon_code: '',
      coupon_message: ''
    }
  },
  methods: {
    ...mapActions(['getProducts', 'getCart', 'removeCart']),
    // modal取得單一筆資料
    getOneProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$http.get(api).then((res) => {
        vm.status.lodingItem = ''
        vm.product = res.data.product
      })
    },
    addToCar (id, qty = 1) {
      this.$store.dispatch('addToCar', { id, qty })
    },
    // 輸入優惠卷 沒辦法判斷套不套用 coupon 點擊加入購物車前先判斷有沒有加入 優惠卷
    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      // 上傳優惠碼 api 判定
      // const coupon = { code: vm.coupon_code }
      vm.isLoading = true
      let couponCode = {
        data: {
          code: vm.coupon_code
        }
      }
      vm.$http.post(api, couponCode).then((res) => {
        vm.getCart()
        if (!res.data.success) {
          vm.coupon_message = res.data.message
        } else {
          vm.coupon_message = ''
        }
        vm.isLoading = false
      })
    },
    goCheckout () {
      this.$router.push('./checkorder')
    }
  },
  computed: {
    ...mapGetters(['cartNum', 'carts', 'cart'])
  },
  created () {
    this.getProducts()
    this.getCart() // 一開始就先取一次購物車回來才會更新
  }
}
</script>

<style lang="scss" scoped>

.cart-row {
  max-width: 1200px;
  margin: 1.5rem auto;
}

p {
  margin:0 ;
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

.cart-row-product_header {
  margin:0 1.5rem;
  text-align: center;
  border-bottom: 2px solid #f4f4f4;
  color: #f4f4f4;
}

.list-item {
  padding: 10px;
  margin: 1.5rem;
  border-bottom: 2px solid #f4f4f4;
}

.cart-row-product {
  float: left;
}

.cart-row-order {
  display: inline-block;
  padding: 20px;
  margin: 2rem 0;
  background-color: #f4f4f4;
}

.cart-row-product_img {
  display: flex;
  align-items: center;
}

.img-item {
    height: 110px;
    width: 110px;
    display: inline-block;
    background-position: center center;
    background-size: cover;
    margin-right: 40px;
  }

.deleteBtn {
  margin-left: 1rem;
}

@mixin clearfix() {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

@media screen and (max-width: 700px) {

.cart-row {
  height: 100%;
}

.cart-row-product_img{
  display: block;
  .img-item {
    height: 150px;
    width: 100%;
    display: inline-block;
    background-position: center center;
    background-size: cover;
    }
  }

.list-item {
  margin: 0;
}

.cart-row-product_description {
    .cart-row-product_title {
      float: left;
      margin-right: 1.5rem;
    }
    .cart-row-product_qty {
      float: right;
    }
  }

.ml-auto {
  margin: 0 !important;
  }

}

</style>
