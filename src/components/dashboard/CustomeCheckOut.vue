<template>
  <div>
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4"></div>
      <div class="col-md-4"></div>
    </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table ml-auto mr-auto">
          <thead>
            <th scope="col" class="text-center">品名</th>
            <th scope="col" class="text-center">數量</th>
            <th scope="col" class="text-center">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle text-center">{{ item.product.title }}</td>
              <td class="align-middle text-center">{{ item.qty }}</td>
              <td class="align-middle text-center">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td class="text-center">總計</td>
              <td class="text-center">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td class="text-center">{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td class="text-center">{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td class="text-center">{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td class="text-center">{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td class="text-center">
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderId: '',
      order: {
        user: {}
      },
      date: ''
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        // 訂單內容
        vm.order = res.data.order
        vm.isLoading = false
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      vm.$http.post(api).then((res) => {
        vm.$bus.$emit('message:Push', res.data.message, 'success')
        // 更新訂單內容
        vm.getOrder()
        vm.isLoading = false
      })
    }
  },
  created () {
    // 一開始取得網上的 orderId
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }

}
</script>
