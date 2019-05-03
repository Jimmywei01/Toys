<template>
  <div class="container">
          <div class="hero_collection">
        <p>英雄詳解</p>
      </div>
    <div class="col-md-12 detail clearfix">
      <div class="col-md-7 detail-left">
        <img :src='item.imageUrl' class="img-fluid" alt="">
      </div>
      <div class="col-md-5 detail-right">
        <p class="mt-0">{{item.title}}</p>
        <div class="d-flex justify-content-between align-items-baseline">
          <del class="h6" v-if="item.price">原價 {{item.origin_price | currency}} </del>
          <div class="h4" v-if="item.price" style="color:#dc3545">特價 {{item.price | currency}} </div>
        </div>
        <select name="" class="form-control mt-3" v-model="item.num" placeholder="請選購數量">
          <option :value="num" v-for="num in 10" :key="num">
            選購 {{num}} 件
          </option>
        </select>
        <div class="detail-footer">
            <div class="num text-muted text-nowrap m-3">
              小計 {{ item.num * item.price | currency }}
            </div>
            <button type="button" class="btn btn-primary" @click="addToCar(item.id, item.num)">
              <i class="fas fa-spinner fa-spin" v-if="item.id === status.lodingItem"></i>
              加入購物車
            </button>
        </div>
      </div>
    </div>
    <div class="col-md-12 product">
      <p>產品介紹</p>
      <blockquote class="blockquote mt-3">
        <p class="mt-0">{{item.description}}</p>
        <footer class="blockquote-footer text-right">{{item.content}}</footer>
      </blockquote>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'shoppingdetail',
  data () {
    return {
      id: '',
      item: {},
      isLoading: false,
      optionNum: '',
      product: {},
      // 判斷畫面上哪個元素在讀取中(查看更多 & 加入到購物車)
      status: {
        lodingItem: '' // 放產品的id
      }
    }
  },
  methods: {
  // 取得 id 資料
    getItem (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.id}` // 在用 id 從 api 撈資料
      // vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((res) => {
        vm.item = res.data.product
        vm.$set(vm.item, 'num', 1)
        // vm.$store.dispatch('updateLoading', false);
      })
    },
    ...mapActions(['getCart']),
    // 加入購物車
    // api 帶入特定參數結構(產品id,預設數量為1)
    addToCar (id, qty = 1) {
      this.$store.dispatch('addToCar', { id, qty })
    }
  },
  created () {
    this.id = this.$route.params.id // 接收 shoppinglist 傳過來的 id 參數
    this.getItem()
    this.getCart() // 一開始就先取一次購物車回來才會更新
  }
}
</script>

<style lang="scss" scoped>

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

.detail {
  margin: 1.5rem auto;
}

.col-md-7 {
  float: left;
  margin-bottom: 1.5rem;
}
.detail-right {
    background-color: #f4f4f4;
    > p {
      padding-top: 1rem;
    }
    .num {
      display: inline-block
    }
    .detail-footer {
        padding: 16px 0;
        float: right;
    }
  }

.col-md-5 {
  float: right;
  > p {
    font-size: 30px;
    text-align: center;
    border-bottom: 2px solid;
  }
}

.product > p {
    margin-top: 5px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid;
    color: #f4f4f4;
}

.blockquote {
    font-size: 15px;
    color: #f4f4f4;
  .blockquote-footer {
    font-size: 15px;
    color: #f4f4f4;
  }
}

@media screen and (max-width: 700px){
  .detail-left {
    padding: 0;
  }
}

</style>
