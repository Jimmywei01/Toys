<template>
<div>
  <div class="container">
    <div class="row hero_collection text-center d-flex justify-content-center">
      <div class="col-md-3 alert alert-info">1.輸入訂單資料</div>
      <div class="col-md-3">2.確認付款</div>
      <div class="col-md-3">3.完成</div>
    </div>
    <div class="my-4 row justify-content-center">
      <form class="col-md-6" @submit.prevent="creatOrder">
      <keep-alive>
        <div class="form-group">
          <label for="useremail" class="text-light">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'"
            :class="{'is-invalid':errors.has('email')}">
          <span class="text-danger" v-if="errors.has('email')"> {{errors.first('email')}}</span>
        </div>
      </keep-alive>
      <keep-alive>
        <div class="form-group">
          <label for="username" class="text-light">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'" :class="{'is-invalid':errors.has('name')}">
            <!-- 錯誤訊息 requird 回傳不得為空 -->
          <span class="text-danger" v-if="errors.has('name')"> 請輸入姓名</span>
        </div>
        </keep-alive>
        <keep-alive>
        <div class="form-group">
          <label for="usertel" class="text-light">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" name="tel" v-validate="{ required: true, regex: /^([0-9]+)$/ }" :class="{'is-invalid':errors.has('tel')}">
          <span class="text-danger" v-if="errors.has('tel')">請輸入正確電話</span>
        </div>
        </keep-alive>
        <keep-alive>
        <div class="form-group">
          <label for="useraddress" class="text-light">收件人地址</label>
          <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
            placeholder="請輸入地址" v-validate="'required'" :class="{'is-invalid':errors.has('address')}">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
        </keep-alive>
        <keep-alive>
        <div class="form-group">
          <label for="comment" class="text-light">留言</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        </keep-alive>
        <div class="text-right">
          <button class="btn btn-info" style="width: 100%;">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
              // 轉到 customecheckout 頁面(專屬訂單id結帳)
              vm.$router.push(`./checkout/${res.data.orderId}`)
            }
          })
        } else {
          vm.isLoading = false
        }
      })
    }
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
