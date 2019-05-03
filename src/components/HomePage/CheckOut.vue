<template>
  <div>
  <div class="container">
    <div class="row hero_collection text-center d-flex justify-content-center">
      <div class="col-md-3">1.輸入訂單資料</div>
      <div class="col-md-3 alert alert-info" role="alert" v-if="order.is_paid===false">2.確認付款</div>
      <div class="col-md-3 alert" role="alert" v-else>2.確認付款</div>
      <div class="col-md-3 alert alert-info"  v-if="order.is_paid">3.完成</div>
      <div class="col-md-3 alert" role="alert" v-else>3.完成</div>
    </div>
    <div class="my-4 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table ml-auto mr-auto text-light border">
          <thead>
            <th scope="col" class="text-center">品名</th>
            <th scope="col" class="text-center">數量</th>
            <th scope="col" class="text-center">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle text-center">{{ item.product.title }}</td>
              <td class="align-middle text-center">{{ item.qty}}</td>
              <td class="align-middle text-center">{{ item.final_total | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td class="h5 text-center">總計</td>
              <td class="h5 text-center">{{ order.total | currency}}</td>
            </tr>
          </tfoot>
        </table>
        <h3 class="text-center text-light mt-5">個人資料</h3>
        <table class="table border">
          <tbody class="text-light">
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
              <td class="h5 text-center">
                <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-info" style="width: 100%;">確認付款</button>
        </div>
        <router-link to="/" class="text-right" v-else>
          <button class="btn btn-info" style="width: 100%;">繼續購物</button>
        </router-link>
      </form>
    </div>
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
      vm.$http.get(api).then((res) => {
        // 訂單內容
        vm.order = res.data.order
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$http.post(api).then((res) => {
        // 更新訂單內容
        vm.getOrder()
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

<style lang="scss" scoped>
p {
  margin:0 ;
}
.hero_collection > .col-md-3{
    margin: 1.5rem;
    border: 2px solid #17a2b8;
    border-radius: 100px;
    padding: 0.5rem;
    color: #f4f4f4;
    font-size: 25px;
    font-weight: 700;
}
.hero_collection ::before {
  border: 1px solid black
}

.alert-info {
  background-color: #17a2b8;
}
</style>
