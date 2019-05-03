<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage : `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getOneProduct(item.id)" data-target="#productModal">
              <i class="fas fa-spinner fa-spin" v-if="status.lodingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCar(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.lodingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 分頁 -->
    <pagen @changePage="getProducts" :pagination='pagination'></pagen>
    <!-- productModal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src='product.imageUrl' class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mt-0">{{product.content}}</p>
              <footer class="blockquote-footer text-right">{{product.description}}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6" v-if="product.price">原價 {{product.origin_price}} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{product.price}} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mt-3">
              合計 {{ product.num * product.price }} 元
            </div>
            <button type="button" class="btn btn-primary" @click="addToCar(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.lodingItem"></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 購物車列表 -->
    <div class="row d-flex justify-content-center my-5">
        <div class="col-md-6">
          <table class="table mt-5 ml-auto mr-auto">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">品名</th>
                <th scope="col" class="text-center" width='100'>數量</th>
                <th scope="col" class="text-center">單價</th>
              </tr>
            </thead>
            <tbody v-for=" item in cart.carts" :key="item.id">
              <tr>
                <td class="text-center">
                  <button type="button"  class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">{{item.product.title}}
                  <div class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</div>
                </td>
                <td class="text-center">{{item.qty}}</td>
                <td class="text-center">{{item.final_total | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td class="text-center">總計</td>
                <td class="text-center">{{cart.total | currency}}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td></td>
                <td></td>
                <td class="text-center text-success">折扣價</td>
                <td class="text-center text-success"> {{cart.final_total | currency}} </td>
              </tr>
            </tfoot>
          </table>
           <div class="text-center h6 mt-4 text-secondary text-danger" v-if="carts.length == 0">
                目前尚未選購商品
            </div>
          <div class="input-group mb-3 input-group-sm">
            <input type="text"  class="form-control"  v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" @click="addCouponCode">套用優惠卷</button>
            </div>
          </div>
          <p class="text-danger">{{coupon_message}}</p>
      </div>
    </div>
    <!-- 購物車訂單 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="creatOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'"
            :class="{'is-invalid':errors.has('email')}">
          <span class="text-danger" v-if="errors.has('email')"> {{errors.first('email')}}</span>
        </div>
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'" :class="{'is-invalid':errors.has('name')}">
            <!-- 錯誤訊息 requird 回傳不得為空 -->
          <span class="text-danger" v-if="errors.has('name')"> 請輸入姓名</span>
        </div>
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" name="tel" v-validate="{ required: true, regex: /^([0-9]+)$/ }" :class="{'is-invalid':errors.has('tel')}">
          <span class="text-danger" v-if="errors.has('tel')">請輸入正確電話</span>
        </div>
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
            placeholder="請輸入地址" v-validate="'required'" :class="{'is-invalid':errors.has('address')}">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import pagen from './../dashboard/Pagination'
export default {
  components: {
    pagen
  },
  data () {
    return {
      products: [],
      isLoading: false,
      optionNum: '',
      product: {},
      // 判斷畫面上哪個元素在讀取中(查看更多 & 加入到購物車)
      status: {
        lodingItem: '' // 放產品的id
      },
      pagination: {},
      cart: {}, // 購物車列表
      carts: {}, // 購物車列表內容
      coupon_code: '',
      coupon_message: '',
      // 結帳頁面回傳 api 格式
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    // 模擬訂單頁面，取得所有產品資料
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      const vm = this
      vm.isLoading = true
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        vm.$store.dispatch('updateLoading', false)
        vm.products = res.data.products
        vm.pagination = res.data.pagination
      })
    },
    // modal取得單一筆資料
    getOneProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.lodingItem = id
      vm.$http.get(api).then((res) => {
        vm.status.lodingItem = ''
        vm.product = res.data.product
        $('#productModal').modal('show')
      })
    },
    // 加入購物車
    // api 帶入特定參數結構(產品id,預設數量為1)
    addToCar (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.lodingItem = id
      const cart = {
        product_id: id,
        qty
      }
      vm.$http.post(api, { data: cart }).then((res) => {
        vm.$bus.$emit('message:Push', res.data.message, 'success')
        vm.status.lodingItem = ''
        vm.getCart() // 把購物車內購買的商品取得回來(更新購物車)
        $('#productModal').modal('hide')
      })
    },
    // 移除購物車內容
    removeCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.$http.delete(api).then((res) => {
        vm.$bus.$emit('message:Push', res.data.message, 'danger')
        vm.getCart()
      })
    },
    // 一開始就取得購物車內容
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        // 購物車內容
        vm.cart = res.data.data
        vm.carts = res.data.data.carts
        vm.$store.dispatch('updateLoading', false)
      })
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
          vm.$bus.$emit('message:Push', res.data.message, 'danger')
        } else {
          vm.coupon_message = ''
          vm.$bus.$emit('message:Push', res.data.message, 'success')
        }
        vm.isLoading = false
      })
    },
    // 購物車訂單
    creatOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      // 要回傳的資料
      // 建立訂單後會把所選的購物車資訊刪除, message 欄位為必填, user 物件為必要
      const order = vm.form
      // 換掉 google required阻擋效果改用套件
      this.$validator.validate().then((result) => {
        if (result) {
          vm.$http.post(api, { data: order }).then((res) => {
            if (res.data.success) {
              vm.$bus.$emit('message:Push', res.data.message, 'success')
              // 轉到 customecheckout 頁面(專屬訂單id結帳)
              vm.$router.push(`/dashboard/customecheckout/${res.data.orderId}`)
            }
          })
        } else {
          vm.isLoading = false
        }
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart() // 一開始就先取一次購物車回來才會更新
  }
}
</script>
