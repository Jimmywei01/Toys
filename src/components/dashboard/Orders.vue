<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="110">購買日期</th>
          <th width="80">購買人</th>
          <th width="120">Email</th>
          <th>購買項目</th>
          <th>訂單編號</th>
          <th width="80">應付金額</th>
          <th width="80">是否付款</th>
          <th width="70">編輯</th>
          <th width="70">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in activeOrders" :key='item.id'>
          <td>{{item.create_at | timestamp}}</td>
          <td><span v-text="item.user.name"></span></td>
          <td><span v-text="item.user.email"></span></td>
          <td>
            <ul>
              <li v-for="product in item.products" :key="product.id">
                <!-- {{product.id}} 數量：{{product.qty}} -->
                <!-- 要搭配訂單送出抓到產品名稱 -->
                {{ product.product.title }} 數量：{{ product.qty }}
              </li>
            </ul>
          </td>
          <td>{{item.id}}</td>
          <td>{{item.total | currency}}</td>
          <td>
            <span v-if="item.is_paid===true" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(item)" data-target="#productModal">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm btndel" data-target="#delProductModal"  @click="delModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
        <!-- 分頁 -->
    <pagen @changePage="getOrders" :pagination='pagination'></pagen>
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="name" >購買人</label>
                    <input type="text" class="form-control" id="name"
                      placeholder="請輸入購買人" v-model="tempProduct.name">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email"
                      placeholder="請輸入Email" v-model="tempProduct.email">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="product_id">購買項目</label>
                    <input type="text" class="form-control" id="product_id"
                      placeholder="請輸入購買項目" v-model="tempProduct.product_id">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="total">應付金額</label>
                    <input type="number" class="form-control" id="total"
                      placeholder="請輸入應付金額" v-model="tempProduct.total">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_paid" v-model="tempProduct.is_paid">
                    <label class="form-check-label" for="is_paid">是否付款</label>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- 刪除 Modal -->
<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否<strong class="text-danger">刪除該筆訂單</strong>(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="delOrder"
          >確認刪除</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script type='text/javascript'>
import $ from 'jquery'
import pagen from './../dashboard/Pagination'
export default {
  components: {
    pagen
  },
  data () {
    return {
      orders: [],
      isLoading: false,
      tempProduct: {},
      newTempProduct: {},
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        vm.orders = res.data.orders
        vm.pagination = res.data.pagination
      })
    },
    openModal (item) {
      const vm = this
      vm.tempProduct = Object.assign({}, item)
      // 將 '時間戳記(timestamp)'轉換為 前台可閱讀的 yyy-mm-dd
      if (vm.tempProduct.reate_at === '') {
        let strtime = vm.tempProduct.reate_at
        let num = new Date(strtime)
        num = num / 1000
        let date = new Date(num * 1000)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() + ' '
        let dateString = Y + M + D
        vm.tempProduct.reate_at = dateString
      }
      $('#productModal').modal('show')
    },
    updateOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempProduct.id}`
      vm.$http.put(api, { data: vm.tempProduct }).then((res) => {
        if (res.data.success) {
          $('#productModal').modal('hide')
          vm.getOrders()
        } else {
          $('#productModal').modal('hide')
          vm.getOrders()
        }
      })
    },
    delModal (item) {
      this.tempProduct = Object.assign({}, item)
      $('#delProductModal').modal('show')
    },
    // 沒有刪除的api，用更新的方式刪除'目前頁面'的訂單
    delOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempProduct.id}`
      vm.tempProduct.is_delete = true
      this.$http.put(api, { data: vm.tempProduct }).then((res) => {
        vm.orders = vm.orders.splice(vm.tempProduct.num)
        $('#delProductModal').modal('hide')
        // 刪除當前頁面
        vm.getOrders(vm.pagination.current_page)
      })
    }
  },
  created () {
    this.getOrders()
  },
  computed: {
    activeOrders () {
      return this.orders.filter(function (item) {
        return !item.is_delete // 顯示 is_delete = false（也就是沒有is_delete的）
      })
    }
  }
}
</script>
<style scoped>
ul {
  padding: 0
}

li {
  list-style:none
}

</style>
