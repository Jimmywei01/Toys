<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" data-toggle="modal" data-target="#productModal" @click="openModal(true)">建立優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">名稱</th>
          <th>優惠卷代碼</th>
          <th width="120">折價</th>
          <th width="120">截止日期</th>
          <th width="120">是否啟用</th>
          <th width="80">編輯</th>
          <th width="80">刪除</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in coupons" :key='item.id'>
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.percent}}%</td>
          <td>{{item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled===1" class="text-success">已起用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)" data-target="#productModal">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="delModal(item)" data-target="#delProductModal">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <pagen @changePage="getCoupons" :pagination='pagination'></pagen>
    <!-- modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">名稱</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入名稱" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="code">優惠卷代碼</label>
                    <input type="text" class="form-control" id="code"
                      placeholder="請輸入優惠卷代碼" v-model="tempProduct.code">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="percent">折價</label>
                    <input type="text" class="form-control" id="percent"
                      placeholder="請輸入折價" v-model="tempProduct.percent">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                  <label for="due_date">截止日期</label>
                    <input type="date" class="form-control" id="due_date"
                      placeholder="請輸入截止日期" v-model="tempProduct.due_date">
                  </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempProduct.is_enabled" :true-value='1' :false-value='0'>
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
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
        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="delCoupon"
          >確認刪除</button>
      </div>
    </div>
  </div>
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
      coupons: [],
      tempProduct: {},
      isNew: false,
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        vm.$store.dispatch('updateLoading', false)
        vm.coupons = res.data.coupons
        vm.pagination = res.data.pagination
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      const vm = this
      // 將 '時間戳記(timestamp)'轉換為 前台可閱讀的 yyy-mm-dd
      if (vm.tempProduct.due_date === '') {
        let strtime = vm.tempProduct.due_date
        let num = new Date(strtime)
        num = num / 1000
        let date = new Date(num * 1000)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() + ' '
        let dateString = Y + M + D
        vm.tempProduct.due_date = dateString
      }
      $('#productModal').modal('show')
    },
    updateCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(res => {
        if (res.data.success) {
          $('#productModal').modal('hide')
          vm.getCoupons()
          console.log('新增成功')
        } else {
          $('#productModal').modal('hide')
          vm.getCoupons()
          console.log('新增失敗')
        }
      })
    },
    delModal (item) {
      this.tempProduct = Object.assign({}, item)
      $('#delProductModal').modal('show')
    },
    delCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`
      this.$http.delete(api).then((res) => {
        $('#delProductModal').modal('hide')
        vm.getCoupons()
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
